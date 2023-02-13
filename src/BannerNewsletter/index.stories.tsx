import React, { ReactElement } from 'react';
import { BrazeBannerComponent } from '../BrazeBannerComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import { coreArgTypes, ophanComponentIdArgType } from '../storybookCommon/argTypes';
import { BrazeMessageProps } from '.';
import { grid, withGrid } from '../../.storybook/grid/withGrid';

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
        buttonText: {
            name: 'buttonText',
            type: { name: 'string', required: true },
            description: 'Button text',
        },
        buttonUrl: {
            name: 'buttonUrl',
            type: { name: 'string', required: true },
        },
        imageUrl: {
            name: 'imageUrl (use Grid image picker)',
            type: { name: 'string', required: true },
            control: null,
            description:
                'i.guim.co.uk URL for the banner image. Use the Grid image picker to select this.',
        },
    },
};

const StoryTemplate = (args: BrazeMessageProps & { componentName: string }): ReactElement => {
    const imageUrl = grid(
        'https://i.guim.co.uk/img/media/35d403182e4b262d37385281b19b763ee6b32f6a/58_0_1743_1046/master/1743.png?width=930&quality=45&auto=format&s=9ecd82413fef9883c1e7a0df2bf6abb1',
    );

    const brazeMessageProps: BrazeMessageProps = {
        header: args.header,
        body: args.body,
        boldText: args.boldText,
        buttonText: args.buttonText,
        buttonUrl: args.buttonUrl,
        imageUrl,
        ophanComponentId: args.ophanComponentId,
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
    header: 'Sign up for a newsletter',
    body: "We really want you to read this newsletter. It's the best newsletter about stuff you'll ever find.",
    buttonText: 'Sign up',
    buttonUrl: 'https://example.com',
    boldText: 'You know it makes sense.',
    componentName: 'BannerNewsletter',
    ophanComponentId: 'change_me_ophan_component_id',
};

DefaultStory.story = { name: 'BannerNewsletter' };
