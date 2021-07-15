import React, { ReactElement } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { BrazeBannerComponent } from '../BrazeMessageComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';

export default {
    component: 'TheGuardianIn2020Banner',
    title: 'Banner/TheGuardianIn2020Banner',
    decorators: [withKnobs],
    parameters: {
        knobs: {
            escapeHTML: false, // Block HTML escaping, preventing double-escaping of imgUrl special characters in Storybook
        },
    },
};

export const defaultStory = (): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const slotName = text('slotName', 'Banner');
    const header = text('header', 'The Guardian’s impact in 2020');
    const body = text(
        'body',
        'Thanks to your generous support in this extraordinary year, our open, independent journalism was read by millions. From the pandemic to our urgent coverage of the climate crisis, Black Lives Matter protests and the US election, our reporting had a powerful impact.',
    );
    const componentName = text('componentName', 'TheGuardianIn2020Banner');

    // This is to make the data available to the guPreview add-on:
    knobsData.set({ header, body, componentName });

    return (
        <StorybookWrapper>
            <BrazeBannerComponent
                componentName={componentName}
                logButtonClickWithBraze={(internalButtonId) => {
                    console.log(`Button with internal ID ${internalButtonId} clicked`);
                }}
                submitComponentEvent={(componentEvent) => {
                    console.log('submitComponentEvent called with: ', componentEvent);
                }}
                brazeMessageProps={{
                    header,
                    body,
                }}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'TheGuardianIn2020Banner' };
