import React, { useState } from 'react';
import { PrimaryCtaButton, defaultPrimaryCtaButtonColors } from '../components/PrimaryCtaButton';
import { ReminderCtaButton, defaultReminderCtaButtonColors } from '../components/ReminderCtaButton';
import { BannerCloseButton, defaultBannerCloseButtonColors } from '../components/BannerCloseButton';
import { ReminderStage } from '../logic/reminders';
import type { TrackClick } from '../utils/tracking';
import { FetchEmail } from '../types/dcrTypes';
import { StyleableBannerColorStyles } from '../styles/colorData';
import { selfServeStyles } from '../styles/bannerCommon';
import { canRender, COMPONENT_NAME } from './canRender';
import { getColors } from '../styles/colorData';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
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
    styleBackground?: string;
    styleHeader?: string;
    styleBody?: string;
    styleHighlight?: string;
    styleHighlightBackground?: string;
    styleButton?: string;
    styleButtonBackground?: string;
    styleButtonHover?: string;
    styleReminderButton?: string;
    styleReminderButtonBackground?: string;
    styleReminderButtonHover?: string;
    styleReminderAnimation?: string;
    styleClose?: string;
    styleCloseBackground?: string;
    styleCloseHover?: string;
    showPrivacyText?: string;
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
    fetchEmail: FetchEmail;
};

export const StyleableBannerWithLink: React.FC<Props> = (props: Props) => {
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

    const styles = selfServeStyles(brazeProps, defaultColors);

    const showPrivacyTextBoolean = showPrivacyText === 'true';

    const primaryCtaColors = getColors(brazeProps, defaultPrimaryCtaButtonColors);
    const reminderCtaColors = getColors(brazeProps, defaultReminderCtaButtonColors);
    const closeButtonColors = getColors(brazeProps, defaultBannerCloseButtonColors);

    const [showBanner, setShowBanner] = useState(true);

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
                            colors={primaryCtaColors}
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
                                colors={reminderCtaColors}
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

const defaultColors: StyleableBannerColorStyles = {
    styleBackground: '#ededed',
    styleHeader: '#333333',
    styleBody: '#333333',
    styleHighlight: '#333333',
    styleHighlightBackground: '#ededed',
    styleButton: '#ffffff',
    styleButtonBackground: '#052962',
    styleButtonHover: '#234b8a',
    styleReminderButton: '#121212',
    styleReminderButtonBackground: '#ededed',
    styleReminderButtonHover: '#dcdcdc',
    styleReminderAnimation: '#707070',
};
