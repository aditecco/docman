/* ---------------------------------
Doc template
--------------------------------- */

import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import "../styles/doc.template.scss"
import { parseWithRemark } from "../utils"
import { ERROR_PARSING_CONTENT, TOC_MATCHER } from "../constants"

export default function DocTemplate(props) {
  const [pageHTML, setPageHTML] = useState("")
  const [TOC, setTOC] = useState("")
  const { pageContext: content } = props

  useEffect(() => {
    // TODO move all this processing to gatsby-node
    parseWithRemark(content.body).then(
      ({ value: html }) => {
        // TOOO refine & find alternative to dotall
        // please enable TS & optional chaining...
        const tocMatch = html.match(TOC_MATCHER)
        const toc =
          tocMatch && tocMatch.length
            ? tocMatch[0].replace("<h3>TOC</h3>", "")
            : ""

        setPageHTML(html.replace(TOC_MATCHER, "") || ERROR_PARSING_CONTENT)
        setTOC(toc || ERROR_PARSING_CONTENT)
      },

      (err) => console.error(err)
    )
  }, [])

  return (
    <Layout {...props}>
      <div className="DocContent">
        <Sidebar toc={TOC || "loading..."} />

        <main className="DocBody">
          <h2 className="DocHeading">{content.title}</h2>

          <div
            className="DocGeneratedContent"
            dangerouslySetInnerHTML={{
              __html: pageHTML || "loading...",
            }}
          />
        </main>
      </div>
    </Layout>
  )
}
