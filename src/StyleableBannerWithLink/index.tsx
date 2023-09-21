import React, { useState } from 'react';
import { Button, LinkButton, SvgCross } from '@guardian/source-react-components';
import { useEscapeShortcut, OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';
import type { TrackClick } from '../utils/tracking';
import { StyleData, selfServeStyles } from '../styles/bannerCommon';
import { canRender, COMPONENT_NAME } from './canRender';
import { PaymentIcons } from '../components/PaymentIcons';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    ophanComponentId?: string;
    styleBackground?: string;
    header?: string;
    styleHeader?: string;
    body?: string;
    styleBody?: string;
    highlight?: string;
    styleHighlight?: string;
    styleHighlightBackground?: string;
    buttonText?: string;
    buttonUrl?: string;
    showPaymentIcons?: string;
    styleButton?: string;
    styleButtonBackground?: string;
    styleButtonHover?: string;
    imageUrl?: string;
    imageAltText?: string;
    imagePosition?: string;
    imageIsSquare?: string;
    styleClose?: string;
    styleCloseBackground?: string;
    styleCloseHover?: string;
};

const defaultColors: StyleData = {
    styleBackground: '#ededed',
    styleHeader: '#333333',
    styleBody: '#333333',
    styleHighlight: '#333333',
    styleHighlightBackground: '#ededed',
    styleButton: '#ffffff',
    styleButtonBackground: '#052962',
    styleButtonHover: '#234b8a',
    styleClose: '#052962',
    styleCloseBackground: '#ededed',
    styleCloseHover: '#e5e5e5',
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
};

const StyleableBannerWithLink: React.FC<Props> = (props: Props) => {
    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    const {
        brazeMessageProps: {
            ophanComponentId,
            header,
            body,
            highlight,
            buttonText,
            buttonUrl,
            showPaymentIcons = 'false',
            imageUrl,
            imageAltText = '',
            imagePosition = 'center',
            imageIsSquare = 'true',
        },
        trackClick,
    } = props;

    const styles = selfServeStyles(props.brazeMessageProps, defaultColors);

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
                <div css={styles.leftPanel}>
                    <div css={styles.heading}>{header}</div>
                    <p css={styles.paragraph}>{body}</p>

                    {highlight ? (
                        <p css={styles.highlightContainer}>
                            <strong css={styles.highlight}>{highlight}</strong>
                        </p>
                    ) : null}
                    <div css={styles.primaryButtonWrapper}>
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
                        {showPaymentIcons === 'true' && <PaymentIcons />}
                    </div>
                </div>
                <div
                    css={
                        imagePosition === 'bottom'
                            ? [styles.rightPanel, styles.rightPanelBaseAligned]
                            : styles.rightPanel
                    }
                >
                    <img
                        src={imageUrl}
                        alt={imageAltText}
                        css={
                            imageIsSquare === 'true'
                                ? [styles.image, styles.imageIsSquare]
                                : styles.image
                        }
                    />
                </div>
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
    );
};

export { StyleableBannerWithLink };
