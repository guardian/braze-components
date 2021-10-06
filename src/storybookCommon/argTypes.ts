import { guardianSectionIds } from './sectionIds';

const CORE_CATEGORY_NAME = "core (don't change)";

export const coreArgTypes = {
    slotName: {
        name: 'slotName',
        type: { name: 'string', required: true },
        description: 'The slot on the page',
        table: {
            category: CORE_CATEGORY_NAME,
        },
    },
    componentName: {
        name: 'componentName',
        type: { name: 'string', required: true },
        description: 'The component (template) name',
        table: {
            category: CORE_CATEGORY_NAME,
        },
    },
};

export const ophanComponentIdArgType = {
    ophanComponentId: {
        name: 'ophanComponentId',
        type: { name: 'string', required: true },
        description:
            'The component ID sent to Ophan for tracking. The format is ' +
            '`[PRODUCT]_[FREETEXT]_test[NUMBER]_[variant|control]`. For example ' +
            '`rc_upsell_test1_variant`.',
    },
};

export const sectionArgType = {
    section: {
        name: 'section',
        type: { required: false },
        description:
            'If provided will only show on articles matching this section id. e.g environment',
        options: guardianSectionIds,
    },
};

export const buildEpicParagraphDocs = (
    numberOfParagraphs: number,
): [string, Record<string, unknown>][] =>
    Array.from({ length: numberOfParagraphs }, (_, idx) => {
        const name = `paragraph${idx + 1}`;
        return [
            name,
            {
                name,
                type: {
                    name: 'string',
                    required: idx === 0,
                },
                description:
                    'Paragraph text. Supports HTML. If adding links see Braze user guide for tracking params.',
            },
        ];
    });
