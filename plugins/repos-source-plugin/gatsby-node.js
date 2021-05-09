/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
const getGithubRepos = require('./github');
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.onPreInit = () => console.log("Loaded repos-source-plugin")

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const repos = await getGithubRepos('dan-mba');

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
  getCache,
}) => {
  if (node.internal.type === "Repo") {
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      url: node.openGraphImageUrl,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    })

    if (fileNode) {
      node.localImage___NODE = fileNode.id
    }
  }
}
