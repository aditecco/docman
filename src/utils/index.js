/* ---------------------------------
utils
--------------------------------- */

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import rehypePrism from "@mapbox/rehype-prism"
import remarkToc from "remark-toc"
import { ALLOWED_CLASSES, ALLOWED_TOKENS, TOC_KEY } from "../constants"
// import remarkGfm from "remark-gfm"

export async function parseWithRemark(source) {
  if (!source) {
    throw new Error("Invalid MarkDown source")
  }

  return await unified()
    .use(remarkParse)
    .use(remarkToc, {
      heading: TOC_KEY,
      maxDepth: 4,
      tight: true,
    })
    .use(remarkRehype)
    .use(rehypeSanitize, {
      // https://github.com/rehypejs/rehype-sanitize#example-syntax-highlighting
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        pre: [...(defaultSchema.attributes.pre || []), ALLOWED_CLASSES],
        code: [...(defaultSchema.attributes.code || []), ALLOWED_CLASSES],
        span: [...(defaultSchema.attributes.span || []), ALLOWED_TOKENS],
      },
    })
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(source)
}
