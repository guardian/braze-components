import React, { ReactElement } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { BrazeEndOfArticleComponent } from '../BrazeEndOfArticleComponent';

export default {
    component: 'Epic',
    title: 'EndOfArticle/Epic',
    decorators: [withKnobs],
    parameters: {
        knobs: {
            escapeHTML: false,
        },
    },
};

const TOTAL_PARAGRAPHS = 9;
const defaultContent = {
    heading: 'Since you’re here...',
    paragraphs: [
        '... we have a small favour to ask. More people, <a href="https://example.com">like you</a>, are reading and supporting the Guardian’s independent, investigative journalism than ever before. And unlike many news organisations, we made the choice to keep our reporting open for all, regardless of where they live or what they can afford to pay.',
        'The Guardian will engage with the most critical issues of our time – from the escalating climate catastrophe to widespread inequality to the influence of big tech on our lives. At a time when factual information is a necessity, we believe that each of us, around the world, deserves access to accurate reporting with integrity at its heart.',
        'Our editorial independence means we set our own agenda and voice our own opinions. Guardian journalism is free from commercial and political bias and not influenced by billionaire owners or shareholders. This means we can give a voice to those less heard, explore where others turn away, and rigorously challenge those in power.',
        'We hope you will consider supporting us today. We need your support to keep delivering quality journalism that’s open and independent. Every reader contribution, however big or small, is so valuable. ',
    ],
    highlightedText:
        'Support <a href="https://example.com">The Guardian</a> from as little as %%CURRENCY_SYMBOL%%1 - and it only takes a minute. Thank you.',
    buttonText: 'Support The Guardian',
    buttonUrl: 'https://support.theguardian.com/contribute',
};

declare global {
    interface Window {
        guardian: Record<string, unknown>;
    }
}

export const defaultStory = (): ReactElement | null => {
    const slotName = text('slotName', 'EndOfArticle');
    const componentName = text('componentName', 'Epic');
    const ophanComponentId = text('ophanComponentId', 'example_ophan_component_id');
    const heading = text('heading', defaultContent.heading);
    const highlightedText = text('highlightedText', defaultContent.highlightedText);
    const buttonText = text('buttonText', defaultContent.buttonText);
    const buttonUrl = text('buttonUrl', defaultContent.buttonUrl);
    const paragraphMap: { [key: string]: string } = {};

    // Add existing paragraphs as knobs, and then pad out with empty knobs
    for (let i = 0; i < TOTAL_PARAGRAPHS; i++) {
        const name = `paragraph${i + 1}`;
        const currentParagraph = defaultContent.paragraphs[i];
        if (currentParagraph) {
            paragraphMap[name] = text(name, currentParagraph);
        } else {
            paragraphMap[name] = text(name, '');
        }
    }

    return (
        <StorybookWrapper>
            <BrazeEndOfArticleComponent
                brazeMessageProps={{
                    slotName,
                    ophanComponentId,
                    heading,
                    highlightedText,
                    buttonText,
                    buttonUrl,
                    ...paragraphMap,
                }}
                componentName={componentName}
                subscribeToNewsletter={() => Promise.resolve()}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Epic' };
