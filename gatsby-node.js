const path = require("path");
const {paginate} = require('gatsby-awesome-pagination');
const getGithubRepos = require('./src/data/github');

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

exports.createPages = async ({graphql, actions: {createPage}}) => {
  const data = await graphql(`
    {
      allRepo(sort: {fields: [isPinned, pushedAt], order: [DESC, DESC]}) {
        nodes {
          id
        }
      }
    }
  `);

  const repos = data.data.allRepo.nodes;
  
  paginate({
    createPage,
    items: repos,
    component: path.resolve('./src/templates/portfolio.js'),
    itemsPerPage: 6,
    pathPrefix: '/portfolio'
  });
}
