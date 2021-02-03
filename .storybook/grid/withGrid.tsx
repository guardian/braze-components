import { useEffect } from 'react';
import addons from '@storybook/addons';
import { makeDecorator } from '@storybook/addons';
import { STORY_CHANGED, FORCE_RE_RENDER } from '@storybook/core-events';

let gridValue;
export const IMAGE_SELECTED_EVENT = 'IMAGE_SELECTED_EVENT';
export const INITIAL_IMAGE_EVENT = 'INITIAL_IMAGE_EVENT';

export const grid = (defaultValue) => {
	if (!gridValue) {
		addons.getChannel().emit(INITIAL_IMAGE_EVENT, defaultValue);
	}

	return gridValue || defaultValue;
};

const forceReRender = () => {
	addons.getChannel().emit(FORCE_RE_RENDER);
};

const onStoryChanged = () => {
	gridValue = undefined;
};

const onImageSelected = (payload) => {
	gridValue = payload;
	forceReRender();
};

const disconnectEventListeners = () => {
	const channel = addons.getChannel();

	channel.removeListener(IMAGE_SELECTED_EVENT, onImageSelected);
	channel.removeListener(STORY_CHANGED, onStoryChanged);
};

const connectEventListeners = () => {
	const channel = addons.getChannel();

	channel.on(IMAGE_SELECTED_EVENT, onImageSelected);
	channel.on(STORY_CHANGED, onStoryChanged);

	return disconnectEventListeners;
};

export const withGrid = makeDecorator({
	name: 'withGrid',
	parameterName: 'grid',
	wrapper: (storyFn, context, { parameters }) => {
		useEffect(connectEventListeners, []);

		return storyFn(context);
	},
});
