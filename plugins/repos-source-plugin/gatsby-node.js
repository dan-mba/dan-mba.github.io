const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const getGithubRepos = require('./github');

exports.pluginOptionsSchema = ({ Joi }) => Joi.object({
  githubUserId: Joi.string().required()
    .description('GitHub user id to fetch repos for'),
  githubUserToken: Joi.string().required()
    .description('GitHub user token for auth'),
  portfolioLanguages: Joi.array().items(Joi.string()).default(['JavaScript'])
    .description('List of languages for repo to be included'),
})

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest },
  {githubUserId, githubUserToken, portfolioLanguages}) => {
  const repos = await getGithubRepos(githubUserId, githubUserToken, portfolioLanguages);

  repos.forEach(repo => {
    const node = {
      ...repo,
      id: createNodeId(`REPO-${repo.name}`),
      internal: {
        type: "Repo",
        contentDigest: createContentDigest(repo),
      },
    }
    actions.createNode(node)
  })
};

// called each time a node is created
exports.onCreateNode = async ({
  node, // the node that was just created
  actions: { createNode },
  createNodeId,
  cache,
  store
}) => {
  console.log(`onCreateNode called for ${node.id} ${node.type}`)
  if (node.internal.type === "Repo") {
    console.log(`Creating node for ${node.name}`);
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      url: node.openGraphImageUrl,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store
    })

    if (fileNode) {
      console.log(`Created node for ${node.name}`);
      node.localImage___NODE = fileNode.id
    }
  }
}
