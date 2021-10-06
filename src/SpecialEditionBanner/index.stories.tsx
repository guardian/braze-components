import React, { ReactElement } from 'react';
import { BrazeBannerComponent } from '../BrazeBannerComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import { coreArgTypes, sectionArgType } from '../storybookCommon/argTypes';
import { BrazeMessageProps } from '.';

export default {
    component: 'SpecialEditionBanner',
    title: 'Banner/SpecialEditionBanner',
    argTypes: {
        ...coreArgTypes,
        ...sectionArgType,
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
    },
};

const StoryTemplate = (args: BrazeMessageProps & { componentName: string }): ReactElement => {
    const brazeMessageProps = {
        header: args.header,
        body: args.body,
    };

    // This is to make the data available to the guPreview add-on:
    knobsData.set({ ...brazeMessageProps, componentName: args.componentName });

    return (
        <StorybookWrapper>
            <>
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
            </>
        </StorybookWrapper>
    );
};

export const DefaultStory = StoryTemplate.bind({});

DefaultStory.args = {
    slotName: 'Banner',
    header: "A year you'd rather forget?",
    body: "2020 has been a shocker of a year, but there were some bright spots shining through the gloom: untold heroism, invention, kindness, scientific breakthroughs, communal spirit and moments of great independent journalism. We've gathered it all for you in our latest special edition: The best of a bad year.",
    componentName: 'SpecialEditionBanner',
};

DefaultStory.story = { name: 'SpecialEditionBanner' };
