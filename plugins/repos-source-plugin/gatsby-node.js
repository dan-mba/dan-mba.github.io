import { createRemoteFileNode } from 'gatsby-source-filesystem';
import getGithubRepos from './github.js';

export const pluginOptionsSchema = ({ Joi }) => Joi.object({
  githubUserId: Joi.string().required()
    .description('GitHub user id to fetch repos for'),
  githubUserToken: Joi.string().required()
    .description('GitHub user token for auth'),
  portfolioLanguages: Joi.array().items(Joi.string()).default(['JavaScript'])
    .description('List of languages for repo to be included'),
})

export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(
    `
      type Repo implements Node {
        localImage: File @link(from: "localImageId")
      }
    `
  );
}

export const sourceNodes = async ({ actions, createNodeId, createContentDigest, store, cache, reporter },
  {githubUserId, githubUserToken, portfolioLanguages}) => {
  const { createNode } = actions;
  const repos = await getGithubRepos(githubUserId, githubUserToken, portfolioLanguages);

  for (const repo of repos) {
    const id = createNodeId(`REPO-${repo.name}`);
    
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      url: repo.openGraphImageUrl,
      parentNodeId: id,
      createNode,
      createNodeId,
      reporter,
      cache,
      store
    })

    const node = {
      ...repo,
      id,
      parent: null,
      children: [],
      localImageId: fileNode.id,
      internal: {
        type: "Repo",
        content: JSON.stringify(repo),
        contentDigest: createContentDigest(repo),
      },
    }
    createNode(node)
  }
};
