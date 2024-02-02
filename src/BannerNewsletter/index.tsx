import React, { useState } from 'react';
import type { NewsletterSubscribeCallback } from '../types/dcrTypes';
import type { TrackClick } from '../utils/tracking';

import {
    NewsletterCtaButton,
    defaultNewsletterCtaButtonColors,
} from '../components/NewsletterCtaButton';
import {
    NewsletterFrequencyBlock,
    defaultNewsletterFrequencyColors,
} from '../components/NewsletterFrequencyBlock';
import { BannerCloseButton, defaultBannerCloseButtonColors } from '../components/BannerCloseButton';
import {
    getBannerNewsletterStyles,
    defaultBannerNewsletterBaseColors,
} from '../StyleableBannerNewsletter';

import { canRender, COMPONENT_NAME } from './canRender';

export { COMPONENT_NAME };

export type BrazeMessageProps = {
    ophanComponentId?: string;
    header?: string;
    body?: string;
    boldText?: string;
    secondParagraph?: string;
    imageUrl?: string;
    newsletterId?: string;
    frequency?: string;
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
    subscribeToNewsletter: NewsletterSubscribeCallback;
};

const BannerNewsletter: React.FC<Props> = (props: Props) => {
    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    const {
        brazeMessageProps: {
            ophanComponentId,
            header,
            body,
            boldText,
            secondParagraph,
            newsletterId,
            imageUrl,
            frequency,
        },
        subscribeToNewsletter,
        trackClick,
    } = props;

    const styles = getBannerNewsletterStyles(
        props.brazeMessageProps,
        defaultBannerNewsletterBaseColors,
    );

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
                        colors={defaultNewsletterFrequencyColors}
                    />
                    <div css={styles.paragraph}>
                        <p>
                            {body} {boldText && <span css={styles.highlight}>{boldText}</span>}
                        </p>
                        {secondParagraph && <p css={styles.secondParagraph}>{secondParagraph}</p>}
                    </div>
                    <NewsletterCtaButton
                        subscribeToNewsletter={subscribeToNewsletter}
                        newsletterId={newsletterId as string}
                        ophanComponentId={ophanComponentId as string}
                        trackClick={trackClick}
                        newsletterCta="Sign up"
                        colors={defaultNewsletterCtaButtonColors}
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
                        colors={defaultBannerCloseButtonColors}
                    />
                </div>
            </div>
        </div>
    );
};

export { BannerNewsletter };
