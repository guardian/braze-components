import Ajv from 'ajv';
import type { JSONSchemaType, ValidateFunction } from 'ajv';

import type { ImageRequestPayload } from './imageRequestPayload';

const ajv = new Ajv();

const imageRequestPayloadSchema: JSONSchemaType<ImageRequestPayload> = {
    type: 'object',
    properties: {
        imageUrl: { type: 'string' },
    },
    required: ['imageUrl'],
    additionalProperties: false,
};

const buildValidateImageRequestPayload = (): ValidateFunction<ImageRequestPayload> =>
    ajv.compile(imageRequestPayloadSchema);

export { buildValidateImageRequestPayload };
