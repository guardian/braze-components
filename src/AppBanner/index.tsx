import React, { useState, ReactElement } from 'react';
import { css, ThemeProvider } from '@emotion/react';
import {
    Button,
    ButtonTheme,
    buttonThemeReaderRevenueBrandAlt,
} from '@guardian/source-react-components';

import { AppStore } from '../assets/app-store';
import { PlayStore } from '../assets/play-store';

import { getBannerWithLinkStyles, defaultBannerWithLinkColors } from '../StyleableBannerWithLink';
import { BannerCloseButton, defaultBannerCloseButtonColors } from '../components/BannerCloseButton';

import { useEscapeShortcut, OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';
import { styles as localStyles } from './styles';

import type { TrackClick } from '../utils/tracking';

import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    ophanComponentId?: string;
    header?: string;
    body?: string;
    cta?: string;
    imageUrl?: string;
};

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

    const commonStyles = getBannerWithLinkStyles(
        props.brazeMessageProps,
        defaultBannerWithLinkColors,
    );

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
                    <p css={commonStyles.paragraph}>{body}</p>

                    <p css={commonStyles.highlightContainer}>
                        <strong css={commonStyles.highlight}>{cta} &nbsp;</strong>
                        <span css={localStyles.storeIcon}>
                            <AppStore />
                            <PlayStore />
                        </span>
                    </p>
                    <ThemeProvider theme={overrridenReaderRevenueTheme}>
                        <Button onClick={(e) => onCloseClick(e, 0)} css={localStyles.primaryButton}>
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
                <div css={commonStyles.bottomRightComponent}>
                    <div css={localStyles.image}>
                        <img src={imageUrl} alt="" />
                    </div>
                    <BannerCloseButton
                        trackClick={trackClick}
                        setShowBanner={setShowBanner}
                        ophanComponentId={ophanComponentId}
                        colors={defaultBannerCloseButtonColors}
                    />
                </div>
            </div>
        </div>
    );
};
