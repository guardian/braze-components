import React, { ReactElement, useEffect, useState } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import * as emotion from 'emotion';
import * as emotionCore from '@emotion/core';
import * as emotionTheming from 'emotion-theming';

const css = emotionCore.css;

export default {
    component: 'Epic',
    title: 'Components/Epic',
    decorators: [withKnobs],
    parameters: {
        knobs: {},
    },
};

const componentUrl = `https://contributions.guardianapis.com/modules/v1/epics/ContributionsEpic.js`;
const epicWrapper = css`
    box-sizing: border-box;
    width: 100%;
    max-width: 620px;
    margin: 10px;
`;
const TOTAL_PARAGRAPHS = 9;
const defaultContent = {
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

declare global {
    interface Window {
        guardian: Record<string, unknown>;
    }
}

type EpicProps = {
    variant: Variant;
    tracking: Record<string, unknown>;
};

type Variant = {
    heading: string;
    paragraphs: Array<string>;
    highlightedText: string;
    cta: {
        text: string;
        baseUrl: string;
    };
};

type DataFromKnobs = {
    heading: string;
    highlightedText: string;
    buttonText: string;
    buttonUrl: string;
    paragraphs: Array<string>;
    slotName?: string;
    componentName?: string;
    ophanComponentId: string;
};

const Epic: React.FC<EpicProps> = (props) => {
    const [EpicInner, setEpicInner] = useState<React.FC<EpicProps>>();
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
                setEpicInner(() => epicModule.ContributionsEpic);
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(`epic - error is: ${error}`));
    }, []);

    if (EpicInner) {
        return (
            <div css={epicWrapper}>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <EpicInner {...props} />
            </div>
        );
    }

    return null;
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

const guPreviewOutput = (data: DataFromKnobs) => {
    return Object.assign(
        {},
        {
            heading: data.heading,
            highlightedText: data.highlightedText,
            buttonText: data.buttonText,
            buttonUrl: data.buttonUrl,
            componentName: data.componentName,
            slotName: data.slotName,
            ophanComponentId: data.ophanComponentId,
        },
        ...data.paragraphs.map((p, i) => {
            return { [`paragraph${i}`]: p };
        }),
    );
};

const componentMappings = {
    Epic: Epic,
};

const NullComponent = () => null;

const getComponentfromName = (name: string) => {
    return componentMappings[name] || NullComponent;
};

export const defaultStory = (): ReactElement => {
    const slotName = text('slotName', 'EndOfArticle');
    const componentName = text('componentName', 'Epic');
    const ophanComponentId = text('ophanComponentId', 'example_ophan_component_id');
    const heading = text('heading', defaultContent.heading);
    const highlightedText = text('highlightedText', defaultContent.highlightedText);
    const buttonText = text('buttonText', defaultContent.buttonText);
    const buttonUrl = text('buttonUrl', defaultContent.buttonUrl);
    const paragraphs = [];

    // Add existing paragraphs as knobs, and then pad out with empty knobs
    for (let i = 0; i < TOTAL_PARAGRAPHS; i++) {
        const name = `paragraph${i + 1}`;
        const currentParagraph = defaultContent.paragraphs[i];
        if (currentParagraph) {
            paragraphs.push(text(name, currentParagraph));
        } else {
            paragraphs.push(text(name, ''));
        }
    }

    const knobs = {
        heading,
        highlightedText,
        buttonText,
        buttonUrl,
        paragraphs: paragraphs.filter((p) => p != ''),
        slotName,
        componentName,
        ophanComponentId,
    };

    const epicProps = buildProps(knobs);

    // This is to make the data available to the guPreview add-on:
    knobsData.set(guPreviewOutput(knobs));

    // It is unfortunate that here we're duplicating the checks that we do
    // on-platform before rendering the Braze epic. This should be addressed
    // properly, but in the meantime I'm keen to have Storybook reflect the
    // platform behaviour so this doesn't cause confusion for marketing.
    if (!buttonText || !buttonUrl || !ophanComponentId || paragraphs.length < 1) {
        return null;
    }

    const Component = getComponentfromName(componentName);

    return (
        <StorybookWrapper>
            <Component {...epicProps} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Epic' };
