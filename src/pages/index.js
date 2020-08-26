/* ---------------------------------
index
--------------------------------- */

import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
// import Base from "../components/base"
import SEO from "../components/seo"
import logo from "../images/dcm-logo.svg"
import "./index.scss"
import { Helmet } from "react-helmet"

const Index = data => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark {
          totalCount
          edges {
            node {
              id
              frontmatter {
                title
                path
              }
              excerpt
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet script="https://identity.netlify.com/v1/netlify-identity-widget.js" />

        <header className="header">
          <img src={logo} className="logo" />

          <div className="heading">
            <h1 className="headingTitle">
              Your personal documentation manager
            </h1>

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
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <li className="contentIndexItem" key={node.id}>
                <Link
                  className="contentIndexItemAnchor"
                  to={node.frontmatter.path}
                >
                  <h3 className="contentIndexItemTitle">
                    {node.frontmatter.title}
                  </h3>

                  {/* <p>{node.excerpt.substring(0, 60)}</p> */}
                </Link>
              </li>
            ))}
          </ol>
        </main>
      </>
    )}
  />
)

export default Index
