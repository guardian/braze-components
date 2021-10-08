import React, { ReactElement } from 'react';
import { BrazeBannerComponent } from '../BrazeBannerComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import { coreArgTypes, pageContextArgTypes } from '../storybookCommon/argTypes';
import { BrazeMessageProps } from '.';

export default {
    component: 'TheGuardianIn2020Banner',
    title: 'Banner/TheGuardianIn2020Banner',
    argTypes: {
        ...coreArgTypes,
        ...pageContextArgTypes,
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
    header: 'The Guardian’s impact in 2020',
    body: 'Thanks to your generous support in this extraordinary year, our open, independent journalism was read by millions. From the pandemic to our urgent coverage of the climate crisis, Black Lives Matter protests and the US election, our reporting had a powerful impact.',
    componentName: 'TheGuardianIn2020Banner',
};

DefaultStory.story = { name: 'TheGuardianIn2020Banner' };
