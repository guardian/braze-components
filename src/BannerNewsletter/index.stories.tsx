import React, { ReactElement } from 'react';
import { BrazeBannerComponent } from '../BrazeBannerComponent';
import { StorybookWrapper, mockSubscribe } from '../utils/StorybookWrapper';
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
        newsletterId: {
            name: 'newsletterId',
            type: { name: 'string', required: true },
            description: 'The newsletter Id value',
        },
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
            type: { name: 'string', required: false },
            description: 'Additional paragraph',
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
    },
};

const StoryTemplate = (
    args: BrazeMessageProps & {
        componentName: string;
        newsletterId: string;
    },
): ReactElement => {
    const imageUrl = grid(
        'https://i.guim.co.uk/img/media/568c6031be78dab6f6c28336010884f3ebd0f97c/0_0_1936_1936/master/1936.png?width=196&quality=45&auto=format&s=2a3630e9625620d5726c31c5cdbf4772',
    );

    const brazeMessageProps: BrazeMessageProps = {
        header: args.header,
        newsletterId: args.newsletterId,
        frequency: args.frequency,
        body: args.body,
        boldText: args.boldText,
        secondParagraph: args.secondParagraph,
        imageUrl,
        ophanComponentId: args.ophanComponentId,
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
    newsletterId: '4156',
    frequency: 'Every day',
    body: 'Whether it’s the latest manoeuvring in global politics or the ‘and finally’ story that everyone’s talking about, you’ll be bang up to date with the news that counts.',
    boldText: 'Sign up today!',
    secondParagraph:
        'We thought you should know this newsletter may contain information about Guardian products and services.',
};

DefaultStory.story = { name: 'BannerNewsletter' };
