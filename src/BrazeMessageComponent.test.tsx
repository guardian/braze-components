/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { buildBrazeMessageComponent, BrazeComponent } from './BrazeMessageComponent';

describe('BrazeMessage', () => {
    it('renders the correct component when a valid componentName is passed', () => {
        const ExampleComponent = jest.fn(() => null) as BrazeComponent<unknown> & jest.Mock;
        ExampleComponent.canRender = () => true;

        const mappings = {
            ExampleComponent,
        };
        const BrazeMessageComponent = buildBrazeMessageComponent(mappings);

        render(
            <BrazeMessageComponent
                componentName={'ExampleComponent'}
                logButtonClickWithBraze={jest.fn()}
                submitComponentEvent={jest.fn()}
                brazeMessageProps={{}}
            />,
        );

        expect(ExampleComponent).toHaveBeenCalled();
    });

    it('renders nothing when an invalid componentName is passed', () => {
        const ExampleComponent = jest.fn(() => null) as BrazeComponent<unknown> & jest.Mock;
        ExampleComponent.canRender = () => true;
        const mappings = {
            ExampleComponent,
        };
        const BrazeMessageComponent = buildBrazeMessageComponent(mappings);

        render(
            <BrazeMessageComponent
                componentName={'NoSuchComponent'}
                logButtonClickWithBraze={jest.fn()}
                submitComponentEvent={jest.fn()}
                brazeMessageProps={{}}
            />,
        );

        expect(ExampleComponent).not.toHaveBeenCalled();
    });

    it('does not attempt to render a component if the props do not meet requirement', () => {
        const ExampleComponent = jest.fn(() => null) as BrazeComponent<unknown> & jest.Mock;
        ExampleComponent.canRender = () => false;
        const mappings = {
            ExampleComponent,
        };
        const BrazeMessageComponent = buildBrazeMessageComponent(mappings);

        render(
            <BrazeMessageComponent
                componentName={'ExampleComponent'}
                logButtonClickWithBraze={jest.fn()}
                submitComponentEvent={jest.fn()}
                brazeMessageProps={{}}
            />,
        );

        expect(ExampleComponent).not.toHaveBeenCalled();
    });
});
