/* ---------------------------------
Doc template
--------------------------------- */

import React from "react"
import { graphql } from "gatsby"
import Base from "../../components/base"
import "./doc.template.scss"
import Sidebar from "../../components/sidebar"

export default function DocTemplate(props) {
  const { data } = props
  const { markdownRemark: post } = data

  return (
    <Base {...props}>
      <div className="DocContent">
        <Sidebar toc={post.tableOfContents} />

        <main className="DocBody">
          <h2 className="DocHeading">
            {post.frontmatter.title
              .replace("-", " ")
              .replace(/\b\w/g, r => r.toUpperCase())}
          </h2>

          <div
            className="DocGeneratedContent"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </main>
      </div>
    </Base>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
      tableOfContents(
        pathToSlugField: "frontmatter.path"
        heading: null
        maxDepth: 4
      )
    }
  }
`
