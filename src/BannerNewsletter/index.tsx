import React, { useState } from 'react';
import { Button, SvgCross } from '@guardian/source-react-components';
import { useEscapeShortcut } from '../utils/useEscapeShortcut';
import { styles } from '../styles/bannerCommon';
import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };
import {
    NewsletterSubscribeCallback,
    CTA,
    NewsletterFrequency,
} from '../BrazeNewsletterComponents';
import type { TrackClick } from '../utils/tracking';

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
    trackClick: TrackClick;
    subscribeToNewsletter: NewsletterSubscribeCallback;
    brazeMessageProps: BrazeMessageProps;
    // logButtonClickWithBraze: BrazeClickHandler;
    // submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    // ophanComponentId?: string;
    // brazeMessageProps: BrazeMessageProps;
};

// const catchAndLogErrors = (description: string, fn: () => void): void => {
//     try {
//         fn();
//     } catch (e) {
//         console.log(`Error (${description}): `, e.message);
//     }
// };

const BannerNewsletter: React.FC<Props> = (props: Props) => {
    const {
        trackClick,
        subscribeToNewsletter,
        brazeMessageProps: {
            ophanComponentId,
            header,
            body,
            boldText,
            newsletterId,
            imageUrl,
            frequency,
        },
    } = props;

    console.log('BannerNewsletter', frequency);

    const [showBanner, setShowBanner] = useState(true);

    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    // const logToBrazeAndOphan = (internalButtonId: number): void => {
    //     catchAndLogErrors('ophanButtonClick', () => {
    //         // Braze displays button id from 1, but internal representation is numbered from 0
    //         // This ensures that the Button ID in Braze and Ophan will be the same
    //         const externalButtonId = internalButtonId + 1;
    //         submitComponentEvent({
    //             component: {
    //                 componentType: 'RETENTION_ENGAGEMENT_BANNER',
    //                 id: ophanComponentId,
    //             },
    //             action: 'CLICK',
    //             value: externalButtonId.toString(10),
    //         });
    //     });

    //     catchAndLogErrors('brazeButtonClick', () => {
    //         logButtonClickWithBraze(internalButtonId);
    //     });
    // };
    // const onClick = logToBrazeAndOphan;

    const onCloseClick = (
        evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        internalButtonId: number,
    ): void => {
        evt.preventDefault();
        onCloseAction(internalButtonId);
    };

    const onCloseAction = (internalButtonId: number): void => {
        setShowBanner(false);
        document.body.focus();

        // logToBrazeAndOphan(internalButtonId);
        console.log('onCloseAction internalButtonId', internalButtonId);
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
                    <NewsletterFrequency frequency={' '} />
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
