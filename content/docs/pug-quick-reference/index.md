---
title: Pug Quick Reference
type: docs
date: 2020-08-27T01:33:19.730Z
path: /docs/
TOC: true
---
### Base Syntax

- no angle brackets
- no closing tags
- indentation sensitive (structure is given via indentation)


```pug
doctype
html
  head
  body
```

Compiles to:

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body></body>
</html>
```

---

### Comments

There's a special syntax for Pug-only comments (non-compiled): `//-`

```pug
// this comment will be compiled into HTML
//- this comment won't
```

Compiles to:

```html
<!-- this comment will be compiled into HTML-->
```

---

### Classes & IDs

```pug
div.myClass
// notice that we can omit div, as it's a default
.myClass
div#myId
```

Compiles to:

```html
<div class="myClass"></div>
<!-- notice that we can omit div, as it's a default-->
<div class="myClass"></div>
<div id="myId"></div>
```

---

### Attributes

We can easily create attributes like this:

```pug
img(class='featured', width='600px', height='600px')
```

Compiles to:


```html
<img class="featured" width="600px" height="600px"/>
```

<!-- #### Interpolation in attributes -->

```pug
- var colorList = {$turqoise: '#1abc9c', $greenSea: '#16a085', $emerald: '#2ecc71'}

ul.color-ref-modal-content
  each hexCode, colorName in colorList
    li.color-ref-modal-item(style="background-color:" + hexCode) #{colorName}
```

Notice how in `li.color-ref-modal-item(style="background-color:" + hexCode)` we are constructing an attribute via string interpolation.

---

### Variables

We can create variables and pass them into our Pug elements `- var <varName> = <value>` -- `#{<varName>}`

```pug
- var pageTitle = 'My web page'

doctype
html
  head
    title #{pageTitle}
  body
    main
      section
        div.container
          header
            h1.main-title #{pageTitle}
```

Compiles to:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My web page</title>
  </head>
  <body>
    <main>
      <section>
        <div class="container">
          <header>
            <h1 class="main-title">My web page</h1>
          </header>
        </div>
      </section>
    </main>
  </body>
</html>
```

Notice how Pug automatically closes all our tags for us.

---

### Iteration

We can create loops with the `each` keyword, passing a list element and a list index:

```pug
- var listEls = ['lorem', 'ipsum', 'dolor']

ul
  each el in listEls
    li List item: #{el}

//- using both available arguments element & index
ul
  each el, ind in listEls
    li List item #{ind}: #{el}
```

Compiles to:

```html
<ul>
  <li>List item: lorem</li>
  <li>List item: ipsum</li>
  <li>List item: dolor</li>
</ul>
<ul>
  <li>List item 0: lorem</li>
  <li>List item 1: ipsum</li>
  <li>List item 2: dolor</li>
</ul>
```

Iterations also works w/ objects: in our `each` loop we can access object values and properties -- in this order.

```pug
- var colorList = {$turqoise: '#1abc9c', $greenSea: '#16a085', $emerald: '#2ecc71'}

ul.color-ref-modal-content
  // values, properties
  each hexCode, colorName in colorList
    li.color-ref-modal-item(style="background-color:" + hexCode) #{colorName}
```

Notice how in `li.color-ref-modal-item(style="background-color:" + hexCode)` we are constructing an attribute via string interpolation.

---

### Templates

We can build templates with the `block` and `extends` keywords:

<!-- ###### Template example -->

```pug
- var pageTitle = 'My web page'

doctype
html
  head
    title #{pageTitle}
  body
    main
      section
        div.container
          header
            h1.main-title #{pageTitle}
            block intro
              p Lorem ipsum dolor sit amet
```

When we create a page based on a template, we inherit all the contents with `extends`; then, we can override the parts marked w/ `block` on the original template:

<!-- ###### Page based on a template -->

```pug
extends _templates/main-page-tmp

//- we create a new page based on the template, and change the contents of block intro:
block intro
  p keeping the layout, changing the contents!
```

Compiles to:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My web page</title>
  </head>
  <body>
    <main>
      <section>
        <div class="container">
          <header>
            <h1 class="main-title">My web page</h1>
            <p>keeping the layout, changing the contents!</p>
          </header>
        </div>
      </section>
    </main>
  </body>
</html>
```

---

### Append & prepend

Expanding on the prev example:

```pug
block config
  - var pageTitle = 'My web page'
  - var currDate = '08/09/2017'
  - var pageAuthor = 'J. Doe'

doctype
html
  head
    title #{pageTitle}
  body
    main
      section
        div.container
          header
            h1.main-title #{pageTitle}
            h6 last update: #{currDate}, by #{pageAuthor}
            block intro
              p Lorem ipsum dolor sit amet
```

We create a var `block`, called `config`; we'll be able to override these vars in pages built from this template, by using the `append` keyword:

```pug
extends _templates/main-page-tmp

block append config
  - var pageAuthor = 'L. Ipsum'

//- we create a new page based on the template, and change the contents of block intro:
block intro
  p keeping the layout, changing the contents!
```

Compiles to:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My web page</title>
  </head>
  <body>
    <main>
      <section>
        <div class="container">
          <header>
            <h1 class="main-title">My web page</h1>
            <h6>last update: 08/09/2017, by L. Ipsum</h6>
            <p>keeping the layout, changing the contents!</p>
          </header>
        </div>
      </section>
    </main>
  </body>
