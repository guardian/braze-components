import React, { useState } from 'react';
import { Button, SvgCross } from '@guardian/source-react-components';
import { useEscapeShortcut, OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';
import { canRender, COMPONENT_NAME } from './canRender';

import { PrimaryCtaButton, defaultPrimaryCtaButtonColors } from '../components/PrimaryCtaButton';
import { ReminderCtaButton, defaultReminderCtaButtonColors } from '../components/ReminderCtaButton';
import { selfServeStyles } from '../styles/bannerCommon';
import { getColors } from '../styles/colorData';

import type { Extras } from '../logic/types';
import type { ReminderStage } from '../logic/reminders';
import type { TrackClick } from '../utils/tracking';
import type { FetchEmail } from '../types/dcrTypes';
import type { StyleableBannerWithLinkColorStyles, BannerWithLinkCopyColorStyles } from '../styles/colorData';

export { COMPONENT_NAME };

export const defaultBannerWithLinkColors: BannerWithLinkCopyColorStyles = {
    styleBackground: '#ededed',
    styleHeader: '#333333',
    styleBody: '#333333',
    styleHighlight: '#333333',
    styleHighlightBackground: '#ededed',
    styleClose: '#052962',
    styleCloseBackground: '#ededed',
    styleCloseHover: '#e5e5e5',
};

export type BrazeMessageProps = Extras & StyleableBannerWithLinkColorStyles & {
    ophanComponentId?: string;
    header?: string;
    body?: string;
    highlight?: string;
    buttonText?: string;
    buttonUrl?: string;
    showPaymentIcons?: string;
    reminderStage?: ReminderStage;
    reminderOption?: string;
    includeReminderCta?: string;
    imageUrl?: string;
    imageAltText?: string;
    imagePosition?: string;
    showPrivacyText?: string;
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
    fetchEmail: FetchEmail;
};

const StyleableBannerWithLink: React.FC<Props> = (props: Props) => {
    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    const {
        brazeMessageProps: {
            ophanComponentId,
            header,
            body,
            highlight,
            buttonText,
            buttonUrl,
            showPaymentIcons = 'false',
            reminderStage,
            reminderOption,
            imageUrl,
            imageAltText = '',
            imagePosition = 'center',
            showPrivacyText = '',
        },
        trackClick,
        fetchEmail,
    } = props;

    const brazeProps = props.brazeMessageProps;

    const primaryCtaStyles = getColors(brazeProps, defaultPrimaryCtaButtonColors);
    const reminderCtaStyles = getColors(brazeProps, defaultReminderCtaButtonColors);

    const styles = selfServeStyles(brazeProps, {
        ...defaultBannerWithLinkColors,
        ...defaultPrimaryCtaButtonColors,
    });

    const showPrivacyTextBoolean = showPrivacyText === 'true';

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

    if (!showBanner) {
        return null;
    }

    return (
        <div css={styles.wrapper}>
            <div css={styles.contentContainer}>
                <div css={styles.topLeftComponent}>
                    <div css={styles.heading}>{header}</div>
                    <p css={styles.paragraph}>{body}</p>

                    {highlight ? (
                        <p css={styles.highlightContainer}>
                            <strong css={styles.highlight}>{highlight}</strong>
                        </p>
                    ) : null}

                    <div css={styles.primaryButtonWrapper}>
                        <PrimaryCtaButton
                            buttonText={buttonText as string}
                            buttonUrl={buttonUrl as string}
                            showPaymentIcons={showPaymentIcons === 'true'}
                            ophanComponentId={ophanComponentId as string}
                            colors={primaryCtaStyles}
                            trackClick={trackClick}
                        />
                        {reminderStage && (
                            <ReminderCtaButton
                                reminderComponent="BANNER"
                                reminderStage={reminderStage}
                                reminderOption={reminderOption}
                                ophanComponentId={ophanComponentId as string}
                                trackClick={trackClick}
                                fetchEmail={fetchEmail}
                                colors={reminderCtaStyles}
                                showPrivacyText={showPrivacyTextBoolean}
                            />
                        )}
                    </div>
                </div>
                <div
                    css={
                        imagePosition === 'bottom'
                            ? styles.bottomRightComponent
                            : styles.centeredBottomRightComponent
                    }
                >
                    <div css={imagePosition === 'bottom' ? styles.image : styles.centeredImage}>
                        <img src={imageUrl} alt={imageAltText} />
                    </div>
                    <div css={styles.iconPanel}>
                        <Button
                            icon={<SvgCross />}
                            hideLabel={true}
                            cssOverrides={styles.closeButton}
                            priority="tertiary"
                            size="small"
                            aria-label="Close"
                            onClick={(e) => onCloseClick(e, CLOSE_BUTTON_ID)}
                            tabIndex={0}
                        >
                            {' '}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { StyleableBannerWithLink };
