const path = require("path");
const {paginate} = require('gatsby-awesome-pagination');

exports.createPages = async ({graphql, actions: {createPage}}) => {
  const query = await graphql(`
    query {
      repos: allRepo {
        topics: group(field: {topics: SELECT}) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  const topics = query.data.repos.topics.map(topic => {
    return {
      name: topic.fieldValue,
      count: topic.totalCount
    }
  });

  topics.sort((a,b) => {
    if (b.count - a.count !== 0) {
      return b.count - a.count;
    }

    return a.name.localeCompare(b.name);
  });

  createPage({
    path: `/technologies/`,
    component: path.resolve('./src/templates/technologies.jsx'),
    context: {
      topics,
    }
  });
  
  const data = await graphql(`
  {
    allRepo(sort: [{isPinned: DESC}, {pushedAt: DESC}]) {
      nodes {
        id
        topics
      }
    }
  }
  `);
  
  const repos = data.data.allRepo.nodes;
  let topicArr = topics.map(t => t.name)
  const topicsSet = new Set(topicArr);
  topicArr = [...topicsSet];
  
  paginate({
    createPage,
    items: repos,
    component: path.resolve('./src/templates/projects.jsx'),
    itemsPerPage: 6,
    pathPrefix: '/projects'
  });
  
  topicArr.forEach(topic => {
    createPage({
      path: `/technologies/${topic}/`,
      component: path.resolve('./src/templates/technology.jsx'),
      context: {
        topic,
      }
    });
  });
  
  
  const dataC = await graphql(`
  {
    allContrib(sort: [{totalContribs: DESC}, {name: ASC}]) {
      nodes {
        id
      }
    }
  }
  `);
  const contribs = dataC.data.allContrib.nodes;


  paginate({
    createPage,
    items: contribs,
    component: path.resolve('./src/templates/contributions.jsx'),
    itemsPerPage: 6,
    pathPrefix: '/contributions'
  });
}
