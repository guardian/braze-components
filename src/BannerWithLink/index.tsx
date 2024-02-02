import React, { useState } from 'react';

import { PrimaryCtaButton, defaultPrimaryCtaButtonColors } from '../components/PrimaryCtaButton';
import { getBannerWithLinkStyles, defaultBannerWithLinkColors } from '../StyleableBannerWithLink';
import { BannerCloseButton, defaultBannerCloseButtonColors } from '../components/BannerCloseButton';

import type { TrackClick } from '../utils/tracking';

import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    ophanComponentId?: string;
    header?: string;
    body?: string;
    boldText?: string;
    buttonText?: string;
    buttonUrl?: string;
    imageUrl?: string;
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
};

const BannerWithLink: React.FC<Props> = (props: Props) => {
    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    const {
        brazeMessageProps: {
            ophanComponentId,
            header,
            body,
            boldText,
            buttonText,
            buttonUrl,
            imageUrl,
        },
        trackClick,
    } = props;

    const styles = getBannerWithLinkStyles(props.brazeMessageProps, defaultBannerWithLinkColors);

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

                    {boldText ? (
                        <p css={styles.highlightContainer}>
                            <strong css={styles.highlight}>{boldText}</strong>
                        </p>
                    ) : null}

                    <PrimaryCtaButton
                        buttonText={buttonText as string}
                        buttonUrl={buttonUrl as string}
                        showPaymentIcons={false}
                        ophanComponentId={ophanComponentId as string}
                        colors={defaultPrimaryCtaButtonColors}
                        trackClick={trackClick}
                    />
                </div>
                <div css={styles.bottomRightComponent}>
                    <div css={styles.image}>
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

export { BannerWithLink };
