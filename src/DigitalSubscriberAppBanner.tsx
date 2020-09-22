import React, { useState } from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { palette, space } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';
import { body, headline } from '@guardian/src-foundations/typography/cjs';
import { Button, buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { SvgCross, SvgInfo } from '@guardian/src-icons';
import { AppStore } from './assets/app-store';
import { PlayStore } from './assets/play-store';

const imgHeight = '280';
const bannerColor = '#ebe8e8';
const infoColor = '#c4c4c4';
const bodyColor = '#666';

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
    background-color: ${bannerColor};
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
    max-width: 740px;

    ${from.desktop} {
        max-width: 980px;
        flex-direction: row;
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

    ${from.desktop} {
        width: 60%;
    }
`;

export const bottomRightComponent = css`
    display: flex;
    justify-content: center;
    width: 100%;
    max-height: 100%;

    ${from.desktop} {
        align-self: flex-end;
        max-width: 40%;
        padding-right: ${space[4]}px;
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
    ${headline.small({ fontWeight: 'bold' })};
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
    color: ${bodyColor};

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

export const cta = css`
    font-weight: 700;
    margin-top: ${space[5]}px;
    margin-right: ${space[3]}px;
    display: inline-block;
    color: ${palette.neutral[20]};
`;

export const smallRightSpacer = css`
    margin-right: ${space[3]}px;
`;

export const primaryButton = css`
    margin-right: ${space[3]}px;
    background-color: ${palette.neutral[20]};
    color: ${palette.neutral[100]};

    &:hover {
        background-color: #111;
    }
`;

export const secondaryButton = css`
    color: ${palette.neutral[20]};
`;

export const packShot = css`
    max-width: 100%;
    max-height: 260px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: -20px;

    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    ${until.desktop} {
        display: none;
    }

    ${from.wide} {
        margin-right: 100px;
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
    position: absolute;
    top: 15px;
    right: 10px;
`;

export const smallInfoIcon = css`
    left: -60px;
    display: none;

    svg {
        width: 40px;
        height: 40px;
        vertical-align: -30%;
        fill: ${infoColor};
        background: radial-gradient(
            circle at center,
            ${palette.background.primary} 0%,
            ${palette.background.primary} 50%,
            ${palette.background.primary} 52%,
            transparent 53%
        );
    }

    ${until.phablet} {
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
        fill: ${infoColor};
        background: radial-gradient(
            circle at center,
            ${palette.background.primary} 0%,
            ${palette.background.primary} 50%,
            ${palette.background.primary} 52%,
            transparent 53%
        );
        border-radius: 50%;
    }

    @media (min-width: 1430px) {
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
    body,
}: Props) => {
    const [showBanner, setShowBanner] = useState(true);

    const onCloseClick = (
        evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        buttonId: number,
    ): void => {
        evt.preventDefault();
        onButtonClick(buttonId);
        setShowBanner(false);
    };

    if (!showBanner || !header || !body) {
        return null;
    }

    return (
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
                        <br />
                        <strong css={cta}>{'Search for "Guardian live news"'}</strong>
                        <span css={storeIcon}>
                            <AppStore />
                            <PlayStore />
                        </span>
                    </p>
                    <Button onClick={(e) => onCloseClick(e, 0)} css={primaryButton}>
                        Ok, got it
                    </Button>
                    <Button
                        onClick={(e) => onCloseClick(e, 1)}
                        css={secondaryButton}
                        priority="subdued"
                    >
                        {"I'm not interested"}
                    </Button>
                </div>
                <div css={bottomRightComponent}>
                    <div css={packShot}>
                        <img
                            src="https://i.guim.co.uk/img/media/de6813b4dd9b9805a2d14dd6af14ae2b48e2e19e/0_0_930_520/930.png?width=930&quality=60&s=a7d81978655765847246c8d4d0cd0e7f"
                            alt=""
                        />
                    </div>
                    <div css={iconPanel}>
                        <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                            <Button
                                icon={<SvgCross />}
                                hideLabel={true}
                                css={closeButton}
                                priority="tertiary"
                                size="small"
                                aria-label="Close"
                                onClick={(e) => onCloseClick(e, 1)}
                                tabIndex={0}
                            >
                                {' '}
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};
