import React from 'react';
import { DigitalSubscriberAppBanner } from './DigitalSubscriberAppBanner';

type BrazeMessageProps = {
    [key: string]: string | undefined;
};

type CommonComponentProps = {
    onButtonClick: (buttonIndex: number) => void;
    brazeMessageProps: BrazeMessageProps;
};

type ComponentMapping = {
    [key: string]: React.FC<CommonComponentProps>;
};

const COMPONENT_MAPPINGS: ComponentMapping = {
    DigitalSubscriberAppBanner,
};

export type Props = {
    onButtonClick: (buttonIndex: number) => void;
    componentName: string;
    brazeMessageProps: BrazeMessageProps;
};

export const buildBrazeMessageComponent = (mappings: ComponentMapping): React.FC<Props> => {
    const BrazeMessageComponent = ({ onButtonClick, componentName, brazeMessageProps }: Props) => {
        const ComponentToRender = mappings[componentName];

        if (!ComponentToRender) {
            return null;
        }

        return (
            <ComponentToRender
                onButtonClick={onButtonClick}
                brazeMessageProps={brazeMessageProps}
            />
        );
    };

    return BrazeMessageComponent;
};

export const BrazeMessage: React.FC<Props> = buildBrazeMessageComponent(COMPONENT_MAPPINGS);
