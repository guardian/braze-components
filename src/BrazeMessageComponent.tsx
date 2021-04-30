import React from 'react';
import { OphanComponentEvent } from '@guardian/types';
// import {
//     COMPONENT_NAME as DIGITAL_SUBSCRIBER_APP_BANNER_NAME,
//     DigitalSubscriberAppBanner,
// } from './DigitalSubscriberAppBanner';
import { COMPONENT_NAME as APP_BANNER_NAME, AppBanner } from './AppBanner';
// import {
//     COMPONENT_NAME as SPECIAL_EDITION_BANNER_NAME,
//     SpecialEditionBanner,
// } from './SpecialEditionBanner';
// import {
//     COMPONENT_NAME as THE_GUARDIAN_IN_2020_BANNER_NAME,
//     TheGuardianIn2020Banner,
// } from './TheGuardianIn2020Banner';
import { BrazeClickHandler } from './utils/tracking';

type BrazeMessageProps = {
    [key: string]: string | undefined;
};

type CommonComponentProps = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    brazeMessageProps: BrazeMessageProps;
};

export type BrazeComponent<P> = React.FC<P> & {
    canRender: (props: P) => boolean;
};

type ComponentMapping = {
    [key: string]: BrazeComponent<CommonComponentProps>;
};

const COMPONENT_MAPPINGS: ComponentMapping = {
    // [DIGITAL_SUBSCRIBER_APP_BANNER_NAME]: DigitalSubscriberAppBanner,
    [APP_BANNER_NAME]: AppBanner,
    // [SPECIAL_EDITION_BANNER_NAME]: SpecialEditionBanner,
    // [THE_GUARDIAN_IN_2020_BANNER_NAME]: TheGuardianIn2020Banner,
};

type Candidate = {
    componentName: string;
    brazeMessageProps: BrazeMessageProps;
};
export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    candidates: Candidate[];
};

export const buildBrazeMessageComponent = (mappings: ComponentMapping): React.FC<Props> => {
    const BrazeMessageComponent = (props: Props) => {
        const { logButtonClickWithBraze, submitComponentEvent, candidates } = props;

        const candidateToRender = candidates.find((candidate): boolean => {
            return Boolean(
                mappings[candidate.componentName] &&
                    mappings[candidate.componentName].canRender({
                        ...props,
                        brazeMessageProps: candidate.brazeMessageProps,
                    }),
            );
        });

        if (!candidateToRender) {
            return null;
        }

        const ComponentToRender = mappings[candidateToRender.componentName];

        return (
            <ComponentToRender
                logButtonClickWithBraze={logButtonClickWithBraze}
                submitComponentEvent={submitComponentEvent}
                brazeMessageProps={candidateToRender.brazeMessageProps}
            />
        );
    };

    return BrazeMessageComponent;
};

export const BrazeMessageComponent: React.FC<Props> = buildBrazeMessageComponent(
    COMPONENT_MAPPINGS,
);
