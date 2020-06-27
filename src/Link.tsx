import React, { FC } from "react";
import { useNavigate } from "./index";

type LinkProps = {
  to: string;
  state: object | undefined;
} & React.HTMLProps<HTMLAnchorElement>;

export const Link: FC<LinkProps> = ({ to, state, children, ...props }) => {
  const navigate = useNavigate();
  const onClick: React.MouseEventHandler = (ev) => {
    ev.preventDefault();
    navigate(to, state);
  };

  return (
    <a onClick={onClick} href={to} {...props}>
      {children}
    </a>
  );
};
