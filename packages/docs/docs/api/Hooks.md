# Hooks

## useRoutes

Creates a `<Router />` with all provided routes, represented as an array of
objects.

```jsx
useRoutes(
  [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/articles", element: <Articles /> },
  ],
  <FourOhFour />
);
```

> ⚠️ Warning: This is the only part that's likely to change before v1 is
> released.

## useParams

Returns an object with key/value pairs associated with matched params.

```js
// On route "/user/:name"
const { name } = useParams();
```

## useNavigate

Returns a [`navigate`](./navigate.md) function that enables programmatical
navigation.

```js
const navigate = useNavigate();
```

## useLocation

Returns the current
[`location`](https://developer.mozilla.org/en-US/docs/Web/API/Location) object
properties.

```js
const { pathname, hash, origin, ...rest } = useLocation();
```

> Note: This is mostly provided for compatibility, you should be able to use
> `window.location` directly.
