/* ---------------------------------
CMS init
--------------------------------- */

import CMS from "netlify-cms"
import CmsTemplate from "../src/templates/cms.template"

CMS.registerPreviewTemplate("cms-template", CmsTemplate)
