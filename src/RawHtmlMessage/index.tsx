import React, { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import type { TrackClick } from '../utils/tracking';
import type { OphanComponentType, SubmitComponentEvent } from '../utils/tracking';

export interface RawHtmlMessageProps {
    rawHtml: string;
    messageId: string;
    ophanComponentType: OphanComponentType;
    submitComponentEvent: SubmitComponentEvent;
    logButtonClickWithBraze: (id: number) => void;
    trackClick: TrackClick;
}

export const RawHtmlMessage: React.FC<RawHtmlMessageProps> = ({
    rawHtml,
    messageId,
    ophanComponentType,
    submitComponentEvent,
    logButtonClickWithBraze,
    trackClick,
}) => {
    // Sanitize HTML on render
    const safeHtml = DOMPurify.sanitize(rawHtml, {
        USE_PROFILES: { html: true },
    });

    const ref = useRef<HTMLDivElement | null>(null);

    // Log impression on mount
    useEffect(() => {
        submitComponentEvent({
            component: {
                componentType: ophanComponentType,
                id: messageId,
            },
            action: 'INSERT',
        });
    }, [submitComponentEvent, ophanComponentType, messageId]);

    // Handle button clicks for tracking
    useEffect(() => {
        const el = ref.current;
        if (!el) {
            return;
        }

        const onClick = (ev: MouseEvent) => {
            const target = ev.target as HTMLElement | null;
            if (!target) {
                return;
            }

            const btn = target.closest('[data-braze-button-id]');
            if (btn) {
                const raw = btn.getAttribute('data-braze-button-id');
                const id = raw ? parseInt(raw, 10) : NaN;
                if (!Number.isNaN(id)) {
                    logButtonClickWithBraze(id);
                    trackClick({
                        ophanComponentId: messageId,
                        internalButtonId: id,
                    });
                }
            }
        };

        el.addEventListener('click', onClick);
        return () => {
            el.removeEventListener('click', onClick);
        };
    }, [logButtonClickWithBraze, trackClick, messageId]);

    return (
        <div
            ref={ref}
            className="gu-braze-raw-html-message"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
            data-component="RawHtmlMessage"
            data-braze-message-id={messageId}
        />
    );
};
