
/* ---------------------------------
Footer
--------------------------------- */

import PropTypes from "prop-types"
import React from "react"

const Footer = ({ footerCopy }) => (
  <footer>
    <small>
      {footerCopy}
    </small>
  </footer>
)

Footer.propTypes = {
  footerCopy: PropTypes.string,
}

Footer.defaultProps = {
  footerCopy: `&copy; 2019 LocDocs `,
}

export default Footer
