import React, { ReactElement } from "react";
import { ExampleComponent } from "./ExampleComponent";

export default {
  component: ExampleComponent,
  title: "Components/ExampleComponent",
};

export const defaultStory = (): ReactElement => {
  return (
    <ExampleComponent
      onButtonClick={() => {
        console.log("Button clicked!");
      }}
      message="Test message"
    />
  );
};

defaultStory.story = { name: "Example Component" };
