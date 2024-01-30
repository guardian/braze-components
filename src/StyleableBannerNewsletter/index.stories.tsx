import React, { ReactElement } from 'react';
import { BrazeBannerComponent } from '../BrazeBannerComponent';
import { StorybookWrapper, mockSubscribe, mockFetchEmail } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import { coreArgTypes, ophanComponentIdArgType } from '../storybookCommon/argTypes';
import { BrazeMessageProps } from '.';
import { grid, withGrid } from '../../.storybook/grid/withGrid';

export default {
    component: 'StyleableBannerNewsletter',
    title: 'Banner/StyleableBannerNewsletter',
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
        frequency: {
            name: 'frequency',
            type: { name: 'string', required: true },
            description: 'Text description of how often the email is sent',
        },
        styleBackground: {
            name: 'styleBackground',
            type: { name: 'string', required: false },
            description: 'Banner background color - defaults to "#ededed"',
        },
        header: {
            name: 'header',
            type: { name: 'string', required: true },
            description: 'Header text',
        },
        styleHeader: {
            name: 'styleHeader',
            type: { name: 'string', required: false },
            description: 'Headline text color - defaults to "#333333"',
        },
        body: {
            name: 'body',
            type: { name: 'string', required: true },
            description: 'Body text',
        },
        styleBody: {
            name: 'styleBody',
            type: { name: 'string', required: false },
            description: 'Body text color - defaults to "#333333"',
        },

        // CHANGED: attribute boldText -> highlight (consistency with bannerWithLink)
        // boldText: {
        //     name: 'boldText',
        //     type: { name: 'string', required: false },
        //     description: 'Bold text',
        // },
        highlight: {
            name: 'boldText',
            type: { name: 'string', required: false },
            description: 'Bold text',
        },
        styleHighlight: {
            name: 'styleHighlight',
            type: { name: 'string', required: false },
            description: 'Highlighted text color - defaults to "#333333"',
        },
        styleHighlightBackground: {
            name: 'styleHighlightBackground',
            type: { name: 'string', required: false },
            description: 'Highlighted background color - defaults to "#ededed"',
        },

        // NEW!
        secondParagraph: {
            name: 'secondParagraph',
            type: { name: 'string', required: false },
            description: 'Additional paragraph',
        },
        styleSecondParagraph: {
            name: 'styleSecondParagraph',
            type: { name: 'string', required: false },
            description: 'Second paragraph text color - defaults to "#333333"',
        },

        buttonCopy: {
            name: 'buttonCopy',
            type: { name: 'string', required: false },
            description: 'CTA button copy',
        },
        styleNewsletterButton: {
            name: 'styleNewsletterButton',
            type: { name: 'string', required: false },
            description: 'CTA button text color - defaults to "#ffffff"',
        },
        styleNewsletterButtonBackground: {
            name: 'styleNewsletterButtonBackground',
            type: { name: 'string', required: false },
            description: 'CTA button background color - defaults to "#052962"',
        },
        styleNewsletterButtonHover: {
            name: 'styleNewsletterButtonHover',
            type: { name: 'string', required: false },
            description: 'CTA button background hover color - defaults to "#234b8a"',
        },
        styleReminderAnimation: {
            name: 'styleReminderAnimation',
            type: { name: 'string', required: false },
            description: 'Animated dots color - defaults to "#234b8a"',
        },

        styleClose: {
            name: 'styleClose',
            type: { name: 'string', required: false },
            description: 'Close button color - defaults to "#052962"',
        },
        styleCloseBackground: {
            name: 'styleCloseBackground',
            type: { name: 'string', required: false },
            description: 'Close button background - defaults to "#ededed"',
        },
        styleCloseHover: {
            name: 'styleCloseHover',
            type: { name: 'string', required: false },
            description: 'Close button background hover - defaults to "#e5e5e5"',
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
        newsletterId: args.newsletterId,
        styleBackground: args.styleBackground,
        frequency: args.frequency,
        header: args.header,
        styleHeader: args.styleHeader,
        body: args.body,
        styleBody: args.styleBody,
        secondParagraph: args.secondParagraph,
        styleSecondParagraph: args.styleSecondParagraph,
        highlight: args.highlight,
        styleHighlight: args.styleHighlight,
        styleHighlightBackground: args.styleHighlightBackground,
        buttonCopy: args.buttonCopy,
        styleNewsletterButton: args.styleNewsletterButton,
        styleNewsletterButtonBackground: args.styleNewsletterButtonBackground,
        styleNewsletterButtonHover: args.styleNewsletterButtonHover,
        styleReminderAnimation: args.styleReminderAnimation,
        imageUrl,
    };

    // This is to make the data available to the guPreview add-on:
    knobsData.set({ ...brazeMessageProps, componentName: args.componentName });

    return (
        <StorybookWrapper>
            <BrazeBannerComponent
                componentName={args.componentName}
                subscribeToNewsletter={() => mockSubscribe(args.newsletterId)}
                fetchEmail={() => mockFetchEmail()}
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
    componentName: 'StyleableBannerNewsletter',
    ophanComponentId: 'change_me_ophan_component_id',

    newsletterId: '4156',

    styleBackground: '#ebe8e8',

    header: 'The Morning Briefing',
    styleHeader: `#333333`,

    body: 'Whether it’s the latest manoeuvring in global politics or the ‘and finally’ story that everyone’s talking about, you’ll be bang up to date with the news that counts.',
    styleBody: '#666',

    frequency: 'Every day',

    highlight: 'Sign up today!',
    styleHighlight: `#333333`,
    styleHighlightBackground: '#ebe8e8',

    secondParagraph: 'We thought you should know this newsletter may contain information about Guardian products and services.',
    styleSecondParagraph: '',

    buttonCopy: 'Sign up',
    styleNewsletterButton: '#ffffff',
    styleNewsletterButtonBackground: '#c70000',
    styleNewsletterButtonHover: '#c70000',
    styleReminderAnimation: '#707070',
    
    styleClose: `#333333`,
    styleCloseBackground: '#ebe8e8',
    styleCloseHover: '#e5e5e5',
};

DefaultStory.story = { name: 'StyleableBannerNewsletter' };
