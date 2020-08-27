/* ---------------------------------
cms.js
--------------------------------- */

import CMS from "netlify-cms-app"
import DocTemplate from "../templates/doc.template"

CMS.registerPreviewTemplate("docs", DocTemplate)

// https://www.netlifycms.org/docs/add-to-your-site/
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        log("YO")
        document.location.href = "/admin/"
      })
    }
  })
}

console.log("@@@@@@@@@@cms.js")
