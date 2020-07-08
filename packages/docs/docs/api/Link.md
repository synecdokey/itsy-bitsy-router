# `<Link />`

This react component provides you with a declarative way to use client-side
routing, creating an accessible anchor link (`<a>`).

```jsx
<Link to="/home">Home</Link>
```

## Props

### to: string

A string representation of the URL you want to navigate to. Leave it empty to
navigate to the same page.

```jsx
<Link to="/search?sort=date">Home</Link>
```

### state: object

State to add to the
[`history`](https://developer.mozilla.org/en-US/docs/Web/API/Window/history)
object.

```jsx
<Link to="/home" state={{ from: "internalLink" }}>
  Home
</Link>
```

### replace: boolean

When `true`, this will override the current entry in the browser history rather
than creating a new one.

```jsx
<Link to="/home" replace>
  Home
</Link>
```
