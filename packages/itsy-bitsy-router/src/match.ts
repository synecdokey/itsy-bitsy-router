const matcher = (path: string) => {
  const splitPath = path.split("/");
  const regexpStr = splitPath
    .filter((param) => param !== "")
    .map((param) =>
      param.startsWith(":") ? `(?<${param.slice(1)}>[^/]*)` : param
    )
    .join("/");

  return new RegExp(`^/?${regexpStr}/?$`);
};

export default matcher;
