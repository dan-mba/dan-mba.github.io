const path = require("path");
const {paginate} = require('gatsby-awesome-pagination');

exports.createPages = async ({graphql, actions: {createPage}}) => {
  const query = await graphql(`
    query {
      repos: allRepo {
        topics: group(field: topics) {
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
    path: `/topics/`,
    component: path.resolve('./src/templates/topics.jsx'),
    context: {
      topics,
    }
  });
  
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
  let topicArr = topics.map(t => t.name)
  const topicsSet = new Set(topicArr);
  topicArr = [...topicsSet];
  
  paginate({
    createPage,
    items: repos,
    component: path.resolve('./src/templates/portfolio.jsx'),
    itemsPerPage: 6,
    pathPrefix: '/portfolio'
  });
  
  topicArr.forEach(topic => {
    createPage({
      path: `/topics/${topic}/`,
      component: path.resolve('./src/templates/topic.jsx'),
      context: {
        topic,
      }
    });
  });
  
  
  const dataC = await graphql(`
  {
    allContrib(sort: {fields: [totalContribs, name], order: [DESC, ASC]}) {
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
