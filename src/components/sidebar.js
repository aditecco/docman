/* ---------------------------------
Sidebar
--------------------------------- */

import React, { ReactElement, useEffect, useRef, useState } from "react"

// interface IOwnProps {
//   toc: string
// }

export default function Sidebar({ toc } /*: IOwnProps*/) /*: ReactElement */ {
  const [collapsed, setCollapsed] = useState(false)
  let body = useRef(/*<HTMLDivElement>*/ null)

  useEffect(() => {
    body.current = document.querySelector(".DocBody")
  }, [])

  function toggleCollapsed() {
    setCollapsed(c => {
      if (!c) {
        body && body.current.setAttribute("style", "margin-left: 0")
        return true
      }

      body && body.current.setAttribute("style", "")
      return false
    })
  }

  return !collapsed ? (
    <aside className="DocSidebar">
      <form action="#" className="DocSidebarSearch">
        <input
          id="DocSidebarSearchInput"
          type="text"
          placeholder="Search topics…"
          onChange={e => console.log(e.target.value)}
        />

        <button className="DocSidebarSearchSubmit">
          <i className="material-icons">search</i>
        </button>
      </form>

      <div className="DocSidebarToc">
        <h6>Table of contents</h6>
      </div>

      <nav
        className="DocSidebarNav"
        dangerouslySetInnerHTML={{ __html: toc }}
      ></nav>

      <footer className="DocSidebarFooter">
        <small className="DocSidebarFooterMetaInfo">
          LocDocs documentation
          <br />
          v1.0.b198272
        </small>

        <a className="DocSidebarCollapse" href="#" onClick={toggleCollapsed}>
          <i className="material-icons">arrow_back</i>
        </a>
      </footer>
    </aside>
  ) : (
    <button className="DocSidebarCollapse" onClick={toggleCollapsed}>
      <i className="material-icons">arrow_forward</i> Reveal Sidebar
    </button>
  )
}
