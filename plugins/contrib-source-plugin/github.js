const {GraphQLClient, gql} = require('graphql-request');

async function getGithubContribs(userid, userToken, startDateTime, repoFilter, issueFilter, prFilter) {
  const endpoint = 'https://api.github.com/graphql';

  const graphqlClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `bearer ${userToken}` 
    }
  });

  const query = gql`
    query getContribData($login: String!, $startDateTime: DateTime!, $endDateTime: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $startDateTime, to: $endDateTime) {
          pullRequestContributionsByRepository {
            repository {
              descriptionHTML
              name
              owner {
                login
              }
              stargazerCount
              url
            }
            contributions(first: 10) {
              edges {
                node {
                  pullRequest {
                    merged
                    mergedAt
                    number
                    title
                    url
                  }
                }
              }
            }
          }
          issueContributionsByRepository {
            repository {
              descriptionHTML
              name
              owner {
                login
              }
              stargazerCount
              url
            }
            contributions(first: 10) {
              edges {
                node {
                  issue {
                    closed
                    closedAt
                    number
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
    const now = new Date(Date.now());
    let start = new Date(startDateTime);
    let prs = [];
    let issues = [];

    while (start < now) {
      let end = new Date(start);
      end.setFullYear(end.getFullYear() + 1);
      end = new Date(end.getTime() - 1);
      if (end > now) {
        end = now;
      }

      const data = await graphqlClient.request(query,
        {"login": userid, "startDateTime": start.toISOString(), "endDateTime": end.toISOString()});
      if(prs.length === 0) {
        prs = [...data.user.contributionsCollection.pullRequestContributionsByRepository];
      } else {
        const newPrs = data.user.contributionsCollection.pullRequestContributionsByRepository;
        newPrs.forEach(newPr => {
          const foundPr = prs.find(pr => (
            pr.repository.name === newPr.repository.name &&
            pr.repository.owner.login === newPr.repository.owner.login
          ));
          if (foundPr) {
            foundPr.contributions.edges = [...foundPr.contributions.edges, ...newPr.contributions.edges];
          } else {
            prs.push(newPr);
          }
        });
      }
      if(issues.length === 0) {
        issues = [...data.user.contributionsCollection.issueContributionsByRepository];
      } else {
        const newIssues = data.user.contributionsCollection.issueContributionsByRepository;
        newIssues.forEach(newIssue => {
          const foundIssue = issues.find(issue => (
            issue.repository.name === newIssue.repository.name &&
            issue.repository.owner.login === newIssue.repository.owner.login
          ));
          if (foundIssue) {
            foundIssue.contributions.edges = [...foundIssue.contributions.edges, ...newIssue.contributions.edges];
          } else {
            issues.push(newIssue);
          }
        });
      }

      start = new Date(end.getTime() + 1);
    }

    let repos = [];

    // filter out repos from the provided userid
    prs = prs.filter(r => r.repository.owner.login !== userid);
    prs = prs.map(r => {
      let repo = JSON.parse(JSON.stringify(r))
      let contribs = repo.contributions.edges.map(e => e.node.pullRequest);

      // filter out PRs that are not merged
      contribs = contribs.filter(c => c.merged);
      if (contribs.length === 0) {
        return 'X';
      }
      repo.repository.owner = repo.repository.owner.login;
      repo = {...repo.repository, contributionPrs: contribs, totalContribs: contribs.length};

      return repo;
    });
    
    prs = prs.filter(r => r !== 'X');
    if (prFilter.length > 0) {
      prFilter.forEach(r => {
        const index = prs.findIndex(repo => (repo.name === r.name) && (repo.owner === r.owner));
        if (index >= 0) {
          const prIndex = prs[index].contributionPrs.findIndex(pr => pr.number === r.number);
          if (prIndex >= 0) {
            prs[index].contributionPrs.splice(prIndex, 1);
            prs[index].totalContribs--;
          }
          if (prs[index].totalContribs === 0) {
            prs.splice(index, 1);
          }
        }
      })
    }

    if (prs.length > 0) {
      repos = [...prs];
    }

    // filter out repos from the provided userid
    issues = issues.filter(r => r.repository.owner.login !== userid);
    issues = issues.map(r => {
      let repo = JSON.parse(JSON.stringify(r))
      let contribs = repo.contributions.edges.map(e => e.node.issue);

      // filter out issues that are not closed and the userid did not author
      contribs = contribs.filter(c => c.closed && c.viewerDidAuthor);
      if (contribs.length === 0) {
        return 'X';
      }
      repo.repository.owner = repo.repository.owner.login;
      repo = {...repo.repository, contributionIssues: contribs, totalContribs: contribs.length};

      return repo;
    });

    issues = issues.filter(r => r !== 'X');
    if (issueFilter.length > 0) {
      issueFilter.forEach(r => {
        const index = issues.findIndex(repo => (repo.name === r.name) && (repo.owner === r.owner));
        if (index >= 0) {
          const issueIndex = issues[index].contributionIssues.findIndex(issue => issue.number === r.number);
          if (issueIndex >= 0) {
            issues[index].contributionIssues.splice(issueIndex, 1);
            issues[index].totalContribs--;
          }
          if (issues[index].totalContribs === 0) {
            issues.splice(index, 1);
          }
        }
      })
    }

    // if repo already in the array, add issues to it otherwise push it to the array
    issues.forEach(r => {
      const exists = repos.findIndex(repo => {
        return (repo.name === r.name) && (repo.owner === r.owner);
      });

      if (exists < 0) {
        repos.push(r);
        return;
      }

      repos[exists].contributionIssues = r.contributionIssues;
      repos[exists].totalContribs += r.totalContribs;
    });

    //const repoFilter = ['first-contributions']
    if (repoFilter.length > 0) {
      repoFilter.forEach(r => {
        const index = repos.findIndex(repo => {
          return (repo.name === r.name) && (repo.owner === r.owner);
        });
        if (index >= 0) {
          repos.splice(index, 1);
        }
      })
    }

    return repos;
  } catch(e) {
    console.log('Call to GitHub GraphQL API failed');
    throw e;
  }
}

module.exports = getGithubContribs;
