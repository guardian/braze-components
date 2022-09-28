import React, { useState } from 'react';
import { Button, LinkButton, SvgCross, SvgInfo } from '@guardian/source-react-components';
import { OphanComponentEvent } from '@guardian/libs';

import { BrazeClickHandler } from '../utils/tracking';
import { styles } from '../styles/bannerCommon';
import { canRender, COMPONENT_NAME } from './canRender';
import { catchAndLogErrors } from '../utils/catchAndLogErrors';

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

    if (!showBanner) {
        return null;
    }

    const logToBrazeAndOphan = (internalButtonId: number): void => {
        catchAndLogErrors('ophanButtonClick', () => {
            // Braze displays button id from 1, but internal representation is numbered from 0
            // This ensures that the Button ID in Braze and Ophan will be the same
            const externalButtonId = internalButtonId + 1;
            submitComponentEvent({
                component: {
                    componentType: 'RETENTION_ENGAGEMENT_BANNER',
                    id: ophanComponentId,
                },
                action: 'CLICK',
                value: externalButtonId.toString(10),
            });
        });

        catchAndLogErrors('brazeButtonClick', () => {
            logButtonClickWithBraze(internalButtonId);
        });
    };
    const onClick = logToBrazeAndOphan;

    const onCloseClick = (
        evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        internalButtonId: number,
    ): void => {
        evt.preventDefault();

        setShowBanner(false);

        logToBrazeAndOphan(internalButtonId);
    };

    return (
        <div css={styles.wrapper}>
            <div css={styles.contentContainer}>
                <div css={styles.topLeftComponent}>
                    <div css={styles.infoIcon}>
                        <SvgInfo />
                    </div>
                    <div css={styles.heading}>
                        <span css={[styles.smallInfoIcon, styles.infoIcon]}>
                            <SvgInfo />
                        </span>
                        {header}
                    </div>
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
