import React, { ReactElement } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Epic } from './index';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import type { EpicProps } from './index';
import { knobsData } from '../utils/knobsData';

export default {
    component: 'Epic',
    title: 'Components/Epic',
    decorators: [withKnobs],
    parameters: {
        knobs: {
            escapeHTML: false, // Block HTML escaping, preventing double-escaping of imgUrl special characters in Storybook
        },
    },
};

type DataFromKnobs = {
    heading: string;
    highlightedText: string;
    buttonText: string;
    buttonUrl: string;
    paragraphs: Array<string>;
    slotName?: string;
    componentName?: string;
};

const TOTAL_PARAGRAPHS = 9;

const content = {
    heading: 'Since you’re here...',
    paragraphs: [
        '... we have a small favour to ask. More people, like you, are reading and supporting the Guardian’s independent, investigative journalism than ever before. And unlike many news organisations, we made the choice to keep our reporting open for all, regardless of where they live or what they can afford to pay.',
        'The Guardian will engage with the most critical issues of our time – from the escalating climate catastrophe to widespread inequality to the influence of big tech on our lives. At a time when factual information is a necessity, we believe that each of us, around the world, deserves access to accurate reporting with integrity at its heart.',
        'Our editorial independence means we set our own agenda and voice our own opinions. Guardian journalism is free from commercial and political bias and not influenced by billionaire owners or shareholders. This means we can give a voice to those less heard, explore where others turn away, and rigorously challenge those in power.',
        'We hope you will consider supporting us today. We need your support to keep delivering quality journalism that’s open and independent. Every reader contribution, however big or small, is so valuable. ',
    ],
    highlightedText:
        'Support The Guardian from as little as %%CURRENCY_SYMBOL%%1 - and it only takes a minute. Thank you.',
    buttonText: 'Support The Guardian',
    buttonUrl: 'https://support.theguardian.com/contribute',
};

const buildProps = (data: DataFromKnobs): EpicProps => {
    return {
        variant: {
            heading: data.heading,
            paragraphs: data.paragraphs,
            highlightedText: data.highlightedText,
            cta: {
                text: data.buttonText,
                baseUrl: data.buttonUrl,
            },
        },
        tracking: {},
    };
};

export const defaultStory = (): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const slotName = text('slotName', 'Epic');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const componentName = text('componentName', 'Epic');
    const heading = text('heading', content.heading);
    const highlightedText = text('highlightedText', content.highlightedText);
    const buttonText = text('buttonText', content.buttonText);
    const buttonUrl = text('buttonUrl', content.buttonUrl);
    const paragraphs = [];

    // Add existing paragraphs as knobs, and then pad out with empty knobs
    for (let i = 0; i < TOTAL_PARAGRAPHS; i++) {
        const name = `paragraph${i + 1}`;
        if (content.paragraphs[i]) {
            paragraphs.push(text(name, content.paragraphs[i]));
        } else {
            paragraphs.push(text(name, ''));
        }
    }

    const epicProps = buildProps({
        heading,
        highlightedText,
        buttonText,
        buttonUrl,
        paragraphs: paragraphs.filter((p) => p != ''),
        slotName,
        componentName,
    });

    // This is to make the data available to the guPreview add-on:
    knobsData.set({ ...epicProps });

    return (
        <StorybookWrapper>
            <Epic {...epicProps}></Epic>
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Epic' };
