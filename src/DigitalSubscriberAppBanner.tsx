import React, { useState } from 'react';
import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { from, until } from '@guardian/src-foundations/mq';
import { body, headline } from '@guardian/src-foundations/typography/cjs';
import { Button } from "@guardian/src-button";
import { SvgCross, SvgInfo } from '@guardian/src-icons';
import { AppStore } from "./assets/app-store";
import { PlayStore } from "./assets/play-store";
import { focusHalo } from "@guardian/src-foundations/accessibility";

const imgHeight = "300";

export type Props = {
  onButtonClick: (buttonIndex: number) => void;
  header?: string;
  body?: string;
};

export const wrapper = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${palette.background.secondary};
  color: ${palette.neutral[20]};

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;

export const contentContainer = css`
    align-items: stretch;
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 980px;

    ${from.tablet} {
        flex-direction: row;
    }

    ${from.desktop} {
        min-height: ${imgHeight}px;
    }

    ${from.leftCol} {
        max-width: 1140px;
    }

    ${from.wide} {
        max-width: 1300px;
    }
`;

export const topLeftComponent = css`
    width: 93%;
    padding: ${space[4]}px;

    ${from.tablet} {
        width: 55%;
        padding-right: 0;
    }

    ${from.desktop} {
        width: 60%;
    }
`;

export const bottomRightComponent = css`
    display: flex;
    justify-content: center;
    width: 100%;
    max-height: 100%;

    ${from.tablet} {
        align-self: flex-end;
        max-width: 40%;
        padding-right: ${space[4]}px;
    }

    ${from.desktop} {
        max-width: 42%;
        justify-content: flex-end;
    }

    ${from.leftCol} {
        padding-right: 0;
        justify-content: space-between;
    }

    ${from.wide} {
        max-width: 45%;
    }
`;

export const heading = css`
    ${headline.xsmall({ fontWeight: 'bold' })};
    margin: 0;
    max-width: 100%;

    ${from.mobileLandscape} {
        ${headline.small({ fontWeight: 'bold' })};
    }

    ${from.tablet} {
        max-width: 100%;
    }
`;

export const paragraph = css`
    ${body.medium()}
    line-height: 135%;
    margin: ${space[5]}px 0 ${space[5]}px;
    max-width: 100%;

    ${from.phablet} {
        max-width: 90%;
    }

    ${from.tablet} {
        max-width: 100%;
    }

    ${from.desktop} {
        font-size: 20px;
        margin: ${space[3]}px 0 ${space[4]}px;
        max-width: 42rem;
    }

    ${from.leftCol} {
        max-width: 37rem;
    }

    ${from.wide} {
        max-width: 42rem;
    }
`;

export const strongSmallSpacer = css`
    font-weight: 700;
    margin-top: ${space[5]}px;
    margin-right: ${space[3]}px;
    display: inline-block;
`

export const smallRightSpacer = css`
    margin-right: ${space[3]}px;
`

export const primaryButton = css `
    margin-right: ${space[3]}px;
    background-color: ${palette.neutral[20]};
    color: ${palette.neutral[100]};

    &:hover {
        background-color: #111;
    }
`

export const secondaryButton = css `
    color: ${palette.neutral[20]};
`

export const packShot = css`
    max-width: 100%;
    max-height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: -20px;

    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    ${until.tablet} {
        display: none;
    }
`;

export const iconPanel = css`
    ${from.desktop} {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        height: 100%;
        padding: ${space[4]}px 0;
        margin-left: ${space[4]}px;
    }
`;


export const closeButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid ${palette.text.primary};
    border-radius: 50%;
    outline: none;
    background: transparent;
    cursor: pointer;
    width: 35px;
    height: 35px;    
    position: absolute;
    top: 10px;
    right: 10px;

    svg {
        width: 25px;
        height: 25px;
        fill: ${palette.text.primary};
        transition: background-color 0.5s ease;
        border-radius: 50%;
    }

    :hover {
        cursor: pointer;
        background-color: rgba(237, 237, 237, 0.5);
    }

    transition: box-shadow 0.3s;
    :focus {
        ${focusHalo};
    }  
`;

export const smallInfoIcon = css`
    left: -60px;
    display: none;

    svg {
        width: 40px;
        height: 40px;
        vertical-align: -30%;
        fill: ${palette.neutral[86]};
    }

    ${until.tablet}{
        display: block;
        margin-left: -4px;
        margin-top: -4px;
        margin-bottom: 4px;
    }
`;

export const infoIcon = css`
    position: absolute;
    width: 60px;
    height: 60px;
    left: -60px;
    top: 10px;
    display: none;

    svg {
        width: 60px;
        height: 60px;
        fill: ${palette.neutral[86]};
    }

    @media (min-width: 1430px){
        display: block;
    }
`;

export const storeIcon = css`
    height: 10px;
    display: inline-block;
    vertical-align: -37.5%;

    svg {
        height: 30px;
        width: auto;
        margin-top: ${space[2]}px;
        padding-right: ${space[2]}px;
    }
`;

export const DigitalSubscriberAppBanner: React.FC<Props> = ({
  onButtonClick,
  header,
  body
}: Props) => {
    const [showBanner, setShowBanner] = useState(true);

    const onCloseClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, buttonId: number): void => {
        evt.preventDefault();
        onButtonClick(buttonId);
        setShowBanner(false);
    };
    
    if (!showBanner || !header || !body ) return null;
    else return (
        <div css={wrapper}>
            <div css={contentContainer}>
                <div css={topLeftComponent}>
                    <div css={infoIcon}>
                        <SvgInfo />
                    </div>
                    <div css={heading}>
                        <span css={smallInfoIcon}>
                            <SvgInfo />
                        </span>
                        {header}
                    </div>
                    <p css={paragraph}>
                        {body}
                        <br/>
                        <strong css={strongSmallSpacer}>
                            Search for "Guardian live news"
                        </strong>
                        <span css={storeIcon}>
                            <AppStore />
                            <PlayStore />
                        </span>
                    </p>
                    <Button onClick={e => onCloseClick(e, 0)} css={primaryButton}>Ok, got it</Button>
                    <Button onClick={e => onCloseClick(e, 1)} css={secondaryButton} priority="subdued">I'm not interested</Button>
                </div>
                <div css={bottomRightComponent}>
                    <div css={packShot}>
                        <img
                            src="https://via.placeholder.com/400x300"
                            alt=""
                        />
                    </div>
                    <div css={iconPanel}>
                        <button
                            aria-label="Close"
                            onClick={e => onCloseClick(e, 1)}
                            css={closeButton}
                        >
                            <SvgCross />
                        </button>
                    </div>
                </div>
            </div>
        </div> 
    );
}
