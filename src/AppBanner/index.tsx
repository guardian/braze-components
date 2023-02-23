import React, { useState, ReactElement, useEffect, useRef } from 'react';

import type { TrackClick } from '../utils/tracking';
import {
    useEscapeShortcut,
    OnCloseClick,
    CLOSE_BUTTON_ID,
    captureFocusOnBanner,
} from '../bannerCommon/bannerActions';

import { BannerStickyTopBar } from '../bannerCommon/BannerStickyTopBar';
import { BannerBodyCopy } from '../bannerCommon/BannerBodyCopy';
import { BannerAppStrapline } from '../bannerCommon/BannerAppStrapline';
import { BannerLinkButton } from '../bannerCommon/BannerLinkButton';
import { BannerSecondaryCtaButton } from '../bannerCommon/BannerSecondaryCtaButton';
import { BannerImageBlock } from '../bannerCommon/BannerImageBlock';
import { BannerCloseButton } from '../bannerCommon/BannerCloseButton';

import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

import { styles } from '../bannerCommon/bannerStyles';

export type BrazeMessageProps = {
    ophanComponentId?: string;
    header?: string;
    body?: string;
    boldText?: string;
    secondParagraph?: string;
    cta?: string;
    imageUrl?: string;
    imageAccessibilityText?: string;
};

type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
};

export const AppBanner = (props: Props): ReactElement | null => {
    const {
        brazeMessageProps: {
            ophanComponentId = COMPONENT_NAME,
            header,
            body,
            boldText,
            secondParagraph,
            cta,
            imageUrl,
            imageAccessibilityText,
        },
        trackClick,
    } = props;

    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

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

    const bannerRef = useRef<HTMLDivElement>(null);
    useEffect(() => captureFocusOnBanner(bannerRef), [bannerRef.current]);

    if (!showBanner) {
        return null;
    }

    return (
        <div css={styles.wrapper} ref={bannerRef}>
            <BannerStickyTopBar
                header={header}
                frequency="We'll give it to you for free!"
                onCloseClick={onCloseClick}
            />

            <div css={[styles.breakpoints, styles.contentContainer]}>
                <div>
                    <BannerBodyCopy
                        body={body}
                        boldText={boldText}
                        secondParagraph={secondParagraph}
                    />

                    <BannerAppStrapline cta={cta} />
                    <div css={styles.ctaBar}>
                        <BannerLinkButton onCloseClick={onCloseClick} />
                        <BannerSecondaryCtaButton
                            buttonCopy={"I'm not interested"}
                            onCloseClick={onCloseClick}
                        />
                    </div>
                    <div css={styles.hiddenCloseButton}>
                        <BannerCloseButton onCloseClick={onCloseClick} />
                    </div>
                </div>
                <BannerImageBlock
                    imageUrl={imageUrl}
                    imageAccessibilityText={imageAccessibilityText}
                />
            </div>
        </div>
    );
};
