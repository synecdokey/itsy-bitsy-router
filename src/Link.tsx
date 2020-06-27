import React, { FC } from "react";
import { useNavigate } from "./index";

type LinkProps = {
  to: string;
  state: object | undefined;
} & React.HTMLProps<HTMLAnchorElement>;

export const Link: FC<LinkProps> = ({
  to,
  onClick,
  state,
  children,
  ...props
}) => {
  const navigate = useNavigate();
  const onClickCopy: React.MouseEventHandler<HTMLAnchorElement> = (ev) => {
    ev.preventDefault();
    if (onClick) onClick(ev);
    navigate(to, state);
  };

  return (
    <a onClick={onClickCopy} href={to} {...props}>
      {children}
    </a>
  );
};
