import React from "react";

type Props = {
  children?: React.ReactNode;
};

const Component: React.FunctionComponent<Props> = ({
  children = "Loading…",
}) => <p>{children}</p>;

export default Component;
