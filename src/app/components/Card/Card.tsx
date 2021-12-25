import { FC } from "react";

export interface ICard {
  [props: string]: unknown;
}

const Card: FC<ICard> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default Card;
