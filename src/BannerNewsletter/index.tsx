import React, { useState } from 'react';
import { css } from '@emotion/react';
import { from, headline } from '@guardian/source-foundations';
import { Button, SvgCross } from '@guardian/source-react-components';
import { useEscapeShortcut, OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';
import { NewsletterSubscribeCallback, CTA, NewsletterFrequency } from '../newsletterCommon';
import type { TrackClick } from '../utils/tracking';
import { StyleData, selfServeStyles } from '../styles/bannerCommon';
import { neutral } from '@guardian/source-foundations';
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

const defaultColors: StyleData = {
    styleBackground: '#ebe8e8',
    styleHeader: `${neutral[20]}`,
    styleBody: '#666',
    styleHighlight: `${neutral[20]}`,
    styleHighlightBackground: '#ebe8e8',
    styleButton: 'rgb(255, 255, 255)',
    styleButtonBackground: 'rgb(5, 41, 98)',
    styleButtonHover: 'rgb(35, 75, 138)',
    styleCloseButton: `${neutral[20]}`,
};

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

    const styles = selfServeStyles(defaultColors, defaultColors);

    const [showBanner, setShowBanner] = useState(true);

    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

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
                    <NewsletterFrequency frequency={frequency} />
                    <p css={styles.paragraph}>
                        {body} {boldText && <span css={localStyles.bold}>{boldText}</span>}
                    </p>
                    {secondParagraph && (
                        <p css={[styles.paragraph, styles.secondParagraph]}>{secondParagraph}</p>
                    )}
                    <CTA
                        subscribeToNewsletter={subscribeToNewsletter}
                        newsletterId={newsletterId as string}
                        ophanComponentId={ophanComponentId}
                        trackClick={trackClick}
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

export { BannerNewsletter };
