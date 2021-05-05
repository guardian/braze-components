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
                logButtonClickWithBraze={jest.fn()}
                submitComponentEvent={jest.fn()}
                candidates={[{ componentName: 'ExampleComponent', brazeMessageProps: {} }]}
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
                logButtonClickWithBraze={jest.fn()}
                submitComponentEvent={jest.fn()}
                candidates={[{ componentName: 'NoSuchComponent', brazeMessageProps: {} }]}
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
                logButtonClickWithBraze={jest.fn()}
                submitComponentEvent={jest.fn()}
                candidates={[{ componentName: 'ExampleComponent', brazeMessageProps: {} }]}
            />,
        );

        expect(ExampleComponent).not.toHaveBeenCalled();
    });

    it('renders the first renderable component', () => {
        const ExampleComponent = jest.fn(() => null) as BrazeComponent<unknown> & jest.Mock;
        ExampleComponent.canRender = () => false;
        const AnotherExampleComponent = jest.fn(() => null) as BrazeComponent<unknown> & jest.Mock;
        AnotherExampleComponent.canRender = () => true;

        const mappings = {
            ExampleComponent,
            AnotherExampleComponent,
        };
        const BrazeMessageComponent = buildBrazeMessageComponent(mappings);

        render(
            <BrazeMessageComponent
                logButtonClickWithBraze={jest.fn()}
                submitComponentEvent={jest.fn()}
                candidates={[
                    { componentName: 'ExampleComponent', brazeMessageProps: {} },
                    { componentName: 'AnotherExampleComponent', brazeMessageProps: {} },
                ]}
            />,
        );

        expect(ExampleComponent).not.toHaveBeenCalled();
        expect(AnotherExampleComponent).toHaveBeenCalled();
    });

    describe('.canRender', () => {
        it('returns false if no valid candidates', () => {
            const ExampleComponent = jest.fn(() => null) as BrazeComponent<unknown> & jest.Mock;
            ExampleComponent.canRender = () => false;
            const AnotherExampleComponent = jest.fn(() => null) as BrazeComponent<unknown> &
                jest.Mock;
            AnotherExampleComponent.canRender = () => false;
            const mappings = {
                ExampleComponent,
                AnotherExampleComponent,
            };
            const BrazeMessageComponent = buildBrazeMessageComponent(mappings);

            const canRender = BrazeMessageComponent.canRender({
                logButtonClickWithBraze: jest.fn(),
                submitComponentEvent: jest.fn(),
                candidates: [
                    { componentName: 'ExampleComponent', brazeMessageProps: {} },
                    { componentName: 'AnotherExampleComponent', brazeMessageProps: {} },
                ],
            });

            expect(canRender).toEqual(false);
        });

        it('returns true if one valid candidate', () => {
            const ExampleComponent = jest.fn(() => null) as BrazeComponent<unknown> & jest.Mock;
            ExampleComponent.canRender = () => false;
            const AnotherExampleComponent = jest.fn(() => null) as BrazeComponent<unknown> &
                jest.Mock;
            AnotherExampleComponent.canRender = () => true;
            const mappings = {
                ExampleComponent,
                AnotherExampleComponent,
            };
            const BrazeMessageComponent = buildBrazeMessageComponent(mappings);

            const canRender = BrazeMessageComponent.canRender({
                logButtonClickWithBraze: jest.fn(),
                submitComponentEvent: jest.fn(),
                candidates: [
                    { componentName: 'ExampleComponent', brazeMessageProps: {} },
                    { componentName: 'AnotherExampleComponent', brazeMessageProps: {} },
                ],
            });

            expect(canRender).toEqual(true);
        });

        it('returns true if two valid candidate', () => {
            const ExampleComponent = jest.fn(() => null) as BrazeComponent<unknown> & jest.Mock;
            ExampleComponent.canRender = () => true;
            const AnotherExampleComponent = jest.fn(() => null) as BrazeComponent<unknown> &
                jest.Mock;
            AnotherExampleComponent.canRender = () => true;
            const mappings = {
                ExampleComponent,
                AnotherExampleComponent,
            };
            const BrazeMessageComponent = buildBrazeMessageComponent(mappings);

            const canRender = BrazeMessageComponent.canRender({
                logButtonClickWithBraze: jest.fn(),
                submitComponentEvent: jest.fn(),
                candidates: [
                    { componentName: 'ExampleComponent', brazeMessageProps: {} },
                    { componentName: 'AnotherExampleComponent', brazeMessageProps: {} },
                ],
            });

            expect(canRender).toEqual(true);
        });
    });
});
