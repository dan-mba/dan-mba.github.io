const {GraphQLClient, gql} = require('graphql-request');

async function getGithubRepos(userid) {
  const endpoint = 'https://api.github.com/graphql';

  const graphqlClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}` 
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
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `;

  try {
    let data = await graphqlClient.request(query, {"login": userid});
    let repos = data.user.repositories.nodes;
    while (data.user.repositories.pageInfo.hasNextPage) {
      data = await graphqlClient.request(query, {
        "login": userid,
        "after": data.user.repositories.pageInfo.endCursor, 
      });
      repos = [...repos, ...data.user.repositories.nodes];
    }

    repos = repos.map(repo => {
      const flatRepo = JSON.parse(JSON.stringify(repo))
      flatRepo.languages = repo.languages.edges.map(lang => {
        return {
          name: lang.node.name,
          size: lang.size / repo.languages.totalSize
        };
      });
      flatRepo.topics = repo.repositoryTopics.nodes.map(t => t.topic.name);
      delete flatRepo.repositoryTopics;
      return flatRepo;
    })

    return repos
  } catch(e) {
    console.log('Call to GitHub GraphQL API failed');
    throw e;
  }
}

module.exports = getGithubRepos;
