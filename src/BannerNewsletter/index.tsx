import React, { useState } from 'react';
import { Button, SvgCross } from '@guardian/source-react-components';
import { OphanComponentEvent } from '@guardian/libs';
import { BrazeClickHandler } from '../utils/tracking';
import {
    useEscapeShortcut,
    logBannerCloseToOphan,
    OnCloseClick,
} from '../bannerCommon/bannerActions';
import {
    NewsletterSubscribeCallback,
    CTA,
    NewsletterFrequency,
} from '../newsletterCommon/sharedComponents';
import { styles } from '../styles/bannerCommon';
import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    ophanComponentId?: string;
    header?: string;
    body?: string;
    boldText?: string;
    imageUrl?: string;
    newsletterId?: string;
    frequency?: string;
};

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    brazeMessageProps: BrazeMessageProps;
    subscribeToNewsletter: NewsletterSubscribeCallback;
};

// export type Props = {
//     brazeMessageProps: BrazeMessageProps;
//     subscribeToNewsletter: NewsletterSubscribeCallback;
//     trackClick: TrackClick;
// };

const BannerNewsletter: React.FC<Props> = (props: Props) => {
    const {
        logButtonClickWithBraze,
        submitComponentEvent,
        brazeMessageProps: {
            ophanComponentId,
            header,
            body,
            boldText,
            newsletterId,
            imageUrl,
            frequency,
        },
        subscribeToNewsletter
    } = props;

    const [showBanner, setShowBanner] = useState(true);

    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    const logToBrazeAndOphan = (internalButtonId: number): void => {
        logBannerCloseToOphan(
            internalButtonId,
            submitComponentEvent,
            ophanComponentId,
            logButtonClickWithBraze,
        );
    };
    const onClick = logToBrazeAndOphan;

    const onCloseClick: OnCloseClick = (evt, internalButtonId) => {
        evt.preventDefault();
        onCloseAction(internalButtonId);
    };

    const onCloseAction = (internalButtonId: number): void => {
        setShowBanner(false);
        document.body.focus();
        logToBrazeAndOphan(internalButtonId);
    };

    useEscapeShortcut(() => onCloseAction(1), []);


    if (!showBanner) {
        return null;
    }

    return (
        <div css={styles.wrapper}>
            <div css={styles.contentContainer}>
                <div css={styles.topLeftComponent}>
                    <div css={styles.heading}>{header}</div>
                    <NewsletterFrequency frequency={frequency} />
                    <p css={styles.paragraph}>
                        {body}

                        {boldText ? (
                            <>
                                <br />
                                <strong css={styles.cta}>{boldText}</strong>
                            </>
                        ) : null}
                    </p>
                    <CTA
                        subscribeToNewsletter={subscribeToNewsletter}
                        newsletterId={newsletterId as string}
                        ophanComponentId={ophanComponentId}
                        trackClick={trackClick}
                    />
                </div>
                <div css={styles.bottomRightComponent}>
                    <div css={styles.image}>
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
                            onClick={(e) => onCloseClick(e, 1)}
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
