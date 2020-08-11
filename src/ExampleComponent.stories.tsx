import React, { ReactElement } from "react";
import { ExampleComponent } from "./ExampleComponent";

export default {
  component: ExampleComponent,
  title: "Components/ExampleComponent",
};

export const defaultStory = (): ReactElement => {
  return <ExampleComponent message="Test message" />;
};

defaultStory.story = { name: "Example Component" };
