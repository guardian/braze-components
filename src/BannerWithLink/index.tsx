import React, { useState } from 'react';
import { Button, LinkButton, SvgCross } from '@guardian/source-react-components';
import { OphanComponentEvent } from '@guardian/libs';
import { BrazeClickHandler } from '../utils/tracking';
import {
    useEscapeShortcut,
    logBannerCloseToOphan,
    OnCloseClick,
} from '../bannerCommon/bannerActions';
import { styles } from '../styles/bannerCommon';
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
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    ophanComponentId?: string;
    brazeMessageProps: BrazeMessageProps;
};

const BannerWithLink: React.FC<Props> = (props: Props) => {
    const {
        logButtonClickWithBraze,
        submitComponentEvent,
        brazeMessageProps: {
            header,
            body,
            boldText,
            buttonText,
            buttonUrl,
            imageUrl,
            ophanComponentId,
        },
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
                    <p css={styles.paragraph}>
                        {body}

                        {boldText ? (
                            <>
                                <br />
                                <strong css={styles.cta}>{boldText}</strong>
                            </>
                        ) : null}
                    </p>
                    <LinkButton
                        href={buttonUrl}
                        css={styles.primaryButton}
                        onClick={() => onClick(0)}
                    >
                        {buttonText}
                    </LinkButton>
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

export { BannerWithLink };
