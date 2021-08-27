import React, { ReactElement } from 'react';
import { BrazeEndOfArticleComponent } from '../BrazeEndOfArticleComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { withKnobs, text } from '@storybook/addon-knobs';
import { knobsData } from '../utils/knobsData';

export default {
    component: 'AUNewsletterEpic',
    title: 'WorkInProgress/EndOfArticle/AUNewsletterEpic',
    decorators: [withKnobs({ escapeHTML: false })],
    parameters: {},
};

export const defaultStory = (): ReactElement | null => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const slotName = text('slotName', 'EndOfArticle');
    const header = text('header', `Guardian Australia's Morning Mail`);
    const frequency = text('frequency', 'Every weekday');
    const paragraph1 = text(
        'paragraph1',
        'Get early morning news from Guardian Australia straight to your inbox.',
    );
    const paragraph2 = text(
        'paragraph2',
        'We thought you should know this newsletter may contain information about Guardian products and services.',
    );
    const componentName = text('componentName', 'AUNewsletterEpic');
    const ophanComponentId = text('ophanComponentId', 'example_ophan_component_id');

    const brazeMessageProps = {
        header,
        frequency,
        paragraph1,
        paragraph2,
        ophanComponentId,
    };

    knobsData.set({ ...brazeMessageProps, componentName });

    return (
        <StorybookWrapper>
            <BrazeEndOfArticleComponent
                componentName={componentName}
                brazeMessageProps={brazeMessageProps}
                subscribeToNewsletter={(newsletterId) => {
                    console.log(`subscribeToNewsletter invoked with id ${newsletterId}`);
                    return new Promise((resolve) => setTimeout(() => resolve(), 1000));
                }}
            />
        </StorybookWrapper>
    );
};

defaultStory.storyName = 'AUNewsletterEpic';
