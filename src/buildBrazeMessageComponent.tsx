import React from 'react';
import type { BrazeClickHandler, SubmitComponentEvent, TrackClick } from './utils/tracking';
import { buildTrackClick, OphanComponentType } from './utils/tracking';

interface HasComponentName {
    componentName: string;
}

interface HasClickTrackingCallbacks {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: SubmitComponentEvent;
}

export interface HasConsolidatedTrackClick {
    trackClick: TrackClick;
}

export type ComponentMapping<A> = {
    [key: string]: React.FC<A>;
};

// We know in here that we have access to logButtonClickWithBraze and
// submitComponentEvent (using the HasClickTrackingCallbacks interface). So,
// we're able to consolidate these into a single trackClick callback in the
// underlying component(s), as specified by the HasConsolidatedTrackClick
// interface.
export function buildBrazeMessageComponent<A extends HasComponentName & HasClickTrackingCallbacks>(
    ophanComponentType: OphanComponentType,
    mappings: ComponentMapping<A & HasConsolidatedTrackClick>,
): React.FC<A> {
    const BrazeMessageComponent = (props: A) => {
        console.log('HELLO #1');
        const ComponentToRender = mappings[props.componentName];
        console.log('HELLO #2');

        if (!ComponentToRender) {
            return null;
        }
        console.log('HELLO #3');

        const trackClick = buildTrackClick({
            submitComponentEvent: props.submitComponentEvent,
            logButtonClickWithBraze: props.logButtonClickWithBraze,
            ophanComponentType,
        });
        console.log('HELLO #4');

        const augmentedProps = {
            ...props,
            trackClick,
        };
        console.log('HELLO #5');

        return <ComponentToRender {...augmentedProps} />;
    };

    return BrazeMessageComponent;
}
