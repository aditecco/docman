/* ---------------------------------
Base layout
--------------------------------- */

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Footer from "./footer"
import "../styles/layout.scss"

const Layout = ({ children }) => (
  <>
    <Header />

    <div className="mainContainer">{children}</div>

    {/* <Footer /> */}
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
