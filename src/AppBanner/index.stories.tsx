import React, { ReactElement } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { BrazeMessageComponent } from '../BrazeMessageComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import { withGrid, grid } from '../../.storybook/grid/withGrid';

export default {
    component: 'AppBanner',
    title: 'Banner/AppBanner',
    decorators: [withGrid, withKnobs],
    parameters: {
        knobs: {
            escapeHTML: false, // Block HTML escaping, preventing double-escaping of imgUrl special characters in Storybook
        },
        grid: {
            disable: false,
        },
    },
};

export const defaultStory = (): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const slotName = text('slotName', 'Banner');
    const header = text('header', 'A note to our digital subscribers');
    const body = text(
        'body',
        'Hi John, did you know that as a Guardian digital subscriber you can enjoy an enhanced experience of our quality, independent journalism on all your devices, including The Guardian Live app.',
    );
    const componentName = text('componentName', 'AppBanner');
    const imageUrl = grid(
        'https://i.guim.co.uk/img/media/de6813b4dd9b9805a2d14dd6af14ae2b48e2e19e/0_0_930_520/master/930.png?quality=45&width=930&s=0beb53509265d32e3d201aa3981323bb',
    );
    const cta = text('cta', 'Search for "Guardian live news"');

    // This is to make the data available to the guPreview add-on:
    knobsData.set({ header, body, componentName, imageUrl, cta });

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
                    body,
                    imageUrl,
                    cta,
                }}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'AppBanner' };
