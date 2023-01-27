import React, { ReactElement } from 'react';
import { BrazeEndOfArticleComponent } from '../BrazeEndOfArticleComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import { coreArgTypes } from '../storybookCommon/argTypes';
import type { BrazeMessageProps } from '.';

export default {
    component: 'UKNewsletterEpicFailure',
    title: 'Dev/EndOfArticle/UKNewsletterEpicFailure',
    parameters: {},
    argTypes: {
        ...coreArgTypes,
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
        ophanComponentId: {
            name: 'ophanComponentId',
            type: { name: 'string', required: true },
            description: 'The component ID sent to Ophan for tracking',
        },
        simulateFailure: {
            name: 'simulate failure?',
            type: { name: 'boolean' },
            description: 'Whether to simulate a newsletter subscribe failure',
        },
    },
};

const StoryTemplate = (
    args: BrazeMessageProps & { simulateFailure: boolean; componentName: string },
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
                    return new Promise((resolve, reject) =>
                        setTimeout(() => (args.simulateFailure ? reject() : resolve()), 1000),
                    );
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
    header: 'The Morning Briefing',
    frequency: 'Every day',
    paragraph1:
        'Whether it’s the latest manoeuvring in global politics or the ‘and finally’ story that everyone’s talking about, you’ll be bang up to date with the news that counts.',
    paragraph2:
        'We thought you should know this newsletter may contain information about Guardian products and services.',
    componentName: 'UKNewsletterEpic',
    ophanComponentId: 'example_ophan_component_id',
    simulateFailure: true,
};

DefaultStory.storyName = 'UKNewsletterEpicFailure';
