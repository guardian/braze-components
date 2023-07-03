import React, { useState } from 'react';
import { Button, LinkButton, SvgCross } from '@guardian/source-react-components';
import { useEscapeShortcut, OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';
import type { TrackClick } from '../utils/tracking';
import { StyleData, selfServeStyles, cssInjectionCheck } from '../styles/bannerCommon';
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
    styleClose?: string;
    styleCloseBackground?: string;
    styleCloseHover?: string;
};

const defaultColors: StyleData = {
    styleBackground: 'rgb(237, 237, 237)',
    styleHeader: 'rgb(51, 51, 51)',
    styleBody: 'rgb(51, 51, 51)',
    styleHighlight: 'rgb(51, 51, 51)',
    styleHighlightBackground: 'rgb(237, 237, 237)',
    styleButton: 'rgb(255, 255, 255)',
    styleButtonBackground: 'rgb(5, 41, 98)',
    styleButtonHover: 'rgb(35, 75, 138)',
    styleClose: 'rgb(5, 41, 98)',
    styleCloseBackground: 'rgb(237, 237, 237)',
    styleCloseHover: '#e5e5e5',
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
};

const StyleableBannerWithLink: React.FC<Props> = (props: Props) => {
    const {
        brazeMessageProps: {
            ophanComponentId,
            styleBackground,
            header,
            styleHeader,
            body,
            styleBody,
            highlight,
            styleHighlight,
            styleHighlightBackground,
            buttonText,
            buttonUrl,
            styleButton,
            styleButtonBackground,
            styleButtonHover,
            imageUrl,
            imageAltText = '',
            imagePosition = 'center',
            styleClose,
            styleCloseBackground,
            styleCloseHover,
        },
        trackClick,
    } = props;

    const styles = selfServeStyles(
        {
            styleBackground: cssInjectionCheck(styleBackground, defaultColors.styleBackground),
            styleHeader: cssInjectionCheck(styleHeader, defaultColors.styleHeader),
            styleBody: cssInjectionCheck(styleBody, defaultColors.styleBody),
            styleHighlight: cssInjectionCheck(styleHighlight, defaultColors.styleHighlight),
            styleHighlightBackground: cssInjectionCheck(
                styleHighlightBackground,
                defaultColors.styleHighlightBackground,
            ),
            styleButton: cssInjectionCheck(styleButton, defaultColors.styleButton),
            styleButtonBackground: cssInjectionCheck(
                styleButtonBackground,
                defaultColors.styleButtonBackground,
            ),
            styleButtonHover: cssInjectionCheck(styleButtonHover, defaultColors.styleButtonHover),
            styleClose: cssInjectionCheck(styleClose, defaultColors.styleClose),
            styleCloseBackground: cssInjectionCheck(
                styleCloseBackground,
                defaultColors.styleCloseBackground,
            ),
            styleCloseHover: cssInjectionCheck(styleCloseHover, defaultColors.styleCloseHover),
        },
        defaultColors,
    );

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
