import React from 'react';
import { AppBanner } from '../AppBanner';
import type { OphanComponentEvent } from '@guardian/types';
import type { BrazeClickHandler } from '../utils/tracking';
import { COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    header?: string;
    body?: string;
};

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    brazeMessageProps: BrazeMessageProps;
};

const cta = 'Search for "Guardian live news"';
const imageUrl =
    'https://i.guim.co.uk/img/media/de6813b4dd9b9805a2d14dd6af14ae2b48e2e19e/0_0_930_520/930.png?width=930&quality=60&s=a7d81978655765847246c8d4d0cd0e7f';

export const DigitalSubscriberAppBanner: React.FC<Props> = ({
    logButtonClickWithBraze,
    submitComponentEvent,
    brazeMessageProps: { header, body },
}: Props) => (
    <AppBanner
        logButtonClickWithBraze={logButtonClickWithBraze}
        submitComponentEvent={submitComponentEvent}
        ophanComponentId={COMPONENT_NAME}
        brazeMessageProps={{
            header,
            body,
            cta,
            imageUrl,
        }}
    />
);
