import React, { useState } from 'react';
import { css } from '@emotion/react';
import { from, headline } from '@guardian/source-foundations';
import { Button, SvgCross } from '@guardian/source-react-components';
import { useEscapeShortcut, OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';

import { defaultPrimaryCtaButtonColors } from '../components/PrimaryCtaButton';
import {
    NewsletterCtaButton,
    defaultNewsletterCtaButtonColors
} from '../components/NewsletterCtaButton';
import {
    NewsletterFrequencyBlock,
    defaultNewsletterFrequencyColors
} from '../components/NewsletterFrequencyBlock';
import { selfServeStyles } from '../styles/bannerCommon';
import { getColors } from '../styles/colorData';

import type { StyleableBannerNewsletterColorStyles, BannerNewsletterCopyColorStyles } from '../styles/colorData';
import type { Extras } from '../logic/types';
import type { NewsletterSubscribeCallback } from '../types/dcrTypes';
import type { TrackClick } from '../utils/tracking';

import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

const localStyles = {
    heading: css`
        ${headline.small({ fontWeight: 'bold' })};
        margin: 0;
        max-width: 100%;

        ${from.mobileLandscape} {
            ${headline.small({ fontWeight: 'bold' })};
        }

        ${from.tablet} {
            ${headline.medium({ fontWeight: 'bold' })};
            max-width: 100%;
        }
    `,
    bold: css`
        font-weight: bold;
    `,
};

export const defaultBannerNewsletterColors: BannerNewsletterCopyColorStyles = {
    styleBackground: '#ebe8e8',
    styleHeader: `#333333`,
    styleBody: '#666',
    styleHighlight: `#333333`,
    styleHighlightBackground: '#ebe8e8',
    styleClose: `#333333`,
    styleCloseBackground: '#ebe8e8',
    styleCloseHover: '#e5e5e5',
};

export type BrazeMessageProps = Extras & StyleableBannerNewsletterColorStyles & {
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

    const newsletterCtaStyles = getColors(brazeProps, defaultNewsletterCtaButtonColors);
    const newsletterFrequencyStyles = getColors(brazeProps, defaultNewsletterFrequencyColors);

    const styles = selfServeStyles(props.brazeMessageProps, {
        ...defaultBannerNewsletterColors,
        ...defaultPrimaryCtaButtonColors,
    });

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
                    <div css={localStyles.heading}>{header}</div>
                    <NewsletterFrequencyBlock
                        frequency={frequency}
                        colors={newsletterFrequencyStyles}
                    />
                    <p css={styles.paragraph}>
                        {body} {highlight && <span css={[localStyles.bold, styles.highlight]}>{highlight}</span>}
                    </p>
                    {secondParagraph && (
                        <p css={[styles.paragraph, styles.secondParagraph]}>{secondParagraph}</p>
                    )}
                    <NewsletterCtaButton
                        subscribeToNewsletter={subscribeToNewsletter}
                        newsletterId={newsletterId as string}
                        ophanComponentId={ophanComponentId}
                        trackClick={trackClick}
                        newsletterCta={newsletterCta}
                        colors={newsletterCtaStyles}
                    />
                </div>
                <div css={styles.centeredBottomRightComponent}>
                    <div css={styles.centeredImage}>
                        <img src={imageUrl} alt="" />
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

export { StyleableBannerNewsletter };