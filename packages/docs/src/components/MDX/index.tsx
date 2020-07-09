import React, { FC } from "react";
import { Link } from "itsy-bitsy-router";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const h1: FC = ({ children }) => (
  <h1 className="font-bold text-3xl mb-4">{children}</h1>
);

const h2: FC = ({ children }) => (
  <h2 className="font-bold text-2xl my-2">{children}</h2>
);

const a: FC<{ href: string }> = ({ href, children }) => {
  const className = "text-bold text-red-800 underline";
  if (href.startsWith("/")) {
    return (
      <Link className={className} to={href}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
};

const inlineCode: FC = ({ children }) => (
  <code className="font-mono bg-gray-300 rounded px-1">{children}</code>
);

const code: FC = ({ children }) => (
  <Highlight
    {...defaultProps}
    theme={theme}
    code={children as string}
    language="javascript"
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={`p-4 my-2 rounded ${className}`} style={{ ...style }}>
        {tokens
          .filter((_, i) => i < tokens.length - 1)
          .map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
      </pre>
    )}
  </Highlight>
);

const components = { h1, h2, a, inlineCode, code };

export default components;
