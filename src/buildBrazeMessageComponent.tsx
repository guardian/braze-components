import React from 'react';
import type { BrazeClickHandler, SubmitComponentEvent, TrackClick } from './utils/tracking';
import { buildTrackClick, OphanComponentType } from './utils/tracking';
import { RawHtmlMessage } from './RawHtmlMessage';

interface HasComponentName {
    componentName?: string;
}

interface HasClickTrackingCallbacks {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: SubmitComponentEvent;
}

interface HasBrazeMessageProps {
    brazeMessageProps?: BrazeMessageProps;
}

export interface HasConsolidatedTrackClick {
    trackClick: TrackClick;
}

export type ComponentMapping<A> = {
    [key: string]: React.FC<A>;
};

export type BrazeMessageProps = {
    [key: string]: string | undefined;
};

// We know in here that we have access to logButtonClickWithBraze and
// submitComponentEvent (using the HasClickTrackingCallbacks interface). So,
// we're able to consolidate these into a single trackClick callback in the
// underlying component(s), as specified by the HasConsolidatedTrackClick
// interface.
export function buildBrazeMessageComponent<
    A extends HasComponentName & HasClickTrackingCallbacks & HasBrazeMessageProps,
>(
    ophanComponentType: OphanComponentType,
    mappings: ComponentMapping<A & HasConsolidatedTrackClick>,
): React.FC<A> {
    const BrazeMessageComponent = (props: A) => {
        const ComponentToRender = props.componentName ? mappings[props.componentName] : undefined;

        const trackClick = buildTrackClick({
            submitComponentEvent: props.submitComponentEvent,
            logButtonClickWithBraze: props.logButtonClickWithBraze,
            ophanComponentType,
        });

        const augmentedProps = {
            ...props,
            trackClick,
        };

        if (!ComponentToRender) {
            // Check if we have raw HTML to render (for custom HTML campaigns with only slotName)
            const rawHtml = props.brazeMessageProps?.message;

            if (rawHtml && typeof rawHtml === 'string') {
                const messageId = props.brazeMessageProps?.messageId || 'raw-html-message';

                return (
                    <RawHtmlMessage
                        rawHtml={rawHtml}
                        messageId={messageId}
                        ophanComponentType={ophanComponentType}
                        submitComponentEvent={props.submitComponentEvent}
                        logButtonClickWithBraze={props.logButtonClickWithBraze}
                        trackClick={trackClick}
                    />
                );
            }

            // No component to render
            return null;
        }

        return <ComponentToRender {...augmentedProps} />;
    };

    return BrazeMessageComponent;
}
