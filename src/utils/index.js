/* ---------------------------------
utils
--------------------------------- */

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
// import remarkGfm from "remark-gfm"
// import remarkToc from "remark-toc"

export async function parseWithRemark(source) {
  if (!source) {
    throw new Error("Invalid MarkDown source")
  }

  return await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(source)
}
