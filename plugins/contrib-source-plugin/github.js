const {GraphQLClient, gql} = require('graphql-request');
const EmojiConvertor = require('emoji-js');
const emoji = new EmojiConvertor();
emoji.replace_mode = 'unified';
emoji.allow_native = true;
emoji.allow_caps = true;

async function getGithubContribs(userid, userToken, repoFilter, issueFilter, prFilter) {
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
              description
              name
              owner {
                login
              }
              stargazerCount
              url
            }
            contributions(first: 15) {
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
              description
              name
              owner {
                login
              }
              stargazerCount
              url
            }
            contributions(first: 15) {
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

  const cropString = (str) => {
    if (str.length > 80) {
      const word = str.substring(80).indexOf(' ');
      if (word < 0) {
        return str;
      }

      return `${str.substring(0, 80+word)}...`;
    }
    return str;
  }

  try {
    let end = new Date(Date.now());
    let start = new Date(end);
    let prs = [];
    let issues = [];

    for(;;) {
      start.setFullYear(start.getFullYear() - 1);
      start = new Date(start.getTime() + 1);

      const data = await graphqlClient.request(query,
        {"login": userid, "startDateTime": start.toISOString(), "endDateTime": end.toISOString()});
      if(data.user.contributionsCollection.pullRequestContributionsByRepository.length === 0 && 
        data.user.contributionsCollection.issueContributionsByRepository.length === 0) {
          break;
        }
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
            newPr.contributions.edges.forEach(pr => {
              const inList = foundPr.contributions.edges.findIndex(p => pr.node.pullRequest.number === p.node.pullRequest.number);
              if(inList < 0) {
                foundPr.contributions.edges.push(pr);
              }
            });
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
            newIssue.contributions.edges.forEach(issue => {
              const inList = foundIssue.contributions.edges.findIndex(i => issue.node.issue.number === i.node.issue.number);
              if(inList < 0) {
                foundIssue.contributions.edges.push(issue);
              }
            });
          } else {
            issues.push(newIssue);
          }
        });
      }

      end = new Date(start.getTime() - 1);
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
      repo.repository.sortName = repo.repository.name.toLowerCase();
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
      repo.repository.sortName = repo.repository.name.toLowerCase();
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

    repos = repos.map(repo => ({
      ...repo,
      descriptionEmoji: cropString(emoji.replace_colons(repo.description)),
      stargazerPrint: repo.stargazerCount < 1000 ? `${repo.stargazerCount}` :
        Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(repo.stargazerCount)
    }));

    const sortContribs = (field) => {
      return (a, b) => {
        const aDate = new Date(a[field])
        const bDate = new Date(b[field])
        return bDate - aDate;
      }
    }
    repos.forEach(repo => {
      if (repo.contributionPrs && repo.contributionPrs.length > 1) repo.contributionPrs.sort(sortContribs("mergedAt"));
      if (repo.contributionIssues && repo.contributionIssues.length > 1) repo.contributionIssues.sort(sortContribs("closedAt"));
      
      const maxContribs = 12;
      const removeContribs = repo.totalContribs - maxContribs
      if (removeContribs > 0) {
        const dates = repo.contributionPrs.slice(-removeContribs)
          .map((pr => {return {time: pr.mergedAt}}));
        dates.concat(repo.contributionIssues.slice(-removeContribs)
          .map((pr => {return {time: pr.closedAt}})));
        dates.sort(sortContribs("time"));

        const dateArr = dates.map(d => d.time).reverse();
        const dateFilter = dateArr[removeContribs-1];

        const filterDates = (field) => {
          return (input) => {
            const aDate = new Date(input[field])
            const bDate = new Date(dateFilter)
            return bDate < aDate;
          }
        }

        repo.contributionPrs = repo.contributionPrs.filter(filterDates("mergedAt"));
        repo.contributionIssues = repo.contributionIssues.filter(filterDates("closedAt"));
        repo.totalContribs = repo.contributionIssues.length + repo.contributionPrs.length;
      }
    });

  

    return repos;
  } catch(e) {
    console.log('Call to GitHub GraphQL API failed');
    throw e;
  }
}

module.exports = getGithubContribs;
