/* ---------------------------------
constants
--------------------------------- */

export const ALLOWED_CLASSES = [
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

export const ALLOWED_TOKENS = [
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

export const TOC_KEY = "TOC"
export const TOC_MATCHER = /^(.+?)<\/ul>/s
export const ERROR_PARSING_CONTENT =
  "There was an error in parsing the page's content."
