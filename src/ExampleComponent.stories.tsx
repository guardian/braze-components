import React, { ReactElement } from "react";
import { ExampleComponent } from "./ExampleComponent";

export default {
  component: ExampleComponent,
  title: "Components/ExampleComponent",
};

export const defaultStory = (): ReactElement => {
  return <ExampleComponent />;
};

defaultStory.story = { name: "Example Component" };
