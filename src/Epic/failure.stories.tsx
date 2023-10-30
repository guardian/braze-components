import React, { ReactElement } from 'react';
import { StorybookWrapper, mockFetchEmailFail } from '../utils/StorybookWrapper';
import { BrazeEndOfArticleComponent } from '../BrazeEndOfArticleComponent';
import { knobsData } from '../utils/knobsData';
import {
    buildEpicParagraphDocs,
    coreArgTypes,
    ophanComponentIdArgType,
} from '../storybookCommon/argTypes';
import { BrazeMessageProps } from '.';

const NUMBER_OF_PARAGRAPHS = 9;
const paragraphDocs = buildEpicParagraphDocs(NUMBER_OF_PARAGRAPHS);

export default {
    component: 'EpicFailure',
    title: 'Dev/EndOfArticle/EpicFailure',
    parameters: {},
    argTypes: {
        ...coreArgTypes,
        ...ophanComponentIdArgType,
        heading: {
            name: 'heading',
            type: { name: 'string', required: true },
            description: 'Header text',
        },
        ...Object.fromEntries(paragraphDocs),
        highlightedText: {
            name: 'highlightedText',
            type: { name: 'string' },
            description: 'Yellow highlighted text at end of final paragraph. Supports HTML.',
        },
        buttonText: {
            name: 'buttonText',
            type: { name: 'string', required: true },
            description: 'Button label text (Button 1 in Braze)',
        },
        buttonUrl: {
            name: 'buttonUrl',
            type: { name: 'string', required: true },
            description: 'Button link URL',
        },
        hidePaymentIcons: {
            name: 'hidePaymentIcons',
            type: { name: 'string', required: false },
            description: 'Set value to "true" to suppress the payment icons beneath the CTA',
        },
        reminderStage: {
            name: 'reminderStage',
            type: { name: 'string', required: false },
            description: 'The type of stage (PRE, POST, WINBACK)',
        },
        reminderOption: {
            name: 'reminderOption',
            type: { name: 'string', required: false },
            description: 'Extra data to be associated with a reminder sign-up',
        },
    },
};

const StoryTemplate = (
    args: BrazeMessageProps & { componentName: string },
): ReactElement | null => {
    const brazeMessageProps = {
        ophanComponentId: args.ophanComponentId,
        heading: args.heading,
        highlightedText: args.highlightedText,
        buttonText: args.buttonText,
        buttonUrl: args.buttonUrl,
        hidePaymentIcons: args.hidePaymentIcons,
        paragraph1: args.paragraph1,
        paragraph2: args.paragraph2,
        paragraph3: args.paragraph3,
        paragraph4: args.paragraph4,
        paragraph5: args.paragraph5,
        paragraph6: args.paragraph6,
        paragraph7: args.paragraph7,
        paragraph8: args.paragraph8,
        paragraph9: args.paragraph9,
        reminderStage: args.reminderStage,
        reminderOption: args.reminderOption,
    };

    knobsData.set({ ...brazeMessageProps, componentName: args.componentName });

    return (
        <StorybookWrapper>
            <BrazeEndOfArticleComponent
                brazeMessageProps={brazeMessageProps}
                componentName={args.componentName}
                subscribeToNewsletter={() => Promise.resolve()}
                fetchEmail={() => mockFetchEmailFail()}
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
    heading: 'Since you’re here...',
    paragraph1:
        '... we have a small favour to ask. More people, <a href="https://example.com">like you</a>, are reading and supporting the Guardian’s independent, investigative journalism than ever before. And unlike many news organisations, we made the choice to keep our reporting open for all, regardless of where they live or what they can afford to pay.',
    paragraph2:
        'The Guardian will engage with the most critical issues of our time – from the escalating climate catastrophe to widespread inequality to the influence of big tech on our lives. At a time when factual information is a necessity, we believe that each of us, around the world, deserves access to accurate reporting with integrity at its heart.',
    highlightedText:
        'Support <a href="https://example.com">The Guardian</a> from as little as %%CURRENCY_SYMBOL%%1 - and it only takes a minute. Thank you.',
    buttonText: 'Support The Guardian',
    buttonUrl: 'https://support.theguardian.com/contribute',
    hidePaymentIcons: '',
    ophanComponentId: 'example_ophan_component_id',
    slotName: 'EndOfArticle',
    componentName: 'Epic',
    reminderStage: 'PRE',
    reminderOption: 'recurring-contribution-upsell',
};

DefaultStory.story = { name: 'EpicFailure' };
