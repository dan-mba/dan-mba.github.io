const {GraphQLClient, gql} = require('graphql-request');

async function getGithubRepos(userid, authToken, portfolioLangs) {
  const endpoint = 'https://api.github.com/graphql';

  const graphqlClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `bearer ${authToken}` 
    }
  });

  const query = gql`
    query getRepoData($login: String!, $after: String) {
      user(login: $login) {
        repositories(first: 100, after: $after) {
          nodes {
            name
            languages(orderBy: {field: SIZE, direction: DESC}, first: 3) {
              edges {
                node {
                  name
                }
                size
              }
              totalSize
            }
            description
            url
            repositoryTopics(first: 50) {
              nodes {
                topic {
                  name
                }
              }
            }
            homepageUrl
            openGraphImageUrl
            isFork
            pushedAt
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
        pinnedItems(first: 10) {
          nodes {
            ... on Repository {
              name
            }
          }
        }
      }
    }
  `;

  try {
    let data = await graphqlClient.request(query, {"login": userid});
    let repos = [...data.user.repositories.nodes];

    while (data.user.repositories.pageInfo.hasNextPage) {
      data = await graphqlClient.request(query, {
        "login": userid,
        "after": data.user.repositories.pageInfo.endCursor, 
      });
      repos = [...repos, ...data.user.repositories.nodes];
    }
    repos = repos.filter(r => !r.isFork);

    const pins = data.user.pinnedItems.nodes.map(p => p.name);

    repos = repos.map(repo => {
      const flatRepo = JSON.parse(JSON.stringify(repo))
      const langs = repo.languages.edges.map(lang => {
        return {
          name: lang.node.name,
          size: Math.round((lang.size / repo.languages.totalSize) * 10000) / 100
        };
      });

      flatRepo.languages = langs.filter(l => l.size > 1);

      flatRepo.topics = repo.repositoryTopics.nodes.map(t => t.topic.name).sort();
      delete flatRepo.repositoryTopics;
      
      flatRepo.isPinned = pins.includes(repo.name);
      return flatRepo;
    });

    // filter out repos not including one of my primary languages
    repos = repos.filter(repo => (repo.languages.some(l => portfolioLangs.includes(l.name))));
    // filter out repos with no topics (not ready to be displayed on portfolio)
    repos = repos.filter(repo => repo.topics.length > 0);

    return repos;
  } catch(e) {
    console.log('Call to GitHub GraphQL API failed');
    throw e;
  }
}

module.exports = getGithubRepos;
