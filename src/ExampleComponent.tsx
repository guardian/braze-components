import React from "react";
import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { Button } from "@guardian/src-button";

type Props = {};

const wrapperStyles = css`
  background-color: ${palette.neutral[97]};
`;

export const ExampleComponent: React.FC<Props> = () => (
  <div css={wrapperStyles}>
    <span>Hello from a Braze Banner!</span>
    <Button>Click me!</Button>
  </div>
);
