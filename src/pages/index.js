/* ---------------------------------
index
--------------------------------- */

import React from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import logo from "../images/dcm-logo.svg"
import "../styles/index.scss"

export default function HomePage({ data }) {
  return (
    <>
      <Helmet />

      <header className="header">
        <img src={logo} className="logo" alt={"DocMan logo"} />

        <div className="heading">
          <h1 className="headingTitle">{data.site.siteMetadata.description}</h1>

          <h3 className="headingSubtitle">
            Write, generate &amp; organize your documentation.
          </h3>
        </div>
      </header>

      {/* <div className="contentFilter">
          <nav>
            <ul className="listFilter">
              <li className="listFilterItem">
                Quick-refs
              </li>

              <li className="listFilterItem">
                Cookbooks
              </li>

              <li className="listFilterItem">
                Notes
              </li>

              <li className="listFilterItem">
                Excercises
              </li>

              <li className="listFilterItem">
                Random
              </li>
            </ul>
          </nav>
        </div> */}

      <main className="contentIndex">
        {/* <h4>{data.allMarkdownRemark.totalCount} Posts</h4> */}
        <ol>
          {data.allSanityPost.nodes.map((node) => (
            <li className="contentIndexItem" key={node.id}>
              <Link
                className="contentIndexItemAnchor"
                to={node.slug && node.slug.current}
              >
                <h3 className="contentIndexItemTitle">{node.title}</h3>

                {/* <p>{node.excerpt.substring(0, 60)}</p> */}
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </>
  )
}

// NOTE would be nice to string-interpolate
// in queries, but it's not possible yet
export const homepageQuery = graphql`
  fragment SiteMetadata on Site {
    siteMetadata {
      title
      description
      author
    }
  }

  {
    site {
      ...SiteMetadata
    }
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
