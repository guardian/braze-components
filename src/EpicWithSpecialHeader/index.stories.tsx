import React, { ReactElement } from 'react';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { BrazeEndOfArticleComponent } from '../BrazeEndOfArticleComponent';
import { knobsData } from '../utils/knobsData';
import {
    coreArgTypes,
    ophanComponentIdArgType,
    buildEpicParagraphDocs,
    pageContextArgTypes,
} from '../storybookCommon/argTypes';
import { BrazeMessageProps } from '../Epic';

const NUMBER_OF_PARAGRAPHS = 9;
const paragraphDocs = buildEpicParagraphDocs(NUMBER_OF_PARAGRAPHS);

export default {
    component: 'EpicWithSpecialHeader',
    title: 'EndOfArticle/EpicWithSpecialHeader',
    argTypes: {
        ...coreArgTypes,
        ...ophanComponentIdArgType,
        ...pageContextArgTypes,
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
            description: 'Button label text',
        },
        buttonUrl: {
            name: 'buttonUrl',
            type: { name: 'string', required: true },
            description:
                'Destination link for the button. See Braze user guide for tracking params.',
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
    componentName: 'EpicWithSpecialHeader',
};

DefaultStory.story = { name: 'EpicWithSpecialHeader' };
