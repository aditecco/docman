---
title: TypeScript CookBook
type: docs
date: 2020-11-29T00:56:11.979Z
path: /cookbooks/typescript
TOC: true
---
#### Properly type React Children

In your functional component, use `React.FC<Props>` as function type and `children` will be implicitly accounted for in your `Props`, without needing to explicitly type them.

```tsx
import React, { ReactElement } from 'react';

interface OwnProps {
  title: string
}

const Example: React.FC<OwnProps> = (props): ReactElement => {
  return (
    <div>
      <header>{props.title}</header>

      <main>
        {props.children}
      </main>
    </div>
  );
}

export default Example;
```

---

#### Type a function in props

```typescript
interface OwnProps {
  // shorthand
  clickHandler(e: React.MouseEvent): void;
  
  // longhand
  changeHandler: (e: React.ChangeEvent) => void
}
```

Notice the shorthand notation.

---

#### Type an event handler's `event` param

```tsx
interface OwnProps {
  clickHandler(e: React.MouseEvent): void;
}

const example: React.FC<OwnProps> = ({ clickHandler }): ReactElement => {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    clickHandler?.(e);
  }

  return <button onClick={handleClick}>Click</button>;
};

export default example;
```

Don't use regular DOM events, but events under the `React` namespace, such as `React.MouseEvent`. Also provide an argument to the generic, specifying the type of  element the handler is attached to.

---

#### Type a `ref`

```tsx
const example: React.FC<OwnProps> = (): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);

  return <div ref={ref} />;
};
```

Provide the type of the target element to the ref.

---

#### Type a library which doesn't come with its own types

In a type definition file (filename must follow the convention `file.d.ts`), write:

```typescript
declare module 'lib-name';
```

This way TS will register the lib in the type system and (hopefully) turn off any errors.

---

#### Type a class component

```tsx

interface props {}

export default class Example extends Component<Props> { // ... }
```

---

#### Null types

Null types are automatically accounted for by TS in our type declarations (unless the `strictNullChecks` config option is active); `null` and `undefined` are assignable to every type.

```typescript
// TS sees: x: string | null | undefined
var x: string = 'x';
// no TS errors
x = null;
x = undefined;

```

---

#### Create a class based on an interface

```typescript
interface Xyz {
  x: string;
}

class Example implements Xyz {
  x: string

  // ...
}
```

---

