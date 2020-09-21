/* ---------------------------------
Header
--------------------------------- */

import { Link } from "gatsby"
// import PropTypes from "prop-types"
import React from "react"
import logo from "../images/dcm-logo.svg"
import "../styles/header.scss"

const Header = props => (
  <header className="Header">
    <Link to="/">
      <div className="logo">
        <img src={logo} alt="LocDocs logo" />
      </div>
    </Link>

    <nav className="MainNav">
      <ul>
        <li>
          <Link className="MainNavItem" to="/">
            {`Quick-Refs`}
          </Link>
        </li>

        <li>
          <Link className="MainNavItem" to="/">
            {`Cookbooks`}
          </Link>
        </li>

        {/* <li>
          <Link
            className="MainNavItem"
            to="/"
          >
            {`Notes`}
          </Link>
        </li> */}

        {/* <li>
          <Link
            className="MainNavItem"
            to="/"
          >
            {`Exercises`}
          </Link>
        </li> */}

        <li>
          <Link className="MainNavItem" to="/">
            {`Random`}
          </Link>
        </li>
      </ul>
    </nav>
  </header>
)

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header
