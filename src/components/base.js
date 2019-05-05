
/* ---------------------------------
Base layout
--------------------------------- */

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Footer from "./footer"
import "../styles/base.scss"

const Base = ({ children }) => (
  <>
    <Header />

    <div className='mainContainer'>
      {children}
    </div>

    {/* <Footer /> */}
  </>
)

Base.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Base
