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
