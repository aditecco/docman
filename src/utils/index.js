/* ---------------------------------
utils
--------------------------------- */

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import rehypePrism from "@mapbox/rehype-prism"
// import remarkGfm from "remark-gfm"
// import remarkToc from "remark-toc"

const ALLOWED_CLASSES = [
  "className",
  "language-js",
  "language-javascript",
  "language-css",
  "language-md",
  "language-scss",
  "language-mdx",
  "language-ts",
  "language-tsx",
  "language-jsx",
  "language-bash",
  "language-php",
  "language-pug",
  "language-text",
]

const ALLOWED_TOKENS = [
  "className",
  "addition",
  "attr",
  "attribute",
  "built_in",
  "bullet",
  "char",
  "code",
  "comment",
  "deletion",
  "doctag",
  "emphasis",
  "formula",
  "keyword",
  "link",
  "literal",
  "meta",
  "name",
  "number",
  "operator",
  "params",
  "property",
  "punctuation",
  "quote",
  "regexp",
  "section",
  "selector-attr",
  "selector-class",
  "selector-id",
  "selector-pseudo",
  "selector-tag",
  "string",
  "strong",
  "subst",
  "symbol",
  "tag",
  "template-tag",
  "template-variable",
  "title",
  "type",
  "variable",
]

export async function parseWithRemark(source) {
  if (!source) {
    throw new Error("Invalid MarkDown source")
  }

  return await unified()
    .use(remarkParse)
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
