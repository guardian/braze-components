import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import {
    Button,
    LinkButton,
    SvgCross,
    SvgInfo,
    buttonThemeReaderRevenueBrandAlt,
} from '@guardian/source-react-components';
import { OphanComponentEvent } from '@guardian/libs';

import { BrazeClickHandler } from '../utils/tracking';
import { styles as commonStyles } from '../styles/bannerCommon';
import { overridenReaderRevenueTheme, styles } from './styles';
import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    ophanComponentId?: string;
    header?: string;
    body?: string;
    boldText?: string;
    buttonText?: string;
    buttonUrl?: string;
    imageUrl?: string;
};

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    ophanComponentId?: string;
    brazeMessageProps: BrazeMessageProps;
};

const catchAndLogErrors = (description: string, fn: () => void): void => {
    try {
        fn();
    } catch (e) {
        console.log(`Error (${description}): `, e.message);
    }
};

const BannerWithLink: React.FC<Props> = (props: Props) => {
    const {
        logButtonClickWithBraze,
        submitComponentEvent,
        brazeMessageProps: {
            header,
            body,
            boldText,
            buttonText,
            buttonUrl,
            imageUrl,
            ophanComponentId,
        },
    } = props;

    const [showBanner, setShowBanner] = useState(true);

    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    if (!showBanner) {
        return null;
    }

    const logToBrazeAndOphan = (internalButtonId: number): void => {
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
    const onClick = logToBrazeAndOphan;

    const onCloseClick = (
        evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        internalButtonId: number,
    ): void => {
        evt.preventDefault();

        setShowBanner(false);

        logToBrazeAndOphan(internalButtonId);
    };

    return (
        <div css={[commonStyles.wrapper, styles.wrapper]}>
            <div css={commonStyles.contentContainer}>
                <div css={commonStyles.topLeftComponent}>
                    <div css={[commonStyles.infoIcon, styles.infoIcon]}>
                        <SvgInfo />
                    </div>
                    <div css={[commonStyles.heading, styles.heading]}>
                        <span css={[commonStyles.smallInfoIcon, styles.infoIcon]}>
                            <SvgInfo />
                        </span>
                        {header}
                    </div>
                    <p css={[commonStyles.paragraph, styles.paragraph]}>
                        {body}

                        {boldText ? (
                            <>
                                <br />
                                <strong css={[commonStyles.cta, styles.cta]}>{boldText}</strong>
                            </>
                        ) : null}
                    </p>
                    <ThemeProvider theme={overridenReaderRevenueTheme}>
                        <LinkButton
                            href={buttonUrl}
                            css={commonStyles.primaryButton}
                            onClick={() => onClick(0)}
                        >
                            {buttonText}
                        </LinkButton>
                    </ThemeProvider>
                </div>
                <div css={commonStyles.bottomRightComponent}>
                    <div css={styles.image}>
                        <img src={imageUrl} alt="" />
                    </div>
                    <div css={commonStyles.iconPanel}>
                        <ThemeProvider theme={buttonThemeReaderRevenueBrandAlt}>
                            <Button
                                icon={<SvgCross />}
                                hideLabel={true}
                                cssOverrides={[commonStyles.closeButton, styles.closeButton]}
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

export { BannerWithLink };
