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

  const docQuery = graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "docs" } }) {
        edges {
          node {
            childMarkdownRemark {
              id
              html
              timeToRead
              excerpt
              frontmatter {
                author
                path
                tags
                timestamp
                title
                toc
                type
              }
            }
          }
        }
      }
    }
  `)

  const cookbookQuery = graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "cookbooks" } }) {
        edges {
          node {
            childMarkdownRemark {
              id
              html
              timeToRead
              excerpt
              frontmatter {
                author
                path
                tags
                timestamp
                title
                toc
                type
              }
            }
          }
        }
      }
    }
  `)

  const quickRefQuery = graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "quick-refs" } }) {
        edges {
          node {
            childMarkdownRemark {
              id
              html
              timeToRead
              excerpt
              frontmatter {
                author
                path
                tags
                timestamp
                title
                toc
                type
              }
            }
          }
        }
      }
    }
  `)

  return Promise.all([docQuery, cookbookQuery, quickRefQuery])
    .then(results =>
      results.forEach(result => {
        result.data.allFile.edges.forEach(({ node }) => {
          createPage({
            path: node.childMarkdownRemark.frontmatter.path,
            component: DocTemplate,
            context: node,
          })
        })
      })
    )
    .catch(err => console.error("@gatsby-node", err))
}
