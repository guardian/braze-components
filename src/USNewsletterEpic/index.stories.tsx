import React, { ReactElement } from 'react';
import { BrazeMessageComponent } from '../BrazeMessageComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
    component: 'USNewsletterEpic',
    title: 'WorkInProgress/EndOfArticle/USNewsletterEpic',
    decorators: [withKnobs],
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

    return (
        <StorybookWrapper>
            <BrazeMessageComponent
                componentName={componentName}
                logButtonClickWithBraze={(internalButtonId) => {
                    console.log(`Button with internal ID ${internalButtonId} clicked`);
                }}
                submitComponentEvent={(componentEvent) => {
                    console.log('submitComponentEvent called with: ', componentEvent);
                }}
                brazeMessageProps={{
                    header,
                    frequency,
                    paragraph1,
                    paragraph2,
                }}
            />
        </StorybookWrapper>
    );
};

defaultStory.storyName = 'USNewsletterEpic';
