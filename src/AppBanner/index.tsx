import React, { useState, ReactElement } from 'react';
import { css } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';
import {
    Button,
    buttonThemeReaderRevenueBrandAlt,
    SvgCross,
} from '@guardian/source-react-components';
import type { TrackClick } from '../utils/tracking';

import { AppStore } from '../assets/app-store';
import { PlayStore } from '../assets/play-store';
import { StyleData, selfServeStyles } from '../styles/bannerCommon';
import { useEscapeShortcut, OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';
import { styles } from './styles';

import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

const defaultColors: StyleData = {
    styleBackground: '#ebe8e8',
    styleHeader: `#333333`,
    styleBody: '#666',
    styleHighlight: `#333333`,
    styleHighlightBackground: '#ebe8e8',
    styleButton: '#ffffff',
    styleButtonBackground: '#052962',
    styleButtonHover: '#234b8a',
    styleClose: `#333333`,
    styleCloseBackground: '#ebe8e8',
    styleCloseHover: '#ffd213',
};

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

    const commonStyles = selfServeStyles(props.brazeMessageProps, defaultColors);

    const [showBanner, setShowBanner] = useState(true);

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

    useEscapeShortcut(() => onCloseAction(CLOSE_BUTTON_ID));

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

    return (
        <div css={commonStyles.wrapper}>
            <div css={commonStyles.contentContainer}>
                <div css={commonStyles.topLeftComponent}>
                    <div css={commonStyles.heading}>{header}</div>
                    <p css={commonStyles.paragraph}>
                        {body}
                        <br />
                        <strong css={commonStyles.highlight}>{cta}</strong>
                        <span css={styles.storeIcon}>
                            <AppStore />
                            <PlayStore />
                        </span>
                    </p>
                    <ThemeProvider theme={overrridenReaderRevenueTheme}>
                        <Button
                            onClick={(e) => onCloseClick(e, 0)}
                            css={commonStyles.primaryButton}
                        >
                            Ok, got it
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
                <div css={commonStyles.bottomRightComponent}>
                    <div css={styles.image}>
                        <img src={imageUrl} alt="" />
                    </div>
                    <div css={commonStyles.iconPanel}>
                        <ThemeProvider theme={overrridenReaderRevenueTheme}>
                            <Button
                                icon={<SvgCross />}
                                hideLabel={true}
                                css={commonStyles.closeButton}
                                priority="tertiary"
                                size="small"
                                aria-label="Close"
                                onClick={(e) => onCloseClick(e, CLOSE_BUTTON_ID)}
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
