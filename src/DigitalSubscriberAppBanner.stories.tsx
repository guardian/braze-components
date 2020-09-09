import React, { ReactElement } from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import { DigitalSubscriberAppBanner } from "./DigitalSubscriberAppBanner";
import { StorybookWrapper } from "./utils/StorybookWrapper";

export default {
  component: DigitalSubscriberAppBanner,
  title: "Components/DigitalSubscriberAppBanner",
  decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
  return (
    <StorybookWrapper>
      <DigitalSubscriberAppBanner
        onButtonClick={(buttonId) => {
          console.log(`Button ${buttonId} clicked`);
        }}
        message="Test message"
        firstName={text("First Name", "John")}
      />
    </StorybookWrapper>
  );
};

defaultStory.story = { name: "Digital Subscriber App Banner" };
