import React from 'react';
import { OphanComponentEvent } from '@guardian/types';
import {
	COMPONENT_NAME as DIGITAL_SUBSCRIBER_APP_BANNER_NAME,
	DigitalSubscriberAppBanner,
} from './DigitalSubscriberAppBanner';
import { COMPONENT_NAME as APP_BANNER_NAME, AppBanner } from './AppBanner';
import {
	COMPONENT_NAME as SPECIAL_EDITION_BANNER_NAME,
	SpecialEditionBanner,
} from './SpecialEditionBanner';
import {
	COMPONENT_NAME as THE_GUARDIAN_IN_2020_BANNER_NAME,
	TheGuardianIn2020Banner,
} from './TheGuardianIn2020Banner';
import { BrazeClickHandler } from './utils/tracking';

type BrazeMessageProps = {
	[key: string]: string | undefined;
};

type CommonComponentProps = {
	logButtonClickWithBraze: BrazeClickHandler;
	submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
	brazeMessageProps: BrazeMessageProps;
};

type ComponentMapping = {
	[key: string]: React.FC<CommonComponentProps>;
};

const COMPONENT_MAPPINGS: ComponentMapping = {
	[DIGITAL_SUBSCRIBER_APP_BANNER_NAME]: DigitalSubscriberAppBanner,
	[APP_BANNER_NAME]: AppBanner,
	[SPECIAL_EDITION_BANNER_NAME]: SpecialEditionBanner,
	[THE_GUARDIAN_IN_2020_BANNER_NAME]: TheGuardianIn2020Banner,
};

export type Props = {
	logButtonClickWithBraze: BrazeClickHandler;
	submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
	componentName: string;
	brazeMessageProps: BrazeMessageProps;
};

export const buildBrazeMessageComponent = (
	mappings: ComponentMapping,
): React.FC<Props> => {
	const BrazeMessageComponent = ({
		logButtonClickWithBraze,
		submitComponentEvent,
		componentName,
		brazeMessageProps,
	}: Props) => {
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

export const BrazeMessage: React.FC<Props> = buildBrazeMessageComponent(
	COMPONENT_MAPPINGS,
);
