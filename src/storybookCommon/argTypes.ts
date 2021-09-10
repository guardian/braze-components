export const coreArgTypes = {
    slotName: {
        name: 'slotName',
        type: { name: 'string', required: true },
        description: 'The slot on the page',
        table: {
            category: "core (don't change)",
        },
    },
    componentName: {
        name: 'componentName',
        type: { name: 'string', required: true },
        description: 'The component (template) name',
        table: {
            category: "core (don't change)",
        },
    },
};

export const coreBannerArgTypes = {
    ...coreArgTypes,
    logButtonClickWithBraze: {
        table: { disable: true },
    },
    submitComponentEvent: {
        table: { disable: true },
    },
};
