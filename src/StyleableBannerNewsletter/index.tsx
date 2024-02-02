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

import type { Extras } from '../logic/types';
import type { NewsletterSubscribeCallback } from '../types/dcrTypes';
import type { TrackClick } from '../utils/tracking';
import type {
    StyleableBannerNewsletterColorStyles,
    BannerNewsletterBaseColorStyles,
} from '../styles/colorData';

import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

export type BrazeMessageProps = Extras &
    StyleableBannerNewsletterColorStyles & {
        ophanComponentId?: string;
        header?: string;
        frequency?: string;
        body?: string;
        highlight?: string;
        secondParagraph?: string;
        newsletterCta?: string;
        imageUrl?: string;
        newsletterId?: string;
    };

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
    subscribeToNewsletter: NewsletterSubscribeCallback;
};

const StyleableBannerNewsletter: React.FC<Props> = (props: Props) => {
    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    const {
        brazeMessageProps: {
            ophanComponentId,
            header,
            body,
            highlight,
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

    console.log(styles);

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
                            {body} {highlight && <span css={styles.highlight}>{highlight}</span>}
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
import { neutral, space, from, until, body, headline } from '@guardian/source-foundations';
import { getColors } from '../styles/colorData';

const imgHeight = '280';

export const defaultBannerNewsletterBaseColors: BannerNewsletterBaseColorStyles = {
    styleBackground: '#ebe8e8',
    styleHeader: `#333333`,
    styleBody: '#666666',
    styleHighlight: `#333333`,
    styleSecondParagraph: '#666666',
    styleHighlightBackground: '#ebe8e8',
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
            ${headline.small({ fontWeight: 'bold' })};
            margin: 0;
            max-width: 100%;
            color: ${colors.styleHeader};

            ${from.mobileLandscape} {
                ${headline.small({ fontWeight: 'bold' })};
            }

            ${from.tablet} {
                ${headline.medium({ fontWeight: 'bold' })};
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

        secondParagraph: css`
            color: ${colors.styleSecondParagraph};
            ${from.desktop} {
                font-size: 18px;
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
