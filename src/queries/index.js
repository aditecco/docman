/* ---------------------------------
queries
--------------------------------- */

exports.ALL_SANITY_POST = `
{
  allSanityPost(limit: 1000) {
    nodes {
    id
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
`

exports.F_SITE_METADATA = `
fragment SiteMetadata on Site {
  siteMetadata {
    title
    description
    author
  }
}
`
