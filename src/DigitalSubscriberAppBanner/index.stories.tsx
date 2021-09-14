import React, { ReactElement } from 'react';
import { BrazeBannerComponent } from '../BrazeBannerComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import { BrazeMessageProps } from '.';
import { coreArgTypes } from '../storybookCommon/argTypes';

export default {
    component: 'DigitalSubscriberAppBanner',
    title: 'Banner/DigitalSubscriberAppBanner',
    argTypes: {
        ...coreArgTypes,
        header: {
            name: 'header',
            type: { name: 'string', required: true },
            description: 'Header text',
        },
        body: {
            name: 'body',
            type: { name: 'string', required: true },
            description: 'Body text',
        },
    },
};

const StoryTemplate = (args: BrazeMessageProps & { componentName: string }): ReactElement => {
    const brazeMessageProps = {
        header: args.header,
        body: args.body,
    };

    // This is to make the data available to the guPreview add-on:
    knobsData.set({ ...brazeMessageProps, componentName: args.componentName });

    return (
        <StorybookWrapper>
            <BrazeBannerComponent
                componentName={args.componentName}
                logButtonClickWithBraze={(internalButtonId) => {
                    console.log(`Button with internal ID ${internalButtonId} clicked`);
                }}
                submitComponentEvent={(componentEvent) => {
                    console.log('submitComponentEvent called with: ', componentEvent);
                }}
                brazeMessageProps={brazeMessageProps}
            />
        </StorybookWrapper>
    );
};

export const DefaultStory = StoryTemplate.bind({});

DefaultStory.args = {
    slotName: 'Banner',
    header: 'A note to our digital subscribers',
    body: 'Hi John, did you know that as a Guardian digital subscriber you can enjoy an enhanced experience of our quality, independent journalism on all your devices, including The Guardian Live app.',
    componentName: 'DigitalSubscriberAppBanner',
};

DefaultStory.story = { name: 'DigitalSubscriberAppBanner' };
