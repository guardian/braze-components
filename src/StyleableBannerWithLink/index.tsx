import React, { useState } from 'react';
import { Button, LinkButton, SvgCross } from '@guardian/source-react-components';
import { useEscapeShortcut, OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';
import type { TrackClick } from '../utils/tracking';
import { selfServeStyles } from '../styles/bannerCommon';
import { canRender, COMPONENT_NAME } from './canRender';
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
    styleButton?: string;
    styleButtonBackground?: string;
    styleButtonHover?: string;
    imageUrl?: string;
    imageAltText?: string;
    imagePosition?: string;
    styleCloseButton?: string;
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
};

const StyleableBannerWithLink: React.FC<Props> = (props: Props) => {
    console.log(props);
    const {
        brazeMessageProps: {
            ophanComponentId,
            styleBackground = 'rgb(237, 237, 237)',
            header,
            styleHeader = 'rgb(51, 51, 51)',
            body,
            styleBody = 'rgb(51, 51, 51)',
            highlight,
            styleHighlight = 'rgb(51, 51, 51)',
            styleHighlightBackground = 'rgb(237, 237, 237)',
            buttonText,
            buttonUrl,
            styleButton = 'rgb(255, 255, 255)',
            styleButtonBackground = 'rgb(5, 41, 98)',
            styleButtonHover = 'rgb(35, 75, 138)',
            imageUrl,
            imageAltText = '',
            imagePosition = 'center',
            styleCloseButton = 'rgb(5, 41, 98)',
        },
        trackClick,
    } = props;

    const styles = selfServeStyles({
        styleBackground,
        styleHeader,
        styleBody,
        styleHighlight,
        styleHighlightBackground,
        styleButton,
        styleButtonBackground,
        styleButtonHover,
        styleCloseButton,
    });

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

                        {highlight ? (
                            <>
                                <br />
                                <strong css={styles.highlight}>{highlight}</strong>
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
