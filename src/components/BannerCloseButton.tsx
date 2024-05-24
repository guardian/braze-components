import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { space, from } from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source-react-components';
import type { TrackClick } from '../utils/tracking';
import type { CloseButtonColorStyles } from '../styles/colorData';

// Pass a function to run when the user hits the escape key
// Useful for enabling a keyboard shortcut for dismissing banners
export function useEscapeShortcut(
    eventHandler: (event: KeyboardEvent) => void,
    deps: React.DependencyList = [],
): void {
    function handleEscapeKeydown(event: KeyboardEvent) {
        // IE key name is 'Esc', because IE
        const isEscapeKey = event.key === 'Escape' || event.key === 'Esc';
        if (isEscapeKey) {
            eventHandler(event);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleEscapeKeydown);

        return () => window.removeEventListener('keydown', handleEscapeKeydown);
    }, deps);
}

export type OnCloseClick = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    internalButtonId: number,
) => void;

export const CLOSE_BUTTON_ID = 1;

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

export const defaultBannerCloseButtonColors: CloseButtonColorStyles = {
    styleClose: '#333333',
    styleCloseBackground: '#ebe8e8',
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
