import React, { ReactElement } from 'react';
import { BrazeMessageComponent } from '../BrazeMessageComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
    component: 'USNewsletterEpic',
    title: 'EndOfArticle/USNewsletterEpic',
    decorators: [withKnobs],
    parameters: {},
};

export const defaultStory = (): ReactElement | null => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const slotName = text('slotName', 'EndOfArticle');
    const header = text('header', 'First Thing');
    const frequency = text('frequency', 'Daily');
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
                }}
            />
        </StorybookWrapper>
    );
};

defaultStory.storyName = 'USNewsletterEpic';
