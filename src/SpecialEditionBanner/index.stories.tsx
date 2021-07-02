import React, { ReactElement } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { BrazeMessageComponent } from '../BrazeMessageComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';

export default {
    component: 'SpecialEditionBanner',
    title: 'Banner/SpecialEditionBanner',
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
    const header = text('header', "A year you'd rather forget?");
    const body = text(
        'body',
        "2020 has been a shocker of a year, but there were some bright spots shining through the gloom: untold heroism, invention, kindness, scientific breakthroughs, communal spirit and moments of great independent journalism. We've gathered it all for you in our latest special edition: The best of a bad year.",
    );
    const componentName = text('componentName', 'SpecialEditionBanner');

    // This is to make the data available to the guPreview add-on:
    knobsData.set({ header, body, componentName });

    return (
        <StorybookWrapper>
            <>
                <BrazeMessageComponent
                    componentName={componentName}
                    logButtonClickWithBraze={(internalButtonId) => {
                        console.log(`Button with internal ID ${internalButtonId} clicked`);
                    }}
                    submitComponentEvent={(componentEvent) => {
                        console.log('submitComponentEvent called with: ', componentEvent);
                    }}
                    brazeMessageProps={{
                        header: header,
                        body: body,
                    }}
                />
            </>
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'SpecialEditionBanner' };
