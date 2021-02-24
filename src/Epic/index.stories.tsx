import React, { useEffect, useState, ReactElement } from 'react';
import * as emotion from '@emotion/react';
import * as emotionCore from '@emotion/core';
import { css } from '@emotion/core';
import * as emotionTheming from 'emotion-theming';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Epic } from './index';
import { StorybookWrapper } from '../utils/StorybookWrapper';
// import { knobsData } from '../utils/knobsData';

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

declare global {
    interface Window {
        guardian: Record<string, unknown>;
    }
}

const TOTAL_PARAGRAPHS = 9;

type DataFromKnobs = {
    // componentName?: string;
    heading?: string;
    highlightedText?: string;
    buttonText?: string;
    buttonUrl?: string;
    paragraphs?: Array<string>;
};

type EpicProps = {
    variant: Variant;
    tracking: Tracking;
    // numArticles: number;
};

type Variant = {
    // name: string;
    heading: string;
    paragraphs: Array<string>;
    highlightedText: string;
    cta: {
        text: string;
        baseUrl: string;
    };
};

type Tracking = {
    // ophanPageId: string;
    // platformId: string;
    // clientName: string;
    // referrerUrl: string;
};

const componentUrl = `https://contributions.code.dev-guardianapis.com/epic.js`;

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
const epicWrapper = css`
    box-sizing: border-box;
    width: 100%;
    max-width: 620px;
    margin: 10px;
`;

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
        tracking: {
            // ophanPageId: '',
            // platformId: '',
            // clientName: '',
            // referrerUrl: 'https://www.theguardian.com',
        },
    };
};

export const defaultStory = (): ReactElement => {
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

    const [Epic, setEpic] = useState<React.FC<EpicProps>>();
    useEffect(() => {
        window.guardian = {};
        window.guardian.automat = {
            react: React,
            preact: React,
            emotionCore,
            emotionTheming,
            emotion,
        };
        import(/*webpackIgnore: true*/ componentUrl)
            .then((epicModule: { ContributionsEpic: React.FC<EpicProps> }) => {
                setEpic(() => epicModule.ContributionsEpic);
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(`epic - error is: ${error}`));
    }, []);

    const props = buildProps({
        heading,
        highlightedText,
        buttonText,
        buttonUrl,
        paragraphs: paragraphs.filter((p) => p != ''),
    });

    if (Epic) {
        return (
            <StorybookWrapper>
                <div css={epicWrapper}>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <Epic {...props} />
                </div>
            </StorybookWrapper>
        );
    }

    return null;
};

defaultStory.story = { name: 'Epic' };
