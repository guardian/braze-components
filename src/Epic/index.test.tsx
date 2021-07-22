/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { BrazeMessageProps, Epic } from '.';

describe('Epic', () => {
    describe('when component is rendered', () => {
        const messageProps: BrazeMessageProps = {
            heading: `Since you're here`,
            ophanComponentId: 'Epic',
            paragraph1: 'Plz donate',
            paragraph2: 'Support very much yes?',
            paragraph3: 'Breaking news',
            paragraph4: 'Om nom nom',
            buttonText: 'Support The Guardian',
            highlightedText: 'Support from a little as %%CURRENCY_SYMBOL%%1 per month',
            buttonUrl: 'http://support.theguardian.com',
        };

        const baseProps = () => ({
            logButtonClickWithBraze: jest.fn(),
            submitComponentEvent: jest.fn(),
            brazeMessageProps: messageProps,
            countryCode: 'GB',
        });

        it('replaces CURRENCY_SYMBOL for GB (£)', () => {
            const { getByText } = render(<Epic {...baseProps()} />);

            const elem = getByText('Support from a little as £1 per month');
            expect(elem).toBeDefined();
        });

        it('replaces CURRENCY_SYMBOL for US ($)', () => {
            const { getByText } = render(<Epic {...baseProps()} countryCode="US" />);

            const elem = getByText('Support from a little as $1 per month');
            expect(elem).toBeDefined();
        });
    });
});
