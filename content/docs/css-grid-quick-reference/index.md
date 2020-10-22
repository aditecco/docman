---
title: CSS Grid Quick Reference
type: docs
date: 2020-10-22T21:59:13.385Z
path: /docs/css-grid-quick-reference
TOC: true
---

### Explicit grid VS implicit grid

> […] Whereas the explicit grid consists of any rows and columns defined with grid-template-columns or grid-template-rows. If you place something outside of the defined grid -- or due to the amount of content, more grid tracks are needed -- then the grid creates rows and columns in the implicit grid. These tracks will be auto-sized by default, resulting in their size being based on the content that is inside them. [source](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)

---

### Grid tracks

> tracks are numbered by the lines that start and stop them

---

### Properties of the grid container

- `display: grid;` activates CSS grid for the element's children


##### Explicit grid

- `grid-template-columns`, `grid-template-rows` set the size and number of cols/rows; one value for each col/row, unless `repeat()` is used
  - With `[<row name>]` we can set one or more names for our grid lines, i.e. `grid-template-columns: [sidebar-start] 1fr [sidebar-end content] 500px;`
  - A shorthand is available: `grid-template: <col values> / <row values>`
- `grid-template-areas` sets an "area name" for a given grid area; accepts one of more string values (one for each row), for example: `"sidebar content"`. An empty area (which we don't want to label) can be set with a dot `.` Grid areas will define an explicit grid, even if we don't lay out our rows/cols with `grid-template-columns`/`grid-template-rows` first.
- `grid-gap: <row & col value> | <row value> <col value>` shorthand for `grid-row-gap` & `grid-column-gap`, sets the space (gutter) between rows & columns
- `grid-area: <value> / <value> / <value> / <value>` accepts four values separated by slashes: `grid-row-start`, `grid-column-start`, `grid-row-end`, `grid-column-end`.
- `justify-items: start | end | center | stretch;` aligns items along the X axis
- `align-items: start | end | center | stretch;` aligns items along the Y axis
- The shorthand `place-items` with value `center center` is the equivalent of `justify-items: center;` & `align-items: center;`
- `justify-content: start | end | center | space-around | space-between;` aligns the whole grid along the X axis, provided there's empty space available
- `align-content: start | end | center | space-around | space-between;` aligns the whole grid along the Y axis, provided there's empty space available

  
##### Implicit grid

- `grid-auto-columns`, `grid-auto-rows` set the size of implicit cols/rows
- `grid-auto-flow` sets whether the implicit grid will generate columns or rows; default value is `row`
  - With `dense`, the browser will try to fill any empty spaces on the grid w/ the existing grid items (useful for "masonry" layouts)

---

### Properties of the grid items

- `grid-column-start`, `grid-column-end`, `grid-row-start`, `grid-row-end` set the grid track values where the grid item should start/end
- `grid-column`, `grid-row` (shorthand)
  - with only `<start number>`, the browser computes the given value for start and an `auto` value for end
  - with `<start number> / <end number>` sets where the grid item should start and end. `<end number>` accepts negative values; for example, `grid-column: 1 / -1` sets the column to cover all the container's width.
  - with `span <number>` sets how many rows/cols the grid item will span across; the number value refers to a grid track value. The start/end arguments define where the grid item should start/end
  - with `span <number> / <end>` or `<start> / span <number>` The start/end arguments define where the grid item should start/end
  - with `<area name>-start`, `<area name>-end` places the item using grid area names as start/end values instead of grid track numbers
  - with `<line-name>` places the item using line names as start/end values instead of grid track numbers
- `grid-area` places an element inside a given grid area; with this property we won't have to manually set where an item begins and ends
- `justify-self` overrides the value of `justify-items` for the given item
- `align-self` overrides the value of `align-items` for the given item
- `order: <number, zero-based>;` sets the order of the flex item

---

### Units

- `fr` defines the available space after all grid elements have been laid out

---

### Functions

- `repeat( <number> | <preset value>, <el-width> | <opt. el-width> )` sets a series of columns/rows; can accept a set of multiple widths, will generate rows/cols in an alternating pattern
  - With `auto-fill` creates as many sections in the explicit grid as the viewport permits, with the given width/height
  - With `auto-fit` ends the explicit grid at the last col/row with the given width/height
- `minmax()` sets the a minimum and maximum size for the col/row -- inherently responsive (also see the `fit-content()` CSS function)
