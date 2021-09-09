import React, { ReactElement } from 'react';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { BrazeEndOfArticleComponent } from '../BrazeEndOfArticleComponent';
import { knobsData } from '../utils/knobsData';
import { coreArgTypes } from '../storybookCommon/argTypes';

export default {
    component: 'Epic',
    title: 'EndOfArticle/Epic',
    parameters: {},
    argTypes: {
        ...coreArgTypes,
        heading: {
            name: 'heading',
            type: { name: 'string', required: true },
            description: 'Header text',
        },
        paragraph1: {
            name: 'paragraph1',
            type: { name: 'string', required: true },
            description: 'First paragraph',
        },
        paragraph2: {
            name: 'paragraph2',
            type: { name: 'string' },
            description: 'Second paragraph',
        },
        paragraph3: {
            name: 'paragraph3',
            type: { name: 'string' },
            description: 'Third paragraph',
        },
        paragraph4: {
            name: 'paragraph4',
            type: { name: 'string' },
            description: 'Fourth paragraph',
        },
        paragraph5: {
            name: 'paragraph5',
            type: { name: 'string' },
            description: 'Fifth paragraph',
        },
        paragraph6: {
            name: 'paragraph6',
            type: { name: 'string' },
            description: 'Sixth paragraph',
        },
        paragraph7: {
            name: 'paragraph7',
            type: { name: 'string' },
            description: 'Seventh paragraph',
        },
        paragraph8: {
            name: 'paragraph8',
            type: { name: 'string' },
            description: 'Eighth paragraph',
        },
        paragraph9: {
            name: 'paragraph9',
            type: { name: 'string' },
            description: 'Ninth paragraph',
        },
        highlightedText: {
            name: 'highlightedText',
            type: { name: 'string' },
            description: 'Yellow highlighted text at end of final paragraph. Supports HTML.',
        },
        buttonText: {
            name: 'buttonText',
            type: { name: 'string', required: true },
            description: 'Button label text',
        },
        buttonUrl: {
            name: 'buttonUrl',
            type: { name: 'string', required: true },
            description:
                'Destination link for the button. See Braze user guide for tracking params.',
        },
        ophanComponentId: {
            name: 'ophanComponentId',
            type: { name: 'string', required: true },
            description: 'The component ID sent to Ophan for tracking',
        },
    },
};

declare global {
    interface Window {
        guardian: Record<string, unknown>;
    }
}

const StoryTemplate = (args): ReactElement | null => {
    const brazeMessageProps = {
        slotName: args.slotName,
        ophanComponentId: args.ophanComponentId,
        heading: args.heading,
        highlightedText: args.highlightedText,
        buttonText: args.buttonText,
        buttonUrl: args.buttonUrl,
        paragraph1: args.paragraph1,
        paragraph2: args.paragraph2,
        paragraph3: args.paragraph3,
        paragraph4: args.paragraph4,
        paragraph5: args.paragraph5,
        paragraph6: args.paragraph6,
        paragraph7: args.paragraph7,
        paragraph8: args.paragraph8,
        paragraph9: args.paragraph9,
    };

    knobsData.set({ ...brazeMessageProps, componentName: args.componentName });

    return (
        <StorybookWrapper>
            <BrazeEndOfArticleComponent
                brazeMessageProps={brazeMessageProps}
                componentName={args.componentName}
                subscribeToNewsletter={() => Promise.resolve()}
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
    paragraph3:
        'Our editorial independence means we set our own agenda and voice our own opinions. Guardian journalism is free from commercial and political bias and not influenced by billionaire owners or shareholders. This means we can give a voice to those less heard, explore where others turn away, and rigorously challenge those in power.',
    paragraph4:
        'We hope you will consider supporting us today. We need your support to keep delivering quality journalism that’s open and independent. Every reader contribution, however big or small, is so valuable. ',
    highlightedText:
        'Support <a href="https://example.com">The Guardian</a> from as little as %%CURRENCY_SYMBOL%%1 - and it only takes a minute. Thank you.',
    buttonText: 'Support The Guardian',
    buttonUrl: 'https://support.theguardian.com/contribute',
    ophanComponentId: 'example_ophan_component_id',
    slotName: 'EndOfArticle',
    componentName: 'Epic',
};

DefaultStory.story = { name: 'Epic' };
