import React, { useState } from 'react';

import {
    NewsletterCtaButton,
    defaultNewsletterCtaButtonColors,
} from '../components/NewsletterCtaButton';
import {
    NewsletterFrequencyBlock,
    defaultNewsletterFrequencyColors,
} from '../components/NewsletterFrequencyBlock';
import { BannerCloseButton, defaultBannerCloseButtonColors } from '../components/BannerCloseButton';

import type { ColorValueHex } from '../logic/types';
import type { NewsletterSubscribeCallback } from '../types/dcrTypes';
import type { TrackClick } from '../utils/tracking';
import type { BannerNewsletterBaseColorStyles } from '../styles/colorData';

import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    ophanComponentId?: string;
    header?: string;
    frequency?: string;
    body?: string;
    boldText?: string;
    secondParagraph?: string;
    newsletterCta?: string;
    imageUrl?: string;
    newsletterId?: string;

    styleBackground?: ColorValueHex;
    styleBody?: ColorValueHex;
    styleClockColor?: ColorValueHex;
    styleClose?: ColorValueHex;
    styleCloseBackground?: ColorValueHex;
    styleCloseHover?: ColorValueHex;
    styleFrequencyText?: ColorValueHex;
    styleHeader?: ColorValueHex;
    styleBoldText?: ColorValueHex;
    styleBoldTextBackground?: ColorValueHex;
    styleNewsletterButton?: ColorValueHex;
    styleNewsletterButtonBackground?: ColorValueHex;
    styleNewsletterButtonHover?: ColorValueHex;
    styleReminderAnimation?: ColorValueHex;
    styleSecondParagraph?: ColorValueHex;
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
    subscribeToNewsletter: NewsletterSubscribeCallback;
};

const StyleableBannerNewsletter: React.FC<Props> = (props: Props) => {
    if (!props.subscribeToNewsletter || !canRender(props.brazeMessageProps)) {
        return null;
    }

    const {
        brazeMessageProps: {
            ophanComponentId,
            header,
            body,
            boldText,
            secondParagraph,
            newsletterCta = 'Sign up',
            newsletterId,
            imageUrl,
            frequency,
        },
        subscribeToNewsletter,
        trackClick,
    } = props;

    const brazeProps = props.brazeMessageProps;

    const newsletterBaseColors = getColors(brazeProps, defaultBannerNewsletterBaseColors);
    const newsletterCtaColors = getColors(brazeProps, defaultNewsletterCtaButtonColors);
    const newsletterFrequencyColors = getColors(brazeProps, defaultNewsletterFrequencyColors);
    const bannerCloseButtonColors = getColors(brazeProps, defaultBannerCloseButtonColors);

    const styles = getBannerNewsletterStyles(brazeProps, newsletterBaseColors);

    const [showBanner, setShowBanner] = useState(true);

    if (!showBanner) {
        return null;
    }

    return (
        <div css={styles.wrapper}>
            <div css={styles.contentContainer}>
                <div css={styles.topLeftComponent}>
                    <div css={styles.heading}>{header}</div>
                    <NewsletterFrequencyBlock
                        frequency={frequency}
                        colors={newsletterFrequencyColors}
                    />
                    <div css={styles.paragraph}>
                        <p>
                            {body} {boldText && <span css={styles.boldText}>{boldText}</span>}
                        </p>
                        {secondParagraph && <p css={styles.secondParagraph}>{secondParagraph}</p>}
                    </div>
                    <NewsletterCtaButton
                        subscribeToNewsletter={subscribeToNewsletter}
                        newsletterId={newsletterId as string}
                        ophanComponentId={ophanComponentId}
                        trackClick={trackClick}
                        newsletterCta={newsletterCta}
                        colors={newsletterCtaColors}
                    />
                </div>
                <div css={styles.centeredBottomRightComponent}>
                    <div css={styles.centeredImage}>
                        <img src={imageUrl} alt="" />
                    </div>
                    <BannerCloseButton
                        trackClick={trackClick}
                        setShowBanner={setShowBanner}
                        ophanComponentId={ophanComponentId}
                        colors={bannerCloseButtonColors}
                    />
                </div>
            </div>
        </div>
    );
};

export { StyleableBannerNewsletter };

// Styling
// --------------------------------------------
import { css } from '@emotion/react';
import {
    neutral,
    space,
    from,
    until,
    headlineBold28,
    headlineBold34,
    textEgyptian17,
} from '@guardian/source/foundations';
import { getColors } from '../styles/colorData';

const imgHeight = '280';

export const defaultBannerNewsletterBaseColors: BannerNewsletterBaseColorStyles = {
    styleBackground: '#ebe8e8',
    styleHeader: `#333333`,
    styleBody: '#666666',
    styleBoldText: `#333333`,
    styleSecondParagraph: '#666666',
    styleBoldTextBackground: '#ebe8e8',
};

export const getBannerNewsletterStyles = (
    userVals: Record<string, string>,
    defaults: BannerNewsletterBaseColorStyles,
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
            ${headlineBold28};
            margin: 0;
            max-width: 100%;
            color: ${colors.styleHeader};
            ${from.tablet} {
                ${headlineBold34};
                max-width: 100%;
            }
        `,

        paragraph: css`
            ${textEgyptian17};
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

        secondParagraph: css`
            color: ${colors.styleSecondParagraph};
            ${from.desktop} {
                font-size: 18px;
            }
        `,

        boldText: css`
            font-weight: 700;
            color: ${colors.styleBoldText};
            background-color: ${colors.styleBoldTextBackground};
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
