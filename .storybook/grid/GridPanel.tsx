import React, { useEffect, useState, useRef } from 'react';
import { AddonPanel } from '@storybook/components';
import { API, addons } from '@storybook/manager-api';
import { STORY_CHANGED } from '@storybook/core-events';
import type { IframePostMessage, Asset } from '@guardian/grid-client';
import { nonEmotionStyles } from './gridStyles';
import { INITIAL_IMAGE_EVENT, IMAGE_SELECTED_EVENT } from './withGrid';
import { getGridUrl, getImageSigningUrl } from '../utils';

const isValidMessage = (data: IframePostMessage) =>
    data?.crop?.data && data?.image?.data && data?.crop?.data?.assets?.length > 0;

type Props = {
    active: boolean;
    api: API;
};

// We think these params are the best combination across both high dpi and
// standard dpi screens while keeping the image size down. In future we should
// switch to using the picture element end generate different images depending
// on the user's screen/device.
const imageProfile = {
    width: 930,
    quality: 45,
    auto: 'format',
};

const signImageUrl = (unsignedImageUrl: URL): Promise<string> =>
    fetch(`${getImageSigningUrl()}/signed-image-url`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            url: unsignedImageUrl,
            profile: imageProfile,
        }),
        credentials: 'include',
    })
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            return json.signedUrl;
        });

export const GridPanel = ({ api, active }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | undefined>();
    const activeButton = useRef(null);

    const onMessage = (event) => {
        if (event.origin !== getGridUrl()) {
            return;
        }

        const data: IframePostMessage = event.data;

        if (!isValidMessage(data)) {
            console.log("Image data isn't valid!", data);
            return;
        }

        console.log({ data });

        // We concat with empty array here to get back a non-readonly Asset[] so
        // that we don't break the type signature of getBestCrop.
        const cropAsset = data.crop.data.master;
        const cropUrl = cropAsset?.secureUrl;

        if (!cropUrl) {
            return null;
        }

        // Sign image cropped image using our Fastly image url signing service
        signImageUrl(cropUrl)
            .then((signedCropUrl) => {
                setSelectedImage(signedCropUrl);
                addons.getChannel().emit(IMAGE_SELECTED_EVENT, signedCropUrl);
            })
            .finally(() => {
                setIsModalOpen(false);
            });
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
                <div style={nonEmotionStyles.buttonRow}>
                    <button
                        style={
                            isModalOpen ? nonEmotionStyles.inactiveButton : nonEmotionStyles.activeButton
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
                        style={
                            isModalOpen ? nonEmotionStyles.activeButton : nonEmotionStyles.inactiveButton
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
                    <div style={nonEmotionStyles.resultRow}>
                        <span style={nonEmotionStyles.resultKey}>imageUrl:</span>
                        <textarea
                            style={nonEmotionStyles.resultValue}
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
    <div style={nonEmotionStyles.modal}>
        <iframe style={nonEmotionStyles.iframe} src={getGridUrl()}></iframe>
    </div>
);
