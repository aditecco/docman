/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const DocTemplate = path.resolve(`src/templates/doc.template.js`)

  return graphql(`
    {
      allSanityPost(limit: 1000) {
        nodes {
          title
          slug {
            current
          }
          author {
            name
          }
          categories {
            title
            description
          }
          publishedAt
          body
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allSanityPost.nodes.forEach((node) => {
      if (!node) return

      createPage({
        path: node.slug && node.slug.current,
        component: DocTemplate,
        context: {
          ...node,
          slug: node.slug && node.slug.current,
          author: node.author && node.author.name,
        },
      })
    })
  })
}