</html>
```

We can also `prepend` our content to a template's content:

```pug
extends _templates/main-page-tmp

block prepend intro
  p this text comes first!
```

Compiles to:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My web page</title>
  </head>
  <body>
    <main>
      <section>
        <div class="container">
          <header>
            <h1 class="main-title">My web page</h1>
            <h6>last update: 08/09/2017, by J. Doe</h6>
            <p>this text comes first!</p>
            <p>Lorem ipsum dolor sit amet</p>
          </header>
        </div>
      </section>
    </main>
  </body>
</html>
```

The text now comes before the template's predefined text.

---

### Mixins

Mixins are a powerful templating functionality that works much like a JavaScript function: we can define the basic structure of a block of code, and set parameters on its dynamic parts; then, we "call" the element on our page and pass the desired arguments.

Starting from our base page, we add a `block content`:

```pug
block config
  - var pageTitle = 'My web page'
  - var currDate = '08/09/2017'
  - var pageAuthor = 'J. Doe'
  - var fontReset = '* {font-family: Helvetica, Arial }'

doctype
html
  head
    title #{pageTitle}
    style #{fontReset}
  body
    main
      section
        .container
          header
            h1.main-title #{pageTitle}
            h6 last update: #{currDate}, by #{pageAuthor}
            block intro
              p Pug playground!
      section        
        .cointainer
          block content
```

Then we define our `mixin`, and call it in our page; we'll do it by passing in args manually in one instance, and by passing them dynamically via loop in another. We call our mixin with the `+<mixin name>(<args>)` syntax.

```pug
extends _templates/main-page-tmp

block append config
  - var itemTitle = ['Lorem', 'Ipsum', 'Dolor']
  - var fillerText = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Aliquam vitae dui. Nulla id libero nec eros pretium facilisis.', 'Donec nulla ipsum, elementum vitae, cursus vitae, accumsan sed, ligula.']

mixin contentRow(title, desc)
  li.contentRow(style='list-style:none; border: 1px dotted #ccc; padding: 0 20px; margin-bottom: 10px')
   h4 #{title}
   p #{desc}

block content
  ul(style='margin:0; padding:0')
    //- using the mixin in a loop, w/ dynamic content
    each par, ind in fillerText
      +contentRow('Item 0' + (ind + 1), par)

    //- using the mixin by itself
    +contentRow('Item 04', 'Item added manually')
    +contentRow('Item 05', 'Another item added manually')
```

Notice how in `+contentRow('Item 0' + (ind + 1), par)` we performed string concatenation on the 1st arg.

The code compiles to:

```html
<!-- (...) -->
<ul style="margin:0; padding:0;">
  <li class="contentRow" style="list-style:none; border: 1px dotted #ccc; padding: 0 20px; margin-bottom: 10px;">
    <h4>Item 01</h4>
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
  </li>
  <li class="contentRow" style="list-style:none; border: 1px dotted #ccc; padding: 0 20px; margin-bottom: 10px;">
    <h4>Item 02</h4>
    <p>Aliquam vitae dui. Nulla id libero nec eros pretium facilisis.</p>
  </li>
  <li class="contentRow" style="list-style:none; border: 1px dotted #ccc; padding: 0 20px; margin-bottom: 10px;">
    <h4>Item 03</h4>
    <p>Donec nulla ipsum, elementum vitae, cursus vitae, accumsan sed, ligula.</p>
  </li>
  <li class="contentRow" style="list-style:none; border: 1px dotted #ccc; padding: 0 20px; margin-bottom: 10px;">
    <h4>Item 04</h4>
    <p>Item added manually</p>
  </li>
  <li class="contentRow" style="list-style:none; border: 1px dotted #ccc; padding: 0 20px; margin-bottom: 10px;">
    <h4>Item 05</h4>
    <p>Another item added manually</p>
  </li>
</ul>
<!-- (...) -->
```

---

### Includes

We can include portions of code w/ the `include` keyword; here's an example nav component:

```pug
//- --------------------
//- navigation component
//- --------------------

- var navContainerStyle = 'float: right; margin: 0; padding: 0'
- var navListStyle = 'list-style: none; display: inline-block; margin-right: 10px'

mixin nav(name, href, alt)
  //- notice that variables in attributes work only with
  //- <varName>, not #{<varName>}
  //- and no '' or ""
  li(style=navListStyle)
    a(href=href, alt=alt) #{name}

nav
  ul(style=navContainerStyle)
    +nav('home', '#', 'homepage')
    +nav('about', 'about.html', 'about')
    +nav('work', 'work.html', 'work')
    +nav('contacts', 'contacts.html', 'contacts')
```

We can include it in our pages like this:

```pug

//- (...)
body
    include ../_includes/main-nav-tmp
    main
      section
//- (...)
```

And it'll output:

```html
<!-- (...) -->
<nav>
  <ul style="float: right; margin: 0; padding: 0;">
    <li style="list-style: none; display: inline-block; margin-right: 10px;"><a href="#" alt="homepage">home</a></li>
    <li style="list-style: none; display: inline-block; margin-right: 10px;"><a href="about.html" alt="about">about</a></li>
    <li style="list-style: none; display: inline-block; margin-right: 10px;"><a href="work.html" alt="work">work</a></li>
    <li style="list-style: none; display: inline-block; margin-right: 10px;"><a href="contacts.html" alt="contacts">contacts</a></li>
  </ul>
</nav>
<!-- (...) -->
```
