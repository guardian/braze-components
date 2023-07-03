import React, { useState } from 'react';
import { Button, LinkButton, SvgCross } from '@guardian/source-react-components';
import { useEscapeShortcut, OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';
import type { TrackClick } from '../utils/tracking';
import { StyleData, selfServeStyles } from '../styles/bannerCommon';
import { neutral } from '@guardian/source-foundations';
import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

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
    buttonText?: string;
    buttonUrl?: string;
    imageUrl?: string;
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
};

const BannerWithLink: React.FC<Props> = (props: Props) => {
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
                    <div css={styles.heading}>{header}</div>
                    <p css={styles.paragraph}>
                        {body}

                        {boldText ? (
                            <>
                                <br />
                                <strong css={styles.highlight}>{boldText}</strong>
                            </>
                        ) : null}
                    </p>
                    <LinkButton
                        href={buttonUrl}
                        css={styles.primaryButton}
                        onClick={() =>
                            trackClick({
                                internalButtonId: 0,
                                ophanComponentId: ophanComponentId as string,
                            })
                        }
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
