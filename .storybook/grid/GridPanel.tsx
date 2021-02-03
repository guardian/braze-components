import React, { useEffect, useState, useRef } from 'react';
import { AddonPanel } from '@storybook/components';
import { useChannel } from '@storybook/api';
import { STORY_CHANGED } from '@storybook/core-events';
import { API } from '@storybook/api';
import type { IframePostMessage } from '@guardian/grid-client';
import { styles } from './gridStyles';
import { INITIAL_IMAGE_EVENT, IMAGE_SELECTED_EVENT } from './withGrid';
import { GRID_URL } from '../utils';

const isValidMessage = (data: IframePostMessage) =>
	data?.crop?.data &&
	data?.image?.data &&
	data?.crop?.data?.assets?.length > 0;

type Props = {
	active: boolean;
	api: API;
};

export const GridPanel = ({ api, active }: Props) => {
	const emit = useChannel({});
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<string | undefined>();
	const activeButton = useRef(null);

	const onMessage = (event) => {
		if (event.origin !== GRID_URL) {
			return;
		}

		const data: IframePostMessage = event.data;

		if (!isValidMessage(data)) {
			console.log("Image data isn't valid!", data);
			return;
		}

		const cropAssets = data.crop.data.assets;
		const cropUrl = cropAssets[cropAssets.length - 1]?.secureUrl;

		if (!cropUrl) {
			return null;
		}
		setSelectedImage(cropUrl.toString());
		emit(IMAGE_SELECTED_EVENT, cropUrl);

		setIsModalOpen(false);
	};

	useEffect(() => {
		if (isModalOpen) {
			window.addEventListener('message', onMessage, false);
		} else {
			window.removeEventListener('message', onMessage, false);
		}

		return () => window.removeEventListener('message', onMessage, false);
	}, [isModalOpen]);

	useEffect(() => {
		// This panel is reused across stories, so reset when the story is changed
		const onStoryChanged = () => {
			setIsModalOpen(false);
			setSelectedImage(undefined);
		};

		const onInitialImage = (initialImage) => {
			setSelectedImage(initialImage);
		};

		api.on(STORY_CHANGED, onStoryChanged);
		api.on(INITIAL_IMAGE_EVENT, onInitialImage);

		return () => {
			api.off(STORY_CHANGED, onStoryChanged);
			api.off(INITIAL_IMAGE_EVENT, onInitialImage);
		};
	}, []);

	return (
		<AddonPanel active={active}>
			<div>
				<div css={styles.buttonRow}>
					<button
						css={
							isModalOpen
								? styles.inactiveButton
								: styles.activeButton
						}
						ref={activeButton}
						onClick={() => {
							setIsModalOpen(true);
							activeButton.current.blur();
						}}
					>
						Select image
					</button>
					<button
						css={
							isModalOpen
								? styles.activeButton
								: styles.inactiveButton
						}
						ref={activeButton}
						onClick={() => {
							setIsModalOpen(false);
							activeButton.current.blur();
						}}
					>
						Close Grid
					</button>
				</div>

				{selectedImage && (
					<div css={styles.resultRow}>
						<span css={styles.resultKey}>imageUrl:</span>
						<textarea
							css={styles.resultValue}
							value={selectedImage}
							readOnly={true}
						/>
					</div>
				)}

				{isModalOpen && <GridModal />}
			</div>
		</AddonPanel>
	);
};

const GridModal = () => (
	<div css={styles.modal}>
		<iframe css={styles.iframe} src={GRID_URL}></iframe>
	</div>
);
