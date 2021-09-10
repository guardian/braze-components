import React from 'react';
import { AppBanner } from '../AppBanner';
import type { OphanComponentEvent } from '@guardian/types';
import type { BrazeClickHandler } from '../utils/tracking';
import { COMPONENT_NAME, canRender } from './canRender';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    header?: string;
    body?: string;
};

type ValidatedBrazeMessageProps = {
    header: string;
    body: string;
};

type PlatformProps = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
};

export type Props = PlatformProps & {
    brazeMessageProps: BrazeMessageProps;
};

type InnerProps = PlatformProps & ValidatedBrazeMessageProps;

const cta = 'Search for "Guardian live news"';
const imageUrl =
    'https://i.guim.co.uk/img/media/de6813b4dd9b9805a2d14dd6af14ae2b48e2e19e/0_0_930_520/930.png?width=930&quality=60&s=a7d81978655765847246c8d4d0cd0e7f';

export const DigitalSubscriberAppBanner: React.FC<Props> = ({
    logButtonClickWithBraze,
    submitComponentEvent,
    brazeMessageProps,
}: Props) => {
    if (!canRender(brazeMessageProps)) {
        return null;
    }

    return (
        <DigitalSubscriberAppBannerValidated
            logButtonClickWithBraze={logButtonClickWithBraze}
            submitComponentEvent={submitComponentEvent}
            {...(brazeMessageProps as ValidatedBrazeMessageProps)}
        />
    );
};

export const DigitalSubscriberAppBannerValidated: React.FC<InnerProps> = ({
    logButtonClickWithBraze,
    submitComponentEvent,
    header,
    body,
}: InnerProps) => (
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
