/* ---------------------------------
Doc template
--------------------------------- */

import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import "../styles/doc.template.scss"
import { parseWithRemark } from "../utils"

export default function DocTemplate(props) {
  const [pageBody, setPageBody] = useState("")
  const { pageContext: content } = props

  useEffect(() => {
    // TODO move all this processing to gatsby-node
    parseWithRemark(content.body).then(({ value }) => setPageBody(value))
  }, [])

  return (
    <Layout {...props}>
      <div className="DocContent">
        {/*<Sidebar toc={post.tableOfContents} />*/}

        <main className="DocBody">
          <h2 className="DocHeading">{content.title}</h2>

          {!pageBody ? (
            "loading"
          ) : (
            <div
              className="DocGeneratedContent"
              dangerouslySetInnerHTML={{
                __html: pageBody,
              }}
            />
          )}
        </main>
      </div>
    </Layout>
  )
}
