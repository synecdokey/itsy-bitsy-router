# Itsy bitsy router

Itsy bitsy router is a very opiniated solution for routing in react
applications. It is not compatible with IE and never will be.

## Install

You know the drill.

```shell
yarn add itsy-bitsy-router
```

## Usage

You will need to declare a router before anything else with `useRoutes()`.

```js
const Router = useRoutes(
  [
    { path: "/login", element: <Login /> },
    { path: "/user/:id", element: <User /> },
  ],
  <FourOhFour />
);

return <Router />;
```

You can optionally pass a `render` prop to the router. It is used when your app
wants a default layout component, giving the route children as the `children`
prop.

### Navigation

To navigate inside your app using anchor links, there is still the need for a
`<Link>` component,

```js
return (
  <Link to="/user/synecdokey" state={{ from: "page1" }}>
    My profile
  </Link>
);
```

Since the browser history API provides no way to listen to `history.pushState()`
nor `history.replaceState()` at the moment, you will need `useNavigate()` to
handle navigation.

```jsx
const Button = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/this-url")}>Click me</button>;
};
```

To navigate programatically, you can use `history.back()` and
`history.forward()`. They will work as expected, without the need for some
`useHistory()` shenanigans.

### Access data

`useParams()` is used for the parameters you provided in the url.

```js
const { id } = useParams();
```

To access the route state, it's all in `history.state`.

A `useLocation()` hook is provided, it will give you every property of the
`window.location` object.

```js
const { pathname, search } = useLocation();
```
