export interface PersonalizationOption {
    label: string;
    value: string;
    description: string;
    template: string;
}

export interface PersonalizationCategory {
    label: string;
    options: PersonalizationOption[];
}

export const PERSONALIZATION_CATEGORIES: PersonalizationCategory[] = [
    {
        label: 'Basic User Information',
        options: [
            {
                label: 'First Name',
                value: 'first_name',
                description: "User's first name",
                template: '{{ ${first_name} }}'
            },
            {
                label: 'Last Name',
                value: 'last_name',
                description: "User's last name",
                template: '{{ ${last_name} }}'
            },
            {
                label: 'Email Address',
                value: 'email_address',
                description: "User's email address",
                template: '{{ ${email_address} }}'
            },
            {
                label: 'User ID',
                value: 'user_id',
                description: "User's unique identifier",
                template: '{{ ${user_id} }}'
            },
            {
                label: 'Language',
                value: 'language',
                description: "User's language preference",
                template: '{{ ${language} }}'
            },
            {
                label: 'Country',
                value: 'country',
                description: "User's country",
                template: '{{ ${country} }}'
            },
            {
                label: 'Time Zone',
                value: 'time_zone',
                description: "User's time zone",
                template: '{{ ${time_zone} }}'
            }
        ]
    },
    {
        label: 'Custom Attributes',
        options: [
            {
                label: 'Custom Text Attribute',
                value: 'custom_text',
                description: 'Custom text attribute (specify name)',
                template: '{{ custom_attribute.${ATTRIBUTE_NAME} }}'
            },
            {
                label: 'Custom Number Attribute',
                value: 'custom_number',
                description: 'Custom number attribute (specify name)',
                template: '{{ custom_attribute.${ATTRIBUTE_NAME} }}'
            },
            {
                label: 'Custom Date Attribute',
                value: 'custom_date',
                description: 'Custom date attribute (specify name)',
                template: '{{ custom_attribute.${ATTRIBUTE_NAME} }}'
            },
            {
                label: 'Custom Boolean Attribute',
                value: 'custom_boolean',
                description: 'Custom boolean attribute (specify name)',
                template: '{{ custom_attribute.${ATTRIBUTE_NAME} }}'
            }
        ]
    },
    {
        label: 'Device Information',
        options: [
            {
                label: 'Device Model',
                value: 'most_recent_app_version',
                description: 'Most recent app version',
                template: '{{ ${most_recent_app_version} }}'
            },
            {
                label: 'Device OS',
                value: 'most_recent_platform',
                description: 'Most recent device platform',
                template: '{{ ${most_recent_platform} }}'
            },
            {
                label: 'Device Carrier',
                value: 'most_recent_device_carrier',
                description: 'Most recent device carrier',
                template: '{{ ${most_recent_device_carrier} }}'
            }
        ]
    },
    {
        label: 'Event Properties',
        options: [
            {
                label: 'Custom Event Property',
                value: 'event_property',
                description: 'Custom event property (specify name)',
                template: '{{ event_properties.${PROPERTY_NAME} }}'
            }
        ]
    }
];

export const DEFAULT_VALUES = {
    first_name: 'Valued User',
    last_name: 'Customer',
    email_address: 'user@example.com',
    language: 'en',
    country: 'US',
    custom_default: 'Default Value'
};