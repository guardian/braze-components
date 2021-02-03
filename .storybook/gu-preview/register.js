import * as React from 'react';
import addons, { types } from '@storybook/addons';
import { GuPreview } from './GuPreview';

const ADDON_ID = 'gupreview';

addons.register(ADDON_ID, () => {
	addons.add(ADDON_ID, {
		title: 'gu / gu-preview',
		type: types.TOOL,
		match: ({ viewMode }) => viewMode === 'story',
		render: () => <GuPreview />,
	});
});
