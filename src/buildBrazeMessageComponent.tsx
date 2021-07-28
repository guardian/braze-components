import React from 'react';

interface HasComponentName {
    componentName: string;
}

export type ComponentMapping<A> = {
    [key: string]: React.FC<A>;
};

export function buildBrazeMessageComponent<A extends HasComponentName>(
    mappings: ComponentMapping<A>,
): React.FC<A> {
    const BrazeMessageComponent = (props: A) => {
        const ComponentToRender = mappings[props.componentName];

        if (!ComponentToRender) {
            return null;
        }

        return <ComponentToRender {...props} />;
    };

    return BrazeMessageComponent;
}
