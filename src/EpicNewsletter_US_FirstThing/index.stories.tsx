import React, { ReactElement } from 'react';
import { BrazeEndOfArticleComponent } from '../BrazeEndOfArticleComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import { coreArgTypes, ophanComponentIdArgType } from '../storybookCommon/argTypes';
import type { BrazeMessageProps } from '.';

export default {
    component: 'EpicNewsletter_US_FirstThing',
    title: 'EndOfArticle/EpicNewsletter_US_FirstThing',
    parameters: {},
    argTypes: {
        ...coreArgTypes,
        ...ophanComponentIdArgType,
        header: {
            name: 'header',
            type: { name: 'string', required: true },
            description: 'Header text',
        },
        frequency: {
            name: 'frequency',
            type: { name: 'string', required: true },
            description: 'Text description of how often the email is sent',
        },
        paragraph1: {
            name: 'paragraph1',
            type: { name: 'string', required: true },
            description: 'First paragraph',
        },
        paragraph2: {
            name: 'paragraph2',
            type: { name: 'string', required: false },
            description: 'Second paragraph',
        },
    },
};

const StoryTemplate = (
    args: BrazeMessageProps & { componentName: string },
): ReactElement | null => {
    const brazeMessageProps = {
        header: args.header,
        frequency: args.frequency,
        paragraph1: args.paragraph1,
        paragraph2: args.paragraph2,
        ophanComponentId: args.ophanComponentId,
    };

    knobsData.set({ ...brazeMessageProps, componentName: args.componentName });

    return (
        <StorybookWrapper>
            <BrazeEndOfArticleComponent
                componentName={args.componentName}
                brazeMessageProps={brazeMessageProps}
                subscribeToNewsletter={(newsletterId) => {
                    console.log(`subscribeToNewsletter invoked with id ${newsletterId}`);
                    return new Promise((resolve) => setTimeout(() => resolve(), 1000));
                }}
                logButtonClickWithBraze={(internalButtonId) => {
                    console.log(`Button with internal ID ${internalButtonId} clicked`);
                }}
                submitComponentEvent={(componentEvent) => {
                    console.log('submitComponentEvent called with: ', componentEvent);
                }}
            />
        </StorybookWrapper>
    );
};

export const DefaultStory = StoryTemplate.bind({});

DefaultStory.args = {
    slotName: 'EndOfArticle',
    header: 'Sign up for First Thing',
    frequency: 'Every weekday',
    paragraph1:
        'Our US morning briefing breaks down the key stories of the day, telling you what’s happening and why it matters.',
    paragraph2:
        'We thought you should know this newsletter may contain information about Guardian products and services.',
    componentName: 'EpicNewsletter_US_FirstThing',
    ophanComponentId: 'example_ophan_component_id',
};

DefaultStory.storyName = 'EpicNewsletter_US_FirstThing';
