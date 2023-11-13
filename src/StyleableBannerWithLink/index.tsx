import React, { useState } from 'react';
import { Button, LinkButton, SvgCross } from '@guardian/source-react-components';
import { useEscapeShortcut, OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';
import type { TrackClick } from '../utils/tracking';
import { StyleableBannerColorStyles } from '../styles/colorData';
import { selfServeStyles } from '../styles/bannerCommon';
import { canRender, COMPONENT_NAME } from './canRender';
import { PaymentIcons } from '../components/PaymentIcons';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    ophanComponentId?: string;
    header?: string;
    body?: string;
    highlight?: string;
    buttonText?: string;
    buttonUrl?: string;
    showPaymentIcons?: string;
    includeReminderCta?: string;
    imageUrl?: string;
    imageAltText?: string;
    imagePosition?: string;
    styleBackground?: string;
    styleHeader?: string;
    styleBody?: string;
    styleHighlight?: string;
    styleHighlightBackground?: string;
    styleButton?: string;
    styleButtonBackground?: string;
    styleButtonHover?: string;
    styleReminderButton?: string;
    styleReminderButtonBackground?: string;
    styleReminderButtonHover?: string;
    styleReminderAnimation?: string;
    styleClose?: string;
    styleCloseBackground?: string;
    styleCloseHover?: string;
};

const defaultColors: StyleableBannerColorStyles = {
    styleBackground: '#ededed',
    styleHeader: '#333333',
    styleBody: '#333333',
    styleHighlight: '#333333',
    styleHighlightBackground: '#ededed',
    styleButton: '#ffffff',
    styleButtonBackground: '#052962',
    styleButtonHover: '#234b8a',
    styleReminderButton: '#121212',
    styleReminderButtonBackground: '#ededed',
    styleReminderButtonHover: '#dcdcdc',
    styleReminderAnimation: '#707070',
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
                <div css={styles.topLeftComponent}>
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
                            ? styles.bottomRightComponent
                            : styles.centeredBottomRightComponent
                    }
                >
                    <div css={imagePosition === 'bottom' ? styles.image : styles.centeredImage}>
                        <img src={imageUrl} alt={imageAltText} />
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

export { StyleableBannerWithLink };
