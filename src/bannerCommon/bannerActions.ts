import { useEffect } from 'react';
import { OphanComponentEvent } from '@guardian/libs';
import { BrazeClickHandler } from '../utils/tracking';

// Utility function which puts a try-catch block around a function and reports errors
export const catchAndLogErrors = (description: string, fn: () => void): void => {
    try {
        fn();
    } catch (e) {
        console.log(`Error (${description}): `, e.message);
    }
};

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

// Function to log banner close events
export const logBannerCloseToOphan = (
    internalButtonId: number,
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void,
    ophanComponentId: string | undefined,
    logButtonClickWithBraze: BrazeClickHandler,
): void => {
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
