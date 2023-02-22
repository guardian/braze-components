import { useEffect } from 'react';

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

type UseRefObject = {
    current: HTMLDivElement | null;
};

export function captureFocusOnBanner(bannerRef: UseRefObject): void {
    if (bannerRef.current != null) {
        const closeButtonElements: HTMLElement[] = [
            ...bannerRef.current.querySelectorAll<HTMLElement>('[data-close-button]'),
        ];

        if (closeButtonElements.length > 1) {
            const firstFocussableElement = closeButtonElements[0];
            const lastFocussableElement = closeButtonElements[closeButtonElements.length - 1];

            firstFocussableElement.focus();

            bannerRef.current.addEventListener('keydown', (e) => {
                const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
                if (!isTabPressed) {
                    return;
                }
                if (e.shiftKey) {
                    if (document.activeElement === firstFocussableElement) {
                        lastFocussableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocussableElement) {
                        firstFocussableElement.focus();
                        e.preventDefault();
                    }
                }
            });
        }
    }
}
