/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AppBanner } from '.';

describe('AppBanner', () => {
	const baseProps = () => ({
		logButtonClickWithBraze: jest.fn(),
		submitComponentEvent: jest.fn(),
		brazeMessageProps: {
			header: 'A note to our digital subscribers',
			body: 'Hi John, did you know...',
			cta: 'Search for "Guardian"...',
			imageUrl:
				'https://i.guim.co.uk/img/media/de6813b4dd9b9805a2d14dd6af14ae2b48e2e19e/0_0_930_520/930.png?width=930&quality=60&s=a7d81978655765847246c8d4d0cd0e7f',
		},
	});

	describe('when a button is clicked', () => {
		it('invokes logButtonClickWithBraze with the internal button ID', () => {
			const logButtonClickWithBraze = jest.fn();
			const { getByText } = render(
				<AppBanner
					{...baseProps()}
					logButtonClickWithBraze={logButtonClickWithBraze}
				/>,
			);

			fireEvent.click(getByText('Ok, got it'));

			expect(logButtonClickWithBraze).toHaveBeenCalledWith(0);
		});

		it('invokes submitComponentEvent with correct data', () => {
			const logButtonClickWithOphan = jest.fn();
			const { getByText } = render(
				<AppBanner
					{...baseProps()}
					submitComponentEvent={logButtonClickWithOphan}
				/>,
			);

			fireEvent.click(getByText('Ok, got it'));

			expect(logButtonClickWithOphan).toHaveBeenCalledWith({
				component: {
					componentType: 'RETENTION_ENGAGEMENT_BANNER',
					id: 'AppBanner',
				},
				action: 'CLICK',
				value: '1',
			});
		});

		it('closes the banner', () => {
			const props = baseProps();
			const { container, getByText } = render(<AppBanner {...props} />);

			fireEvent.click(getByText('Ok, got it'));

			// Closing the banner means nothing is rendered
			expect(container.firstChild).toBeNull();
		});

		it('closes the banner even if the callback throws an error', () => {
			const props = baseProps();
			const logButtonClickWithBraze = () => {
				throw new Error('Something went wrong');
			};
			const { container, getByText } = render(
				<AppBanner
					{...props}
					logButtonClickWithBraze={logButtonClickWithBraze}
				/>,
			);

			fireEvent.click(getByText('Ok, got it'));

			// Closing the banner means nothing is rendered
			expect(container.firstChild).toBeNull();
		});
	});

	it('does not render the banner when a non-allowed image is provided', () => {
		const { brazeMessageProps, ...props } = baseProps();
		const badImageUrl = 'https://www.example.com/cat.png';
		const invalidMessageProps = {
			...brazeMessageProps,
			imageUrl: badImageUrl,
		};

		const { container } = render(
			<AppBanner {...props} brazeMessageProps={invalidMessageProps} />,
		);

		// Nothing rendered as the imageUrl was not allowed
		expect(container.firstChild).toBeNull();
	});
});
