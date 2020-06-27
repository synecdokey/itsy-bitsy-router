import React, { FC } from "react";
import { useNavigate } from "./index";
import { useLocation } from "./Location";

type LinkProps = (
  | {
      to: string;
      state?: object;
    }
  | { to?: string; state: object }
) & { replace?: boolean } & React.HTMLProps<HTMLAnchorElement>;

export const Link: FC<LinkProps> = ({
  to,
  onClick,
  state,
  replace,
  children,
  ...props
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onClickCopy: React.MouseEventHandler<HTMLAnchorElement> = (ev) => {
    ev.preventDefault();
    if (onClick) onClick(ev);
    navigate(to, { state, replace });
  };

  return (
    <a onClick={onClickCopy} href={to || pathname} {...props}>
      {children}
    </a>
  );
};
