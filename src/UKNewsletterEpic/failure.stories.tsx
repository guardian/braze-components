import React, { ReactElement } from 'react';
import { BrazeEndOfArticleComponent } from '../BrazeEndOfArticleComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
    component: 'UKNewsletterEpicFailure',
    title: 'Dev/EndOfArticle/UKNewsletterEpicFailure',
    decorators: [withKnobs({ escapeHTML: false })],
    parameters: {},
};

export const defaultStory = (): ReactElement | null => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const slotName = text('slotName', 'EndOfArticle');
    const header = text('header', `The Morning Briefing `);
    const frequency = text('frequency', 'Every day');
    const paragraph1 = text(
        'paragraph1',
        'Whether it’s the latest manoeuvring in global politics or the ‘and finally’ story that everyone’s talking about, you’ll be bang up to date with the news that counts.',
    );
    const paragraph2 = text(
        'paragraph2',
        'We thought you should know this newsletter may contain information about Guardian products and services.',
    );
    const componentName = text('componentName', 'UKNewsletterEpic');
    const ophanComponentId = text('ophanComponentId', 'example_ophan_component_id');
    const simulateFailure = boolean('Simulate Subscribe Failure', true);

    return (
        <StorybookWrapper>
            <BrazeEndOfArticleComponent
                componentName={componentName}
                brazeMessageProps={{
                    header,
                    frequency,
                    paragraph1,
                    paragraph2,
                    ophanComponentId,
                }}
                subscribeToNewsletter={(newsletterId) => {
                    console.log(`subscribeToNewsletter invoked with id ${newsletterId}`);
                    return new Promise((resolve, reject) =>
                        setTimeout(() => (simulateFailure ? reject() : resolve()), 1000),
                    );
                }}
            />
        </StorybookWrapper>
    );
};

defaultStory.storyName = 'UKNewsletterEpicFailure';
