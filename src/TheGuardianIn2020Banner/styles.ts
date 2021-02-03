import { css } from '@emotion/core';
import { from, until } from '@guardian/src-foundations/mq/cjs';
import { body } from '@guardian/src-foundations/typography/cjs';
import { palette, space } from '@guardian/src-foundations';

const bodyColor = '#666';

export const styles = {
	image: css`
		max-width: 100%;
		max-height: 260px;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		margin-top: -20px;

		img {
			max-width: 100%;
			width: 100%;
			height: 100%;
			object-fit: contain;
		}

		${until.desktop} {
			display: none;
		}

		${from.wide} {
			margin-right: 100px;
		}
	`,
	paragraph: css`
		${body.medium()}
		font-size: 16px;
		line-height: 135%;
		margin: ${space[5]}px 0 ${space[5]}px;
		max-width: 100%;
		color: ${bodyColor};

		${from.phablet} {
			max-width: 90%;
		}

		${from.tablet} {
			max-width: 100%;
		}

		${from.desktop} {
			margin: ${space[3]}px 0 ${space[4]}px;
			max-width: 42rem;
		}

		${from.leftCol} {
			font-size: 20px;
			max-width: 37rem;
		}

		${from.wide} {
			max-width: 42rem;
		}
	`,
	cta: css`
		font-weight: 700;
		margin-top: ${space[3]}px;
		margin-right: ${space[3]}px;
		display: inline-block;
		color: ${palette.neutral[20]};
	`,
};
