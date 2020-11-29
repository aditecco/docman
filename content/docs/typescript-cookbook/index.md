---
title: TypeScript CookBook
type: docs
date: 2020-11-29T00:56:11.979Z
path: /docs/
TOC: true
---
#### Properly type React Children

In your functional component, use `React.FC<Props>` as function type and `children` will be implicitly accounted for in your `Props`, without needing to explicitly type them.

```typescript-react
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

```typescript-react
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

```typescript-react
const example: React.FC<OwnProps> = (): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);

  return <div ref={ref} />;
};
```

Provide the type of the target element to the ref.

---

