---
author: ""
path: "/reference/sass"
tags: []
timestamp: ""
title: "sass-quick-reference"
toc: true
type: "quick-reference"
---

### Comments

Slash-style `//` comments are ignored by the Sass compiler.

```scss
.surveyor {
  border: 1px solid #ccc;
  padding: 20px;
}

// refactor this later!

.surveyor h2 {
  font-size: 18px;
}
.surveyor h2 a {
  color: green;
}
```

---

### Imports

In standard CSS, the `@import` statement requires a file extension: `@import 'settings.css';`; in Sass, there's no need for it.

```scss
@import "settings";

h1 {
  color: $color-base;
}
```

---

### Nesting

When we indent a selector, we define a descendant relationship.

```scss
.surveyor {
  border: 1px solid #ccc;
  padding: 20px;
  h2 {
    font-size: 18px;
    a {
      color: green;
    }
  }
}
```

###### CSS output

```css
.surveyor {
  border: 1px solid #ccc;
  padding: 20px;
}
.surveyor h2 {
  font-size: 18px;
}
.surveyor h2 a {
  color: green;
}
```

#### Nesting properties

We can also nest properties, those with matching namespaces:

```scss
.btn {
  text-decoration: underline;
  text-transform: lowercase;
}
```

Can be written as:

```css
.btn {
  text: {
    decoration: underline;
    transform: lowercase;
  }
}
```

#### The parent selector

While nesting, we can reference the parent selector w/ the `&` symbol.

```scss
.notice {
  background: yellow;
  border: 5px solid #000;
  padding: 20px;
  &.alert {
    background: red;
    box-shadow: 0 0 10px red;
  }
}
```

Notice we are creating a _compound selector_ `.notice.alert`, not a mere descendant relationship:

###### CSS output

```css
.notice {
  background: yellow;
  border: 5px solid #000;
  padding: 20px;
}
.notice.alert {
  background: red;
  box-shadow: 0 0 10px red;
}
```

In the output, `&` will simply be replaced w/ the selector it refers to.

Another typical use case for this technique is pseudo-selectors:

```scss
.notice {
  background: yellow;
  border: 5px solid #000;
  padding: 20px;
  a {
    color: #222;
    &:hover {
      color: #313131;
    }
  }
}
```

###### CSS Output

```css
.notice {
  background: yellow;
  border: 5px solid #000;
  padding: 20px;
}
.notice a {
  color: #222;
}
.notice a:hover {
  color: #313131;
}
```

Selectors can also be added **before** the `&` reference:

```scss
.surveyor {
  border: 1px solid #ccc;
  padding: 20px;
  .factory & {
    padding: 30px;
  }
}
```

###### CSS Output

```css
.surveyor {
  border: 1px solid #ccc;
  padding: 20px;
}
.factory .surveyor {
  padding: 30px;
}
```

Beware of excessive nesting: try limiting nesting to 3 or 4 levels and consider refactoring anything deeper.

```scss
.notice {
  background: yellow;
  border: 5px solid #000;
  padding: 20px;
  &.alert {
    background: red;
    box-shadow: 0 0 10px red;
  }
  a {
    color: #222;
    &:hover {
      color: #313131;
    }
  }
}
```

###### CSS Output

```css
.notice {
  background: yellow;
  border: 5px solid #000;
  padding: 20px;
}
.notice.alert {
  background: red;
  box-shadow: 0 0 10px red;
}
.notice a {
  color: #222;
}
.notice a:hover {
  color: #313131;
}
```

---

### Variables

- Variable syntax: `$var-name: var-value;`
- Variables can accept: strings (w/ or w/o quotes), numbers (w/ or w/o units), booleans, comma/space-separated lists, `null`.
- Variables are block-scoped
- Re-assigning a local var overrides the corresponding global var -- or: _overwriting a var in a declaration is global_

```scss
$base-color: #797979;

.surveyor {
  border: 1px solid $base-color;
  padding: 20px;
}
.surveyor h2 {
  color: $base-color;
  font-size: 18px;
}

.notice {
  background: yellow;
  border: 5px solid $base-color;
  padding: 10px;
}
```

#### The default flag

- A variable with the `!default` flag will be used as default **unless another value** for the same var **isn't already defined elsewhere.**
- `!default` **prevents overriding** a variable of the same name set elsewhere.

