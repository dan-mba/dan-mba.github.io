const {GraphQLClient, gql} = require('graphql-request');

async function getGithubContribs(userid) {
  const endpoint = 'https://api.github.com/graphql';

  const graphqlClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}` 
    }
  });

  const query = gql`
    query getContribData($login: String!) {
      user(login: $login) {
        contributionsCollection {
          pullRequestContributionsByRepository {
            repository {
              description
              name
              owner {
                login
              }
              url
            }
            contributions(first: 10) {
              edges {
                node {
                  pullRequest {
                    merged
                    mergedAt
                    title
                    url
                  }
                }
              }
            }
          }
          issueContributionsByRepository {
            repository {
              description
              name
              owner {
                login
              }
              url
            }
            contributions(first: 10) {
              edges {
                node {
                  issue {
                    closed
                    closedAt
                    title
                    url
                    viewerDidAuthor
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await graphqlClient.request(query, {"login": userid});
    let prs = data.user.contributionsCollection.pullRequestContributionsByRepository;
    let issues = data.user.contributionsCollection.issueContributionsByRepository;
    let repos = [];

    // filter out repos from the provided userid
    prs = prs.filter(r => r.repository.owner.login !== userid);
    prs = prs.map(r => {
      let repo = JSON.parse(JSON.stringify(r))
      let contribs = repo.contributions.edges.map(e => e.node.pullRequest);

      // filter out PRs that are not merged
      contribs = contribs.filter(c => c.merged);
      repo.repository.owner = repo.repository.owner.login;
      repo = {...repo.repository, contributionPrs: contribs};

      return repo;
    });
    repos = [...prs];

    // filter out repos from the provided userid
    issues = issues.filter(r => r.repository.owner.login !== userid);
    issues = issues.map(r => {
      let repo = JSON.parse(JSON.stringify(r))
      let contribs = repo.contributions.edges.map(e => e.node.issue);

      // filter out isses that are not closed and the userid did not author
      contribs = contribs.filter(c => c.closed && c.viewerDidAuthor);
      repo.repository.owner = repo.repository.owner.login;
      repo = {...repo.repository, contributionIssues: contribs};

      return repo;
    });

    // if repo already in the array, add issues to it otherise push it to the array
    issues.forEach(r => {
      const exists = repos.findIndex(repo => {
        return (repo.name === r.name) && (repo.owner === r.owner);
      });

      if (exists < 0) {
        repos.push(r);
        return;
      }

      repos[exists].contributionIssues = r.contributionIssues;
    });

    const repoFilter = ['first-contributions']
    repos = repos.filter(r => !repoFilter.includes(r.name));

    return repos;
  } catch(e) {
    console.log('Call to GitHub GraphQL API failed');
    throw e;
  }
}

module.exports = getGithubContribs;
