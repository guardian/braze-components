import React, { useState, ReactElement } from 'react';
import { css } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';
import { Button, buttonThemeReaderRevenueBrandAlt } from '@guardian/source-react-components';
import { space, from, until } from '@guardian/source-foundations';
import type { TrackClick } from '../utils/tracking';

import { AppStore } from '../assets/app-store';
import { PlayStore } from '../assets/play-store';
import { BannerColorStyles, CloseButtonColorStyles } from '../styles/colorData';
import { selfServeStyles } from '../styles/bannerCommon';
import { BannerCloseButton, OnCloseClick } from '../components/BannerCloseButton';

import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    ophanComponentId?: string;
    header?: string;
    body?: string;
    cta?: string;
    imageUrl?: string;
};

import type { ButtonTheme } from '@guardian/source-react-components';

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
};

export const AppBanner = (props: Props): ReactElement | null => {
    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    const {
        brazeMessageProps: { ophanComponentId = COMPONENT_NAME, header, body, cta, imageUrl },
        trackClick,
    } = props;

    const styles = selfServeStyles(props.brazeMessageProps, defaultColors);

    const [showBanner, setShowBanner] = useState(true);

    // This is to keep button colors the same as before
    // https://github.com/guardian/braze-components/pull/123
    // Probably should be removed later
    const overrridenReaderRevenueTheme: { button: ButtonTheme } = {
        button: {
            ...buttonThemeReaderRevenueBrandAlt.button,
            backgroundPrimary: 'rgb(51, 51, 51)',
            backgroundPrimaryHover: 'black',
        },
    };
    const notInterestedTheme: { button: ButtonTheme } = {
        button: {
            ...buttonThemeReaderRevenueBrandAlt.button,
            textSubdued: 'rgb(51, 51, 51)',
        },
    };

    if (!showBanner) {
        return null;
    }

    const onCloseClick: OnCloseClick = (evt, internalButtonId) => {
        evt.preventDefault();
        onCloseAction(internalButtonId);
    };

    const onCloseAction = (internalButtonId: number): void => {
        setShowBanner(false);
        document.body.focus();
        trackClick({
            internalButtonId,
            ophanComponentId: ophanComponentId as string,
        });
    };

    return (
        <div css={styles.wrapper}>
            <div css={styles.contentContainer}>
                <div css={styles.topLeftComponent}>
                    <div css={styles.heading}>{header}</div>
                    <p css={styles.paragraph}>{body}</p>

                    <p css={styles.highlightContainer}>
                        <strong css={styles.highlight}>{cta} &nbsp;</strong>
                        <span css={localStyles.storeIcon}>
                            <AppStore />
                            <PlayStore />
                        </span>
                    </p>

                    <ThemeProvider theme={overrridenReaderRevenueTheme}>
                        <Button onClick={(e) => onCloseClick(e, 0)} css={styles.primaryButton}>
                            {'Ok, got it'}
                        </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={notInterestedTheme}>
                        <Button
                            onClick={(e) => onCloseClick(e, 0)}
                            priority="subdued"
                            cssOverrides={css`
                                text-decoration: none;
                                text-underline-offset: inherit;

                                &:hover {
                                    text-decoration: underline;
                                }
                            `}
                        >
                            {"I'm not interested"}
                        </Button>
                    </ThemeProvider>
                </div>
                <div css={styles.bottomRightComponent}>
                    <div css={localStyles.image}>
                        <img src={imageUrl} alt="" />
                    </div>
                    <BannerCloseButton
                        trackClick={trackClick}
                        setShowBanner={setShowBanner}
                        ophanComponentId={ophanComponentId}
                        colors={closeButtonColors}
                    />
                </div>
            </div>
        </div>
    );
};

const defaultColors: BannerColorStyles = {
    styleBackground: '#ebe8e8',
    styleHeader: `#333333`,
    styleBody: '#666',
    styleHighlight: `#333333`,
    styleHighlightBackground: '#ebe8e8',
    styleButton: '#ffffff',
    styleButtonBackground: '#052962',
    styleButtonHover: '#234b8a',
};

const closeButtonColors: CloseButtonColorStyles = {
    styleClose: `#333333`,
    styleCloseBackground: '#ebe8e8',
    styleCloseHover: '#e5e5e5',
};

const localStyles = {
    image: css`
        max-width: 100%;
        max-height: 260px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-top: -20px;

        img {
            max-width: 100%;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        ${until.desktop} {
            display: none;
        }

        ${from.wide} {
            margin-right: 100px;
        }
    `,

    storeIcon: css`
        height: 10px;
        display: inline-block;
        vertical-align: -37.5%;

        svg {
            height: 30px;
            width: auto;
            max-width: 110px;
            margin-top: ${space[2]}px;
            padding-right: ${space[2]}px;
        }
    `,
};
