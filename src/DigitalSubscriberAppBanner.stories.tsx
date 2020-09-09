import React, { ReactElement } from "react";
import { DigitalSubscriberAppBanner } from "./DigitalSubscriberAppBanner";
import { StorybookWrapper } from './utils/StorybookWrapper';

export default {
  component: DigitalSubscriberAppBanner,
  title: "Components/DigitalSubscriberAppBanner",
};

export const defaultStory = (): ReactElement => {
  return (
    <StorybookWrapper>
        <DigitalSubscriberAppBanner
            onButtonClick={(buttonId) => {
                console.log(`Button ${buttonId} clicked`);
            }}
            message="Test message"
            firstName="John"
        />
    </StorybookWrapper>
  );
};

defaultStory.story = { name: "Digital Subscriber App Banner" };
