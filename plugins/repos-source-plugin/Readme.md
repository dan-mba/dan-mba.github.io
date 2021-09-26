## repos-source-plugin

Gatsby plugin to source data about a user's GitHub repos.

Usage:
```javascript
//gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: 'repos-source-plugin',
      options: {
        // GitHub User ID to source repos for
        githubUserId: 'github-id', // REQUIRED
        // GitHub Auth Token for access (use an environment variable)
        githubUserToken: process.env.GITHUB_AUTH_TOKEN, //REQUIRED
        // List of languages of which 1 must be part of repo for it to be included
        // Default: ['Javascript']
        portfolioLanguages: ['JavaScript','Vue','Python','TypeScript']
      }
    }
  ]
}
```
