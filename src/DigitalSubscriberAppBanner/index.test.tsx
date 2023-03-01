/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DigitalSubscriberAppBanner } from '.';

describe('DigitalSubscriberAppBanner', () => {
    describe('when a button is clicked', () => {
        const baseProps = () => ({
            trackClick: jest.fn(),
            brazeMessageProps: {
                header: 'A note to our digital subscribers',
                body: 'Hi John, did you know...',
            },
        });

        it('invokes submitComponentEvent with correct data', () => {
            const logButtonClick = jest.fn();
            const { getByText } = render(
                <DigitalSubscriberAppBanner {...baseProps()} trackClick={logButtonClick} />,
            );

            fireEvent.click(getByText('Ok, got it'));

            expect(logButtonClick).toHaveBeenCalledWith({
                internalButtonId: 0,
                ophanComponentId: 'DigitalSubscriberAppBanner',
            });
        });
    });
});
