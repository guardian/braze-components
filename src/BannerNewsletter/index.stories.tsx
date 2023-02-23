import React, { ReactElement } from 'react';

import { StorybookWrapper, mockSubscribe } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import { coreArgTypes, ophanComponentIdArgType } from '../storybookCommon/argTypes';
import { grid, withGrid } from '../../.storybook/grid/withGrid';

import { BrazeBannerComponent } from '../BrazeBannerComponent';
import type { BrazeBannerMessageProps } from '../bannerCommon/bannerActions';

export default {
    component: 'BannerNewsletter',
    title: 'Banner/BannerNewsletter',
    decorators: [withGrid],
    parameters: {
        grid: {
            disable: false,
        },
    },
    argTypes: {
        ...coreArgTypes,
        ...ophanComponentIdArgType,
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
            description: 'Bold text',
        },
        secondParagraph: {
            name: 'secondParagraph',
            type: { name: 'string', required: true },
            description: 'Additional paragraph',
        },
        newsletterId: {
            name: 'newsletterId',
            type: { name: 'string', required: true },
            description: 'The newsletter Id value',
        },
        frequency: {
            name: 'frequency',
            type: { name: 'string', required: true },
            description: 'Text description of how often the email is sent',
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

const StoryTemplate = (args: BrazeBannerMessageProps & { componentName: string }): ReactElement => {
    const imageUrl = grid(
        'https://i.guim.co.uk/img/media/35d403182e4b262d37385281b19b763ee6b32f6a/58_0_1743_1046/master/1743.png?width=930&quality=45&auto=format&s=9ecd82413fef9883c1e7a0df2bf6abb1',
    );

    const brazeMessageProps: BrazeBannerMessageProps = {
        ophanComponentId: args.ophanComponentId,
        header: args.header,
        newsletterId: args.newsletterId,
        frequency: args.frequency,
        body: args.body,
        boldText: args.boldText,
        secondParagraph: args.secondParagraph,
        imageUrl,
        imageAccessibilityText: args.imageAccessibilityText,
    };

    // This is to make the data available to the guPreview add-on:
    knobsData.set({ ...brazeMessageProps, componentName: args.componentName });

    return (
        <StorybookWrapper>
            <BrazeBannerComponent
                componentName={args.componentName}
                subscribeToNewsletter={() => mockSubscribe(args.newsletterId)}
                brazeMessageProps={brazeMessageProps}
                logButtonClickWithBraze={(internalButtonId) => {
                    console.log(`Button with internal ID ${internalButtonId} clicked`);
                }}
                submitComponentEvent={(componentEvent) => {
                    console.log('submitComponentEvent called with: ', componentEvent);
                }}
            />
        </StorybookWrapper>
    );
};

export const DefaultStory = StoryTemplate.bind({});

DefaultStory.args = {
    slotName: 'Banner',
    componentName: 'BannerNewsletter',

    ophanComponentId: 'change_me_ophan_component_id',

    header: 'The Morning Briefing',
    newsletterId: '0',
    frequency: 'Every day',

    body: 'Whether it’s the latest manoeuvring in global politics or the ‘and finally’ story that everyone’s talking about, you’ll be bang up to date with the news that counts.',
    boldText: 'Sign up today!',
    secondParagraph:
        'We thought you should know this newsletter may contain information about Guardian products and services.',

    imageAccessibilityText: 'Product packshot image',
};

DefaultStory.story = { name: 'BannerNewsletter' };
