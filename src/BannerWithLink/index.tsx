import React, { useState, ReactElement, useEffect, useRef } from 'react';

import type { TrackClick } from '../utils/tracking';
import {
    BrazeBannerMessageProps,
    captureFocusOnBanner,
    CLOSE_BUTTON_ID,
    OnCloseClick,
    useEscapeShortcut,
} from '../bannerCommon/bannerActions';

import { BannerStickyTopBar } from '../bannerCommon/BannerStickyTopBar';
import { BannerBodyCopy } from '../bannerCommon/BannerBodyCopy';
import { BannerLinkButton } from '../bannerCommon/BannerLinkButton';
import { BannerImageBlock } from '../bannerCommon/BannerImageBlock';
import { BannerCloseButton } from '../bannerCommon/BannerCloseButton';

import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

import { styles } from '../bannerCommon/bannerStyles';

type Props = {
    brazeMessageProps: BrazeBannerMessageProps;
    trackClick: TrackClick;
};

export const BannerWithLink = (props: Props): ReactElement | null => {
    const {
        brazeMessageProps: {
            ophanComponentId = COMPONENT_NAME,
            header,
            body,
            boldText,
            buttonText,
            buttonUrl,
            imageUrl,
            imageAccessibilityText,
        },
        trackClick,
    } = props;

    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

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

    const bannerRef = useRef<HTMLDivElement>(null);
    useEffect(() => captureFocusOnBanner(bannerRef), [bannerRef.current]);

    if (!showBanner) {
        return null;
    }

    return (
        <div css={styles.wrapper} ref={bannerRef}>
            <BannerStickyTopBar header={header} onCloseClick={onCloseClick} />

            <div css={[styles.breakpoints, styles.contentContainer]}>
                <div>
                    <BannerBodyCopy body={body} boldText={boldText} />

                    {buttonText && buttonUrl && (
                        <div css={styles.ctaBar}>
                            <BannerLinkButton
                                ophanComponentId={ophanComponentId as string}
                                buttonText={buttonText}
                                buttonUrl={buttonUrl}
                                trackClick={trackClick}
                            />
                        </div>
                    )}
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
