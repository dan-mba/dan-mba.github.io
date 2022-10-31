const getGithubContribs = require('./github');

exports.pluginOptionsSchema = ({ Joi }) => Joi.object({
  githubUserId: Joi.string().required()
    .description('GitHub user id to fetch repos for'),
  githubUserToken: Joi.string().required()
    .description('GitHub user token for auth'),
  repoFilter: Joi.array().items(Joi.object()).default([])
    .description('Array repos to filter out'),
  issueFilter: Joi.array().items(Joi.object()).default([])
    .description('Array issues to issues out'),
  prFilter: Joi.array().items(Joi.object()).default([])
    .description('Array pull requests to filter out'),
  
})

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest },
  {githubUserId, githubUserToken, repoFilter, issueFilter, prFilter}) => {

  const repos = await getGithubContribs(githubUserId, githubUserToken,
    repoFilter, issueFilter, prFilter);

  repos.forEach(repo => {
    const node = {
      ...repo,
      id: createNodeId(`CONTRIB-${repo.name}`),
      internal: {
        type: "Contrib",
        contentDigest: createContentDigest(repo),
      },
    }
    actions.createNode(node)
  })
};

