import React from "react";
import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { Button } from "@guardian/src-button";

export type Props = {
  message: string;
  onButtonClick: () => void;
};

export const wrapperStyles = css`
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${palette.brand[500]};
  color: ${palette.text.ctaPrimary};
  padding: 50px 0;
`;

export const ExampleComponent: React.FC<Props> = ({
  message,
  onButtonClick,
}: Props) => (
  <div css={wrapperStyles}>
    <div>Hello from a Braze Banner Yay!</div>
    <div>
      <Button onClick={onButtonClick}>Message: {message}</Button>
    </div>
  </div>
);
