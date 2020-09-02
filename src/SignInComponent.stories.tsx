import React, { ReactElement } from "react";
import { SignInComponent } from "./SignInComponent";
import { StorybookWrapper } from './utils/StorybookWrapper';

export default {
  component: SignInComponent,
  title: "Components/SignInComponent",
};

export const defaultStory = (): ReactElement => {
  return (
    <StorybookWrapper>
        <SignInComponent
            onButtonClick={() => {
                console.log("Button clicked!");
            }}
            message="Test message"
            firstName="John"
        />
    </StorybookWrapper>
  );
};

defaultStory.story = { name: "Sign In Component" };
