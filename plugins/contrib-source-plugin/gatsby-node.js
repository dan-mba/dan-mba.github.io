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
const getGithubContribs = require('./github');

exports.onPreInit = () => console.log("Loaded contrib-source-plugin")

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const repos = await getGithubContribs('dan-mba');

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

