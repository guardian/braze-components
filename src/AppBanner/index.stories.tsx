import React, { ReactElement } from 'react';
import { BrazeBannerComponent } from '../BrazeBannerComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import { withGrid, grid } from '../../.storybook/grid/withGrid';
import { BrazeMessageProps } from '.';
import { coreArgTypes } from '../storybookCommon/argTypes';

export default {
    component: 'AppBanner',
    title: 'Banner/AppBanner',
    decorators: [withGrid],
    parameters: {
        grid: {
            disable: false,
        },
    },
    argTypes: {
        ...coreArgTypes,
        header: {
            name: 'header',
            type: { name: 'string', required: true },
            description: 'Header text',
        },
        body: {
            name: 'body',
            type: { name: 'string', required: true },
            description: 'Body text',
        },
        boldText: {
            name: 'boldText',
            type: { name: 'string', required: false },
            description: 'Text added to the end of the body copy with bold styling',
        },
        cta: {
            name: 'cta',
            type: { name: 'string', required: true },
            description: 'Text next to the app store logos',
        },
        imageUrl: {
            name: 'imageUrl (use Grid image picker)',
            type: { name: 'string', required: true },
            control: null,
            description:
                'i.guim.co.uk URL for the banner image. Use the Grid image picker to select this.',
        },
        imageAccessibilityText: {
            name: 'imageAccessibilityText',
            type: { name: 'string', required: true },
            description: 'Accessible text description of the image',
        },
    },
};

const StoryTemplate = (args: BrazeMessageProps & { componentName: string }): ReactElement => {
    const brazeMessageProps = {
        header: args.header,
        body: args.body,
        boldText: args.boldText,
        cta: args.cta,
        imageUrl: args.imageUrl,
        imageAccessibilityText: args.imageAccessibilityText,
    };

    // This is to make the data available to the guPreview add-on:
    knobsData.set({ ...brazeMessageProps, componentName: args.componentName });

    return (
        <StorybookWrapper>
            <BrazeBannerComponent
                componentName={args.componentName}
                logButtonClickWithBraze={(internalButtonId) => {
                    console.log(`Button with internal ID ${internalButtonId} clicked`);
                }}
                submitComponentEvent={(componentEvent) => {
                    console.log('submitComponentEvent called with: ', componentEvent);
                }}
                brazeMessageProps={brazeMessageProps}
            />
        </StorybookWrapper>
    );
};

export const DefaultStory = StoryTemplate.bind({});

DefaultStory.args = {
    slotName: 'Banner',
    header: 'A note to our digital subscribers',
    body: 'Hi John, did you know that as a Guardian digital subscriber you can enjoy an enhanced experience of our quality, independent journalism on all your devices, including The Guardian Live app.',
    boldText: 'You know it makes sense.',
    componentName: 'AppBanner',
    cta: 'Search for "Guardian live news"',
    imageUrl: grid(
        'https://i.guim.co.uk/img/media/de6813b4dd9b9805a2d14dd6af14ae2b48e2e19e/0_0_930_520/master/930.png?quality=45&width=930&s=0beb53509265d32e3d201aa3981323bb',
    ),
    imageAccessibilityText: 'Explanation text of what the image shows',
};

DefaultStory.story = { name: 'AppBanner' };
