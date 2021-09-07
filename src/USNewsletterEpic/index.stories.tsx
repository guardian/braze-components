import React, { ReactElement } from 'react';
import { BrazeEndOfArticleComponent } from '../BrazeEndOfArticleComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { withKnobs, text } from '@storybook/addon-knobs';
import { knobsData } from '../utils/knobsData';

export default {
    component: 'USNewsletterEpic',
    title: 'EndOfArticle/USNewsletterEpic',
    decorators: [
        withKnobs({
            escapeHTML: false,
        }),
    ],
    parameters: {},
};

export const defaultStory = (): ReactElement | null => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const slotName = text('slotName', 'EndOfArticle');
    const header = text('header', 'First Thing');
    const frequency = text('frequency', 'Daily');
    const paragraph1 = text(
        'paragraph1',
        'Start your day with a global perspective on America. Get the Guardian’s top stories and must reads in one hit – every weekday.',
    );
    const paragraph2 = text(
        'paragraph2',
        'We thought you should know this newsletter may contain information about Guardian products and services.',
    );
    const componentName = text('componentName', 'USNewsletterEpic');
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

defaultStory.storyName = 'USNewsletterEpic';
