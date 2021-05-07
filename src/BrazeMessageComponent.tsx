import React from 'react';
import { OphanComponentEvent } from '@guardian/types';
import {
    COMPONENT_NAME as DIGITAL_SUBSCRIBER_APP_BANNER_NAME,
    DigitalSubscriberAppBanner,
} from './DigitalSubscriberAppBanner';
import {
    COMPONENT_NAME as APP_BANNER_NAME,
    AppBanner,
    canRender as appBannerCanRender,
} from './AppBanner';
import {
    COMPONENT_NAME as SPECIAL_EDITION_BANNER_NAME,
    SpecialEditionBanner,
} from './SpecialEditionBanner';
import {
    COMPONENT_NAME as THE_GUARDIAN_IN_2020_BANNER_NAME,
    TheGuardianIn2020Banner,
} from './TheGuardianIn2020Banner';
import { BrazeClickHandler } from './utils/tracking';

import type { Extras } from './logic/BrazeMessages';

type BrazeMessageProps = {
    [key: string]: string | undefined;
};

type CommonComponentProps = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    brazeMessageProps: BrazeMessageProps;
};

export type BrazeComponent<P> = React.FC<P> & {
    canRender: (brazeMessageProps: BrazeMessageProps) => boolean;
};

type ComponentMapping = {
    [key: string]: BrazeComponent<CommonComponentProps>;
};

const COMPONENT_MAPPINGS: ComponentMapping = {
    [DIGITAL_SUBSCRIBER_APP_BANNER_NAME]: DigitalSubscriberAppBanner,
    [APP_BANNER_NAME]: AppBanner,
    [SPECIAL_EDITION_BANNER_NAME]: SpecialEditionBanner,
    [THE_GUARDIAN_IN_2020_BANNER_NAME]: TheGuardianIn2020Banner,
};

const COMPONENT_CAN_RENDER_MAPPINGS: Record<
    string,
    (brazeMessageProps: BrazeMessageProps) => boolean
> = {
    [APP_BANNER_NAME]: appBannerCanRender,
};

export const canRenderBrazeMsg = (msgExtras: Extras | undefined): boolean => {
    if (!msgExtras) {
        return false;
    }
    if (!COMPONENT_CAN_RENDER_MAPPINGS[msgExtras.componentName]) {
        return false;
    }
    return COMPONENT_CAN_RENDER_MAPPINGS[msgExtras.componentName](msgExtras);
};

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    componentName: string;
    brazeMessageProps: BrazeMessageProps;
};

export const buildBrazeMessageComponent = (mappings: ComponentMapping): React.FC<Props> => {
    const BrazeMessageComponent = (props: Props) => {
        const {
            logButtonClickWithBraze,
            submitComponentEvent,
            brazeMessageProps,
            componentName,
        } = props;

        const ComponentToRender = mappings[componentName];

        if (!ComponentToRender) {
            return null;
        }

        return (
            <ComponentToRender
                logButtonClickWithBraze={logButtonClickWithBraze}
                submitComponentEvent={submitComponentEvent}
                brazeMessageProps={brazeMessageProps}
            />
        );
    };

    return BrazeMessageComponent;
};

export const BrazeMessageComponent = buildBrazeMessageComponent(COMPONENT_MAPPINGS);
