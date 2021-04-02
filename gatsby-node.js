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
          topics
        }
      }
    }
  `);

  const repos = data.data.allRepo.nodes;
  let topics = [];
  repos.forEach(repo => topics = [...topics, ...repo.topics]);
  const topicsSet = new Set(topics);
  topics = [...topicsSet];
    
  paginate({
    createPage,
    items: repos,
    component: path.resolve('./src/templates/portfolio.js'),
    itemsPerPage: 6,
    pathPrefix: '/portfolio'
  });

  topics.forEach(topic => {
    createPage({
      path: `/topics/${topic}`,
      component: path.resolve('./src/templates/topics.js'),
      context: {
        topic,
      }
    });
  })
}
