import getGithubContribs from './github.js';

export const pluginOptionsSchema = ({ Joi }) => Joi.object({
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
  maxContributions: Joi.number().integer().default(12)
    .description('Max number of contributions to show per repo'),
})

export const sourceNodes = async ({ actions, createNodeId, createContentDigest },
  {githubUserId, githubUserToken, repoFilter, issueFilter, prFilter, maxContributions}) => {

  const repos = await getGithubContribs(githubUserId, githubUserToken,
    repoFilter, issueFilter, prFilter, maxContributions);

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

