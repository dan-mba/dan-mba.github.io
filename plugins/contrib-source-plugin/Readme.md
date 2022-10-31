## contrib-source-plugin

Gatsby plugin to source data about a user's GitHub Issue & PR contributions to others repos.

Usage:
```javascript
//gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: 'contrib-source-plugin',
      options: {
        // GitHub User ID to source repos for
        githubUserId: 'github-id', // REQUIRED
        // GitHub Auth Token for access (use an environment variable)
        githubUserToken: process.env.GITHUB_AUTH_TOKEN, //REQUIRED
        // Array of repos to filter out of sourced data
        // Default: []
        repoFilter: [{owner: 'firstcontributions', name: 'first-contributions'}],
        // Array of issues to filter out of sourced data
        // Default: []
        issueFilter: [{owner: 'firstcontributions', name: 'first-contributions', number: 1234}],
        // Array of pull requests to filter out of sourced data
        // Default: []
        prFilter: [{owner: 'firstcontributions', name: 'first-contributions', number: 1234}],
      }
    }
  ]
}
```