```scss
$base-padding: 10px !default;

.modal {
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  padding: $base-padding;
}
.modal-title {
  border-bottom: 1px solid #ccc;
  font-size: 24px;
  padding: $base-padding;
}
.modal-action {
  background: purple;
  display: block;
  padding: $base-padding;
}
```

#### Variables w/ lists

```scss
$modal-padding: 20px 10px 15px !default;

.modal {
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  padding: $modal-padding;
}
.modal-title {
  border-bottom: 1px solid #ccc;
  font-size: 24px;
  padding: $modal-padding;
}
.modal-action {
  background: purple;
  display: block;
  padding: $modal-padding;
}
```

#### Variable nesting

```scss
$font-base: "Helvetica Neue", Helvetica, Arial, sans-serif;

body {
  font-family: $font-base;
  background: #fff;
  font: normal 16px/1.5 $font-base;
  margin: 0;
  padding: 0;
}
.blueprint {
  font: bold 24px/1.3 Georgia, serif;
  text-align: center;
  span {
    font-family: $font-base;
  }
}
```

#### Variable interpolation

Similar to JavaScript ES6's string templates, we can interpolate variables with the syntax `#{$var-name}`

```scss
$border-side: left;

.girder {
  border-#{$border-side}: 4px solid #ccc;
  h2 {
    font-size: 24px;
  }
}
.notice {
  border-#{$border-side}: 8px solid #797979;
  a {
    color: #222;
  }
}
```

---

### Mixins

Mixins are **blocks of reusable code** that can take optional arguments -- very similar to JS functions.<br>
They are declared w/ `@mixin my-mixin {}` and called w/ `@include my-mixin` -- the former must always precede the latter in the code.

Optionally, they can declare arguments `@mixin my-mixin($arg) {}` - and pass arguments `@include my-mixin(arg-value)`:

- We can define **default values** for arguments: `@mixin my-mixin($arg: default-value) {}`
- Or **multiple arguments:** `@mixin my-mixin($arg-1, $arg-2) {}`
- In a mixin w/ multiple arguments, any argument w/ a default value will be considered **optional** -- we'll be able to omit it when calling the mixin
  - Optional args must always come last in the arg list -- they cannot precede a non-optional arg
  - If we use **'keyword arguments'** we can pass our arguments in any order: `@mixin my-mixin($arg-1, $arg-2: default-value) {}` and `@include my-mixin($arg-2: value, $arg-1: value)`
- What about passing complex arguments that contain commas? Given `@mixin base-gradient($grad-definition) {}`, calling `@include base-gradient(to bottom, white, black)` would throw an error as the commas would be interpreted as argument separators
  - We can overcome this by using **variable arguments:** `@mixin base-gradient($grad-definition...) {}` -- similar to ES6's rest params
  - Variable args can also be used when calling a mixin

###### No args

```scss
@mixin assemble {
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
}

.factory {
  @include assemble;
}
.highrise {
  @include assemble;
}
```

###### w/ argument

```scss
@mixin assemble($bg) {
  background: $bg;
  border: 1px solid #ccc;
  padding: 10px;
}

.factory {
  @include assemble(#fff);
}
.highrise {
  @include assemble(#797979);
}
```

###### w/ default argument

```scss
@mixin assemble($bg: #fff) {
  background: $bg;
  border: 1px solid #ccc;
  padding: 10px;
}

.factory {
  @include assemble; // uses default value
}
.highrise {
  @include assemble(#797979);
}
```

###### w/ multiple arguments

```scss
@mixin assemble($bg: #fff, $pad: 10px) {
  background: $bg;
  border: 1px solid #ccc;
  padding: $pad;
}

.factory {
  @include assemble; // uses default values for all args
}
.highrise {
  @include assemble(#797979, 20px);
}
```

###### w/ keyword arguments

```scss
@mixin assemble($bg: #fff, $pad: 10px) {
  background: $bg;
  border: 1px solid #ccc;
  padding: $pad;
}

.factory {
  @include assemble;
}
.highrise {
  @include assemble(
    $bg: #797979,
    $pad: 20px
  ); // we repeat the exact variable name inclusive of `$`, followed by the value
}
```

###### Argument interpolation

