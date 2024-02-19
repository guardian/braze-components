import React, { useState } from 'react';
import { LinkButton } from '@guardian/source-react-components';
import type { TrackClick } from '../utils/tracking';
import { BannerColorStyles } from '../styles/colorData';
import { BannerCloseButton } from '../components/BannerCloseButton';
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

export const BannerWithLink: React.FC<Props> = (props: Props) => {
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
                    <BannerCloseButton
                        trackClick={trackClick}
                        setShowBanner={setShowBanner}
                        ophanComponentId={ophanComponentId}
                    />
                </div>
            </div>
        </div>
    );
};

const defaultColors: BannerColorStyles = {
    styleBackground: '#ebe8e8',
    styleHeader: `#333333`,
    styleBody: '#666666',
    styleHighlight: `#333333`,
    styleHighlightBackground: '#ebe8e8',
    styleButton: '#ffffff',
    styleButtonBackground: '#052962',
    styleButtonHover: '#234b8a',
};
