/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SpecialEditionBanner } from '.';

describe('SpecialEditionBanner', () => {
	describe('when a button is clicked', () => {
		const baseProps = () => ({
			logButtonClickWithBraze: jest.fn(),
			submitComponentEvent: jest.fn(),
			brazeMessageProps: {
				header: 'Some header text',
				body: 'Some body text',
			},
		});

		it('invokes submitComponentEvent with correct data', () => {
			const logButtonClickWithOphan = jest.fn();
			const { getByText } = render(
				<SpecialEditionBanner
					{...baseProps()}
					submitComponentEvent={logButtonClickWithOphan}
				/>,
			);

			fireEvent.click(getByText('Ok, got it'));

			expect(logButtonClickWithOphan).toHaveBeenCalledWith({
				component: {
					componentType: 'RETENTION_ENGAGEMENT_BANNER',
					id: 'SpecialEditionBanner',
				},
				action: 'CLICK',
				value: '1',
			});
		});
	});
});
