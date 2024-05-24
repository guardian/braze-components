import React, { useState } from 'react';

import { PrimaryCtaButton, defaultPrimaryCtaButtonColors } from '../components/PrimaryCtaButton';
import { ReminderCtaButton, defaultReminderCtaButtonColors } from '../components/ReminderCtaButton';
import { BannerCloseButton, defaultBannerCloseButtonColors } from '../components/BannerCloseButton';

import type { ColorValueHex } from '../logic/types';
import type { ReminderStage } from '../logic/reminders';
import type { TrackClick } from '../utils/tracking';
import type { FetchEmail } from '../types/dcrTypes';
import type { BannerWithLinkBaseColorStyles } from '../styles/colorData';

import { canRender, COMPONENT_NAME } from './canRender';
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
    showPrivacyText?: string;

    styleBackground?: ColorValueHex;
    styleHeader?: ColorValueHex;
    styleBody?: ColorValueHex;
    styleHighlight?: ColorValueHex;
    styleHighlightBackground?: ColorValueHex;
    styleButton?: ColorValueHex;
    styleButtonBackground?: ColorValueHex;
    styleButtonHover?: ColorValueHex;
    styleReminderButton?: ColorValueHex;
    styleReminderButtonBackground?: ColorValueHex;
    styleReminderButtonHover?: ColorValueHex;
    styleReminderAnimation?: ColorValueHex;
    styleClose?: ColorValueHex;
    styleCloseBackground?: ColorValueHex;
    styleCloseHover?: ColorValueHex;
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

    const bannerWithLinkBaseColors = getColors(brazeProps, defaultBannerWithLinkColors);
    const primaryCtaColors = getColors(brazeProps, defaultPrimaryCtaButtonColors);
    const reminderCtaColors = getColors(brazeProps, defaultReminderCtaButtonColors);
    const closeButtonColors = getColors(brazeProps, defaultBannerCloseButtonColors);

    const styles = getBannerWithLinkStyles(brazeProps, bannerWithLinkBaseColors);

    const showPrivacyTextBoolean = showPrivacyText === 'true';

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
                        {fetchEmail && reminderStage && (
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

// Styling
// --------------------------------------------
import { css } from '@emotion/react';
import { neutral, space, from, until, body, headline } from '@guardian/source/foundations';
import { getColors } from '../styles/colorData';

export const defaultBannerWithLinkColors: BannerWithLinkBaseColorStyles = {
    styleBackground: '#ededed',
    styleHeader: '#333333',
    styleBody: '#333333',
    styleHighlight: '#333333',
    styleHighlightBackground: '#ededed',
};

const imgHeight = '280';

export const getBannerWithLinkStyles = (
    userVals: Record<string, string>,
    defaults: BannerWithLinkBaseColorStyles,
) => {
    const colors = getColors(userVals, defaults);

    return {
        wrapper: css`
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            background-color: ${colors.styleBackground};
            color: ${neutral[20]};
            html {
                box-sizing: border-box;
            }
            *,
            *:before,
            *:after {
                box-sizing: inherit;
            }
        `,

        contentContainer: css`
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
        `,

        topLeftComponent: css`
            width: 93%;
            padding: ${space[4]}px;
            min-height: ${imgHeight}px;
            ${from.desktop} {
                width: 60%;
            }
        `,

        bottomRightComponent: css`
            display: flex;
            justify-content: center;
            width: 100%;
            max-height: 100%;
            ${from.desktop} {
                align-self: flex-end;
                padding-right: ${space[4]}px;
                max-width: 45%;
                justify-content: flex-end;
            }
            ${from.leftCol} {
                padding-right: 0;
                justify-content: space-between;
            }
            ${from.wide} {
                max-width: 48%;
            }
        `,

        centeredBottomRightComponent: css`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            max-height: 100%;
            ${from.desktop} {
                padding-right: ${space[4]}px;
                max-width: 45%;
            }
            ${from.leftCol} {
                padding-right: 0;
            }
            ${from.wide} {
                max-width: 48%;
            }
        `,

        heading: css`
            ${headline.small({ fontWeight: 'bold' })};
            margin: 0;
            max-width: 100%;
            color: ${colors.styleHeader};
            ${from.mobileLandscape} {
                ${headline.small({ fontWeight: 'bold' })};
            }
            ${from.tablet} {
                max-width: 100%;
            }
        `,

        paragraph: css`
            ${body.medium()}
            line-height: 135%;
            margin: ${space[5]}px 0 ${space[5]}px;
            max-width: 100%;
            color: ${colors.styleBody};
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
        `,

        highlightContainer: css`
            ${body.medium()}
            margin-top: ${space[5]}px;
            margin-right: ${space[3]}px;
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
        `,

        highlight: css`
            font-weight: 700;
            color: ${colors.styleHighlight};
            background-color: ${colors.styleHighlightBackground};
        `,

        smallRightSpacer: css`
            margin-right: ${space[3]}px;
        `,

        primaryButtonWrapper: css`
            margin: 0 ${space[2]}px ${space[1]}px 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
        `,

        iconPanel: css`
            ${from.desktop} {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-end;
                height: 100%;
                padding: ${space[4]}px 0;
                margin-left: ${space[4]}px;
            }
        `,

        image: css`
            max-width: 100%;
            max-height: 300px;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            margin-top: ${space[2]}px;
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
        centeredImage: css`
            max-width: 100%;
            max-height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: ${space[2]}px;
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
    };
};
