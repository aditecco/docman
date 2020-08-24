/* ---------------------------------
Sidebar
--------------------------------- */

import React, { ReactElement, ReactHTML } from "react"

interface IOwnProps {
  toc: string
}

export default function Sidebar({ toc }: IOwnProps): ReactElement {
  return (
    <aside className="DocSidebar">
      <form action="" className="DocSidebarSearch">
        {/* <label htmlFor="DocSidebarSearchInput">
              Search
            </label> */}

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

      {/* <a className="DocSidebarCollapse" href="#" alt="Collapse sidebar"></a> */}

      <footer className="DocSidebarFooter">
        <small className="DocSidebarFooterMetaInfo">
          LocDocs documentation
          <br />
          v1.0.b198272
        </small>

        <a className="DocSidebarCollapse" href="#" alt="Collapse sidebar">
          <i className="material-icons">arrow_back</i>
        </a>
      </footer>
    </aside>
  )
}
