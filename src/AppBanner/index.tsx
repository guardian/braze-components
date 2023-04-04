import React, { useState, ReactElement } from 'react';
import { css } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';
import {
    Button,
    buttonThemeReaderRevenueBrandAlt,
    SvgCross,
    SvgInfoRound,
} from '@guardian/source-react-components';
import { OphanComponentEvent } from '@guardian/libs';

import { AppStore } from '../assets/app-store';
import { PlayStore } from '../assets/play-store';
import { BrazeClickHandler } from '../utils/tracking';
import { useEscapeShortcut } from '../utils/useEscapeShortcut';
import { styles as commonStyles } from '../styles/bannerCommon';
import { styles } from './styles';

import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    header?: string;
    body?: string;
    cta?: string;
    imageUrl?: string;
};

import type { ButtonTheme } from '@guardian/source-react-components';

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    ophanComponentId?: string;
    brazeMessageProps: BrazeMessageProps;
};

const catchAndLogErrors = (description: string, fn: () => void): void => {
    try {
        fn();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(`Error (${description}): `, e.message);
        }
    }
};

export const AppBanner = (props: Props): ReactElement | null => {
    const {
        logButtonClickWithBraze,
        submitComponentEvent,
        ophanComponentId = COMPONENT_NAME,
        brazeMessageProps: { header, body, cta, imageUrl },
    } = props;

    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    const [showBanner, setShowBanner] = useState(true);

    const onCloseClick = (
        evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        internalButtonId: number,
    ): void => {
        evt.preventDefault();

        onCloseAction(internalButtonId);
    };

    const onCloseAction = (internalButtonId: number): void => {
        setShowBanner(false);
        document.body.focus();

        catchAndLogErrors('ophanButtonClick', () => {
            // Braze displays button id from 1, but internal representation is numbered from 0
            // This ensures that the Button ID in Braze and Ophan will be the same
            const externalButtonId = internalButtonId + 1;
            submitComponentEvent({
                component: {
                    componentType: 'RETENTION_ENGAGEMENT_BANNER',
                    id: ophanComponentId,
                },
                action: 'CLICK',
                value: externalButtonId.toString(10),
            });
        });

        catchAndLogErrors('brazeButtonClick', () => {
            logButtonClickWithBraze(internalButtonId);
        });
    };

    useEscapeShortcut(() => onCloseAction(1), []);

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
                    <div css={commonStyles.infoIcon}>
                        <SvgInfoRound />
                    </div>
                    <div css={commonStyles.heading}>
                        <span css={commonStyles.smallInfoIcon}>
                            <SvgInfoRound />
                        </span>
                        {header}
                    </div>
                    <p css={commonStyles.paragraph}>
                        {body}
                        <br />
                        <strong css={commonStyles.cta}>{cta}</strong>
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