```scss
@mixin assemble($side, $bg: #fff, $pad: 10px) {
  background: $bg;
  border-#{$side}: 1px solid #ccc;
  padding: $pad;
}

.factory {
  @include assemble(left);
}
.highrise {
  @include assemble(right, $bg: #797979, $pad: 20px);
}
```

###### Variable arguments

```scss
@mixin modal($shadow...) {
  box-shadow: $shadow;
  border: 1px solid #ccc;
}

.modal {
  @include modal(inset 0 0 5px #000, 0 2px 5px #000);
}
```

---

### Extends

Extends are useful for managing CSS properties that are _repeated among different elements._

```scss
.blueprint {
  background: blue;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 10px;
}
.surveyor {
  @extend .blueprint;
  color: #fff;
}
```

###### CSS output

```css
.blueprint,
.surveyor {
  background: blue;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 10px;
}

.surveyor {
  color: #fff;
}
```

##### Extends w/ nesting

```scss
.notice {
  background: yellow;
  border: 5px solid #000;
  padding: 20px;
  &.alert {
    background: red;
    box-shadow: 0 0 10px red;
  }
  a {
    color: #222;
    &:hover {
      color: #313131;
    }
  }
}

.error {
  @extend .notice;
}
```

Notice how the Sass compiler traverses the tree structure and recursively generates the CSS:

- `.notice, .error` - extends common properties
- `.notice.alert, .alert.error` - parses the parent selector `&`
- `.notice a, .error a` - parses the nested selector
- `.notice a:hover, .error a:hover` - parses the parent selector on the nested selector

###### CSS Output

```css
.notice,
.error {
  background: yellow;
  border: 5px solid #000;
  padding: 20px;
}
.notice.alert,
.alert.error {
  background: red;
  box-shadow: 0 0 10px red;
}
.notice a,
.error a {
  color: #222;
}
.notice a:hover,
.error a:hover {
  color: #313131;
}
```

###### Another example

```scss
.socket {
  border-radius: 50%;
  padding: 15px;
  width: 30px;
}
.wrench {
  @extend .socket;
  width: 100px;
}
.bolt {
  @extend .socket;
  padding: 14px;
}
```

###### CSS Output

```css
.socket,
.wrench,
.bolt {
  border-radius: 50%;
  padding: 15px;
  width: 30px;
}

.wrench {
  width: 100px;
}

.bolt {
  padding: 14px;
}
```

---

### Placeholder selectors

- Placeholder selectors are denoted with a `%`
- Can be extended, but never become a selector of their own
- Useful for extending common blocks of CSS code while avoiding the creation of extra classes

```scss
%group {
  zoom: 1;
  &:before,
  &:after {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
  }
}

.factory {
  @extend %group;
  background: #fff;
}
```

###### CSS Output

```css
.factory {
  zoom: 1;
}
.factory:before,
.factory:after {
  content: "";
  display: table;
}
.factory:after {
  clear: both;
}

.factory {
  background: #fff;
}
```

###### Another example

```scss
%container {
  background: blue;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 10px;
}

.blueprint {
  @extend %container;
}

.surveyor {
  @extend %container;
  color: #fff;
}

.factory {
  background: #fff;
  .blueprint {
    margin-bottom: 20px;
  }
}
```

###### CSS Output

```css
.blueprint,
.surveyor {
  background: blue;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 10px;
}

.surveyor {
  color: #fff;
}

.factory {
  background: #fff;
}

.factory .blueprint {
  margin-bottom: 20px;
}
```

---

### Functions

