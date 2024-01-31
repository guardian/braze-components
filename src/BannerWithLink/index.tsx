import React, { useState } from 'react';
import { Button, SvgCross } from '@guardian/source-react-components';
import { useEscapeShortcut, OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';
import type { TrackClick } from '../utils/tracking';

import {
    PrimaryCtaButton,
    defaultPrimaryCtaButtonColors
} from '../components/PrimaryCtaButton';
import { defaultBannerWithLinkColors } from '../StyleableBannerWithLink';
import { selfServeStyles } from '../styles/bannerCommon';

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

    const styles = selfServeStyles(props.brazeMessageProps, {
        ...defaultBannerWithLinkColors,
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

export { BannerWithLink };
