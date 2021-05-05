import React from 'react';
import { AppBanner } from '../AppBanner';
import type { OphanComponentEvent } from '@guardian/types';
import type { BrazeClickHandler } from '../utils/tracking';
import { BrazeComponent } from '../BrazeMessageComponent';

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    brazeMessageProps: {
        header?: string;
        body?: string;
    };
};

export const COMPONENT_NAME = 'SpecialEditionBanner';
const cta = 'Access it now in your Guardian Editions app';
const imageUrl =
    'https://i.guim.co.uk/img/media/c5323f4e7ee9b8fd532fea191b6cb1d69a070e62/0_0_930_520/930.png?quality=80&width=930&s=2a9c91520ce26e1e84e9c917b9132e94';

const SpecialEditionBanner: BrazeComponent<Props> = ({
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
SpecialEditionBanner.canRender = AppBanner.canRender;

export { SpecialEditionBanner };
