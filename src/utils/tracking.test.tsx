import { buildTrackClick } from './tracking';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOpCallback = () => {};

describe('buildTrackClick', () => {
    it('returns a function which calls submitComponentEvent with the correct args', () => {
        const ophanComponentType = 'RETENTION_EPIC';
        const submitComponentEvent = jest.fn();
        const logButtonClickWithBraze = noOpCallback;
        const trackClick = buildTrackClick({
            ophanComponentType,
            submitComponentEvent,
            logButtonClickWithBraze,
        });

        const internalButtonId = 0;
        const ophanComponentId = 'example_id';
        trackClick({ ophanComponentId, internalButtonId });

        expect(submitComponentEvent).toHaveBeenCalledWith({
            action: 'CLICK',
            component: {
                componentType: ophanComponentType,
                id: ophanComponentId,
            },
            // Braze displays the button id indexed from 1, so we add one when tracking in Ophan
            // so that the values match:
            value: '1',
        });
    });

    it('returns a function which calls logButtonClickWithBraze with the correct args', () => {
        const ophanComponentType = 'RETENTION_EPIC';
        const submitComponentEvent = noOpCallback;
        const logButtonClickWithBraze = jest.fn();
        const trackClick = buildTrackClick({
            ophanComponentType,
            submitComponentEvent,
            logButtonClickWithBraze,
        });

        const internalButtonId = 0;
        const ophanComponentId = 'example_id';
        trackClick({ ophanComponentId, internalButtonId });

        expect(logButtonClickWithBraze).toHaveBeenCalledWith(internalButtonId);
    });

    it('catches errors in callbacks, so the other is not affected', () => {
        const ophanComponentType = 'RETENTION_EPIC';
        const submitComponentEvent = () => {
            throw new Error('submitComponentEvent error!');
        };
        const logButtonClickWithBraze = jest.fn();
        const trackClick = buildTrackClick({
            ophanComponentType,
            submitComponentEvent,
            logButtonClickWithBraze,
        });

        const internalButtonId = 0;
        const ophanComponentId = 'example_id';
        trackClick({ ophanComponentId, internalButtonId });

        expect(logButtonClickWithBraze).toHaveBeenCalled();
    });
});
