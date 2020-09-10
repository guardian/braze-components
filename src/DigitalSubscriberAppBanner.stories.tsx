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
        header={text("header", "A note to our digital subscribers")}
        body={text("body", "Hi John, did you know that as a Guardian digital subscriber you can enjoy an enhanced experience of our quality, independent journalism on all your devices, including The Guardian Live app.")}
      />
    </StorybookWrapper>
  );
};

defaultStory.story = { name: "Digital Subscriber App Banner" };
