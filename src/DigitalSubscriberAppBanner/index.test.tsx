/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DigitalSubscriberAppBanner } from '.';

describe('DigitalSubscriberAppBanner', () => {
    describe('when a button is clicked', () => {
        const baseProps = () => ({
            // logButtonClickWithBraze: jest.fn(),
            // submitComponentEvent: jest.fn(),
            trackClick: jest.fn(),
            brazeMessageProps: {
                header: 'A note to our digital subscribers',
                body: 'Hi John, did you know...',
            },
        });

        it('invokes submitComponentEvent with correct data', () => {
            const logButtonClickWithOphan = jest.fn();
            const { getByText } = render(
                <DigitalSubscriberAppBanner
                    {...baseProps()}
                    trackClick={logButtonClickWithOphan}
                />,
            );

            fireEvent.click(getByText('Ok, got it'));

            expect(logButtonClickWithOphan).toHaveBeenCalledWith({
                internalButtonId: 0,
                ophanComponentId: 'DigitalSubscriberAppBanner',
            });
        });
    });
});
