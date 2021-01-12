import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Button, buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { SvgCross, SvgInfo } from '@guardian/src-icons';
import { OphanComponentEvent } from '@guardian/types';

import { AppStore } from '../assets/app-store';
import { PlayStore } from '../assets/play-store';
import { BrazeClickHandler } from '../utils/tracking';
import { styles as commonStyles } from '../styles/bannerCommon';
import { styles } from './styles';
import { isImageUrlAllowed } from '../utils/images';

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    ophanComponentId?: string;
    brazeMessageProps: {
        header?: string;
        body?: string;
        cta?: string;
        imageUrl?: string;
    };
};

const catchAndLogErrors = (description: string, fn: () => void): void => {
    try {
        fn();
    } catch (e) {
        console.log(`Error (${description}): `, e.message);
    }
};

export const COMPONENT_NAME = 'AppBanner';

export const AppBanner: React.FC<Props> = ({
    logButtonClickWithBraze,
    submitComponentEvent,
    ophanComponentId = COMPONENT_NAME,
    brazeMessageProps: { header, body, cta, imageUrl },
}: Props) => {
    const [showBanner, setShowBanner] = useState(true);

    const onCloseClick = (
        evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        internalButtonId: number,
    ): void => {
        evt.preventDefault();

        setShowBanner(false);

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

    if (!showBanner || !header || !body || !cta || !imageUrl) {
        return null;
    }

    if (!isImageUrlAllowed(imageUrl)) {
        console.log(`Image URL ${imageUrl} is not allowed`);
        return null;
    }

    return (
        <div css={commonStyles.wrapper}>
            <div css={commonStyles.contentContainer}>
                <div css={commonStyles.topLeftComponent}>
                    <div css={commonStyles.infoIcon}>
                        <SvgInfo />
                    </div>
                    <div css={commonStyles.heading}>
                        <span css={commonStyles.smallInfoIcon}>
                            <SvgInfo />
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
                    <Button onClick={(e) => onCloseClick(e, 0)} css={commonStyles.primaryButton}>
                        Ok, got it
                    </Button>
                    <Button
                        onClick={(e) => onCloseClick(e, 0)}
                        css={styles.secondaryButton}
                        priority="subdued"
                    >
                        {"I'm not interested"}
                    </Button>
                </div>
                <div css={commonStyles.bottomRightComponent}>
                    <div css={styles.image}>
                        <img src={imageUrl} alt="" />
                    </div>
                    <div css={commonStyles.iconPanel}>
                        <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
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
