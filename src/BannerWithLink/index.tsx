import React, { useState } from 'react';
import { Button, LinkButton, SvgCross } from '@guardian/source-react-components';
import { useEscapeShortcut, OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';
import type { TrackClick } from '../utils/tracking';
import { StyleData, selfServeStyles } from '../styles/bannerCommon';
import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

const defaultColors: StyleData = {
    styleBackground: '#ebe8e8',
    styleHeader: `#333333`,
    styleBody: '#666666',
    styleHighlight: `#333333`,
    styleHighlightBackground: '#ebe8e8',
    styleButton: '#ffffff',
    styleButtonBackground: '#052962',
    styleButtonHover: '#234b8a',
    styleReminderButton: '#121212',
    styleReminderButtonBackground: '#ededed',
    styleReminderButtonHover: '#dcdcdc',
    styleReminderAnimation: '#707070',
    styleClose: `#333333`,
    styleCloseBackground: '#ebe8e8',
    styleCloseHover: '#e5e5e5',
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

                    {boldText ? (
                        <p css={styles.highlightContainer}>
                            <strong css={styles.highlight}>{boldText}</strong>
                        </p>
                    ) : null}

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
