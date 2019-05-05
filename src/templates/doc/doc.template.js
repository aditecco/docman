
/* ---------------------------------
Doc template
--------------------------------- */

import React from "react"
import { graphql } from "gatsby"
import Base from '../../components/base';
import './doc.template.scss'

export default function DocTemplate(props) {
  const { data } = props;
  const { markdownRemark: post } = data;

  return (
    <Base {...props}>
      <div className="DocContent">
        <aside className="DocSidebar">
          <form action="" className="DocSidebarSearch">
            {/* <label htmlFor="DocSidebarSearchInput">
              Search
            </label> */}

            <input
              id='DocSidebarSearchInput'
              type="text"
              placeholder='Search topics…'
              onChange={(e) => console.log(e.target.value)}
            />

            <button className="DocSidebarSearchSubmit">
              <i className="material-icons">search</i>
            </button>
          </form>

          <div className="DocSidebarToc">
            <h6>
              Table of contents
            </h6>
          </div>

          <nav
            className="DocSidebarNav"
            dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
          >
          </nav>

          {/* <a className="DocSidebarCollapse" href="#" alt="Collapse sidebar"></a> */}
          
          <footer className="DocSidebarFooter">
            <small className="DocSidebarFooterMetaInfo">
              LocDocs documentation<br/>
              v1.0.b198272
            </small>

            <a
              className="DocSidebarCollapse"
              href="#"
              alt="Collapse sidebar"
            >
              <i className='material-icons'>arrow_back</i>
            </a>
          </footer>
        </aside>

        <main className="DocBody">
          <h2 className="DocHeading">
            {
              post.frontmatter.title
              .replace('-', ' ')
              .replace(/\b\w/g, r => r.toUpperCase())
            }
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
