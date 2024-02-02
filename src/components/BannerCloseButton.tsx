import React from 'react';
import { css } from '@emotion/react';
import { space, from } from '@guardian/source-foundations';
import { Button, SvgCross } from '@guardian/source-react-components';
import { useEscapeShortcut, OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';
import type { TrackClick } from '../utils/tracking';
import type { CloseButtonColorStyles } from '../styles/colorData';

export const defaultBannerCloseButtonColors: CloseButtonColorStyles = {
    styleClose: '#052962',
    styleCloseBackground: '#ededed',
    styleCloseHover: '#e5e5e5',
};

const getCloseButtonStyles = (colors: CloseButtonColorStyles) => {
    return {
        iconPanel: css`
            ${from.desktop} {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-end;
                height: 100%;
                padding: ${space[4]}px 0;
                margin-left: ${space[4]}px;
            }
        `,

        closeButton: css`
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            position: absolute;
            top: 15px;
            right: 10px;
            border: 1px solid ${colors.styleClose};
            background-color: ${colors.styleCloseBackground};
            &:hover {
                background-color: ${colors.styleCloseHover};
            }
            & svg {
                fill: ${colors.styleClose};
            }
        `,
    };
};

type BannerCloseButtonProps = {
    trackClick: TrackClick;
    setShowBanner: (val: boolean) => void;
    ophanComponentId?: string;
    colors?: CloseButtonColorStyles;
};

export const BannerCloseButton: React.FC<BannerCloseButtonProps> = (
    props: BannerCloseButtonProps,
) => {
    const {
        trackClick,
        setShowBanner,
        ophanComponentId,
        colors = defaultBannerCloseButtonColors,
    } = props;

    const styles = getCloseButtonStyles(colors);

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

    return (
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
    );
};