- Function syntax: `@function myFunction() { @return <value/expression>; }`; call: `myFunction();` -- notice that `@include` is not needed (it's easy to get confused, since this syntax is very similar to the one used for mixins)
  - Arguments are optional; `()` instead are required, like in JS
- For function arguments, the same rules as Sass mixins apply

```scss
@function aspect($width) {
  @return $width * 9 / 16;
}

.intro {
  background: #000;
  width: 500px;
  height: aspect(500px);
}
```

###### CSS Output

```css
.intro {
  background: #000;
  width: 500px;
  height: 281.25px;
}
```

---

### Mixins, extends, functions: when to use which

- **Mixins:** similar sets of properties <u>used multiple times</u> with small variations
- **Extends:** sets of properties that <u>match exactly</u>
- **Functions:** commonly-used operations to <u>determine values</u>

---

### Conditionals

`@if` statement syntax:

```
@if <condition> {
  <rule>
}
```

- `@else` is available
- `@else if` is also available

```scss
$size: 18px;

.switch {
  font-size: $size;
  @if $size <= 16 {
    font-family: "Arial, sans-serif";
  } @else {
    font-family: "Helvetica, sans-serif";
  }
}
```

###### CSS Output

```css
.switch {
  font-size: 18px;
  font-family: "Helvetica, sans-serif";
}
```

##### Else if

```scss
$size: 18px;

.switch {
  font-size: $size;
  @if $size <= 16 {
    font-family: "Arial, sans-serif";
  } @else if $size <= 24 {
    font-family: "Georgia, serif";
  } @else {
    font-family: "Helvetica, sans-serif";
  }
}
```

---

### Iteration

##### `@each`

- The `@each` directive allows us to loop through each list item, similar to a JS `for ... in` loop
- The syntax: `@each $list-element in $list { <rules> }`

```scss
$tools: socket, wrench, bolt;

@each $el in $tools {
  .tool-#{$el} {
    background: url("#{$el}.png") no-repeat;
  }
}
```

###### CSS Output

```css
.tool-socket {
  background: url("socket.png") no-repeat;
}

.tool-wrench {
  background: url("wrench.png") no-repeat;
}

.tool-bolt {
  background: url("bolt.png") no-repeat;
}
```

##### `@for`

The syntax:

```
@for $i from <iterator initial value> through <iterator final value> {
  <rules>
}
```

- When declaring the loop, we initialize the iterator var, `$i`
- We also manually specify where our loop should start and end

##### `@while`

The syntax:

```
$i: <iterator initial value>

@while $i <condition> {
  <rules>

  $i: $i + <iterator increment>;
}
```

- `@while` requires manually initializing `$i`
- `@while` requires manually updating the index (`$i`)! -- otherwise the loop would run ad infinitum

```scss
$i: 1;

@while $i <= 7 {
  .row-#{$i} {
    background: #ccc;
    height: $i * 10px;
  }

  $i: $i + 2;
}
```

###### CSS Output

```css
.row-1 {
  background: #ccc;
  height: 10px;
}

.row-3 {
  background: #ccc;
  height: 30px;
}

.row-5 {
  background: #ccc;
  height: 50px;
}

.row-7 {
  background: #ccc;
  height: 70px;
}
```

---

### Arithmetic

- Available math operators:
  - `+`, addition
  - `-`, subtraction
  - `*`, multiplication
  - `/`, division
  - `%`, modulus
- Available built-in math functions:
  - `round($number)` - round to closest whole number
  - `ceil($number)` - round up
  - `floor($number)` - round down
  - `abs($number)` - absolute value
  - `min($list)` - minimum list value
  - `max($list)` - maximum list value
  - `percentage($number)` - convert to percentage
- Sass defaults to returning (up to) ﬁve digits after a decimal point
- Divisions can fail to trigger due to the fact that `/` can be a part of certain CSS properties; to alleviate this we can:
  - Enclose division in parentheses: `(5 / 1)`
  - Use variables: `$var / 10`
  - Make division a part of a larger arithmetic operation: `20px * 5 / 2`
- Sass will force-convert compatible units: `10px + 4pt // 15.33333px;`
- Operations on non-compatible units will generate errors: `10px + 4em // Error, absolute VS relative unit`

```scss
$gutter: 20px;

.factory {
  background: #fff;
  margin-right: $gutter;
  width: 600px - $gutter;
}
.highrise {
  background: #797979;
  margin-right: $gutter;
  width: 300px - $gutter;
}
```

###### CSS Output

```css
.factory {
  background: #fff;
  margin-right: 20px;
  width: 580px;
}

.highrise {
  background: #797979;
  margin-right: 20px;
  width: 280px;
}
```

---

### Color functions

- Colors can be used in arithmetic operations: `$base-color + fff` (color arithmetic)
- Sass provides a `rgba()` function that accepts:
  - hex color values: `rgba(#333, .5)`
  - variables: `rgba($primary-dark, .25)`
- Common color functions:
  - `lighten($color, <percentage>)`
  - `darken($color, <percentage>)`
  - `saturate($color, <percentage>)`
  - `desaturate($color, <percentage>)`
  - `mix($color-1, $color-2)` or `mix($color-1, $color-2, <percentage>)`
  - `grayscale($color)`
  - `invert($color)`
  - `complement($color)`
  - More…

```scss
$color-link: #3097b4;

a {
  color: $color-link;
  text-decoration: underline;
  &:hover {
    color: invert($color-link);
  }
  &:active {
    color: desaturate(darken($color-link, 15%), 25%);
  }
}
```

###### CSS Output

```css
a {
  color: #3097b4;
  text-decoration: underline;
}
a:hover {
  color: #cf684b;
}
a:active {
  color: #335a65;
}
```

---

### Concatenation

- Addition applied on strings will perform string concatenation
- `''` or `""` will be applied to the output only if present on the left-side operator

```scss
$theme: modern;
$font: "serif";

@if $theme == modern {
  $font: "sans-" + $font;
}

.sign {
  font-family: $font;
}
```

###### CSS Output

```css
.sign {
  font-family: "sans-serif";
}
```

---

### Number functions

```scss
$size: 3.75em;

.sign {
  font-size: 3.75em;
  font-weight: bold;
  padding: 20px 40px;
  span {
    font-size: round($size / 2);
  }
}
```

###### CSS Output

```css
.sign {
  font-size: 3.75em;
  font-weight: bold;
  padding: 20px 40px;
}
.sign span {
  font-size: 2em;
}
```

---

### Color shorthand

- Colors can be used in arithmetic operations: `$base-color + fff` (color arithmetic)
- Sass provides a `rgba()` function that accepts:
  - hex color values: `rgba(#333, .5)`
  - variables: `rgba($primary-dark, .25)`
- Common color functions:
  - `lighten($color, <percentage>)`
  - `darken($color, <percentage>)`
  - `saturate($color, <percentage>)`
  - `desaturate($color, <percentage>)`
  - `mix($color-1, $color-2)` or `mix($color-1, $color-2, <percentage>)`
  - `grayscale($color)`
  - `invert($color)`
  - `complement($color)`
  - More…

```scss
$color-base: #797979;

.modal {
  background: rgba($color-base, 0.75);
  border: 1px solid $color-base;
  padding: 20px;
}
```

###### CSS Output

```css
.modal {
  background: rgba(121, 121, 121, 0.75);
  border: 1px solid #797979;
  padding: 20px;
}
```

---

### Media queries

Basic use of media queries in Sass through the `@media` keyword and nesting:

```css
.sidebar {
  border: 1px solid #ccc;
  @media (min-width: 700px) {
    float: right;
    width: 30%;
  }
}
```

#### The respond-to pattern

```scss
@mixin respond-to {
  @media (min-width: 700px) {
    @content // receives the content of the `@include` that follows;;;;;;
  }
}

.sidebar {
  border: 1px solid #ccc;
  @include respond-to {
    // the content of this block is passed into `@content`
    float: right;
    width: 30%;
  }
}
```

Will output:

```css
.sidebar {
  border: 1px solid #ccc;
}

@media (min-width: 700px) {
  .sidebar {
    float: right;
    width: 30%;
  }
}
```

Which is the same output we'd get with the regular nested media query:

```css
.sidebar {
  border: 1px solid #ccc;
  @media (min-width: 700px) {
    float: right;
    width: 30%;
  }
}
```

Anyway, this technique can be much more flexible:

```scss
@mixin respond-to($val, $query) {
  @media ($val: $query) {
    @content // receives the content of the `@include` that follows;;;;;;
  }
}

.sidebar {
  border: 1px solid #ccc;
  @include respond-to(min-width, 700px) {
    // we're dynamically passing media query properties as arguments
    // the content of this block is passed into `@content`
    float: right;
    width: 30%;
  }
}
```

An example:

```scss
@mixin respond-to($query) {
  @media (min-width: $query) {
    @content;
  }
}

.factory {
  width: 100%;
  @include respond-to(960px) {
    width: percentage(600px / 960px);
  }
  @include respond-to(768px) {
    width: 50%;
  }
}
```

###### CSS Output

```css
.factory {
  width: 100%;
}
@media (min-width: 960px) {
  .factory {
    width: 62.5%;
  }
}
@media (min-width: 768px) {
  .factory {
    width: 50%;
  }
}
```
