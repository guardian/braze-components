import React from 'react';
import { canRender, COMPONENT_NAME } from './canRender';
import { NewsletterEpic, NewsletterSubscribeCallback } from '../NewsletterEpic';

const IMAGE_URL =
    'https://i.guim.co.uk/img/media/4b8aadcdc15499e3730ce5372f305f3b30dc6858/0_0_2520_2520/2520.png?width=196&s=f1768efe97cfff31c0636b77304f4655';
//'https://i.guim.co.uk/img/media/699af09e8a6e0f921429229db0df343769254b72/0_0_1400_1400/1400.png?width=196&s=af685980d319c87fc8efcccae65c7a51';

const newsletterId = '4148';

export type BrazeMessageProps = {
    header?: string;
    frequency?: string;
    paragraph1?: string;
    paragraph2?: string;
    ophanComponentId?: string;
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    subscribeToNewsletter: NewsletterSubscribeCallback;
};

export const GreenlightNewsletterEpic: React.FC<Props> = (props: Props) => {
    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    return (
        <NewsletterEpic
            {...props}
            brazeMessageProps={{
                ...props.brazeMessageProps,
                imageUrl: IMAGE_URL,
                newsletterId,
                headingColor: 'green',
            }}
        ></NewsletterEpic>
    );
};

export { COMPONENT_NAME };
