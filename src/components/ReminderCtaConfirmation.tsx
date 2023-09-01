/* 
TODO - check with Marketing/Design that the proposed solution (which doesn't use this confirmation component) is sufficiently good for purpose.
- If yes, we can delete this file
- If no, then we'll need to refactor code to make use of this component in some way
*/

import React from 'react';
import { css } from '@emotion/react';
import { body, from, headline, neutral, space } from '@guardian/source-foundations';
import { Button, SvgCross } from '@guardian/source-react-components';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';

const reminderConfirmationContainerStyles = css`
    position: relative;
`;

const confirmationCloseButtonStyles = css`
    svg {
        fill: ${neutral[7]};
    }
`;

const closeButtonContainerStyles = css`
    display: none;
    position: absolute;
    top: 15px;
    right: 0;
    z-index: 99999;

    ${from.tablet} {
        display: block;
    }
`;

const successTextStyles = css`
    ${body.medium()};
    margin: 0;

    a {
        color: ${neutral[0]};
    }
`;

const successHeadingStyles = css`
    ${headline.xxsmall({ fontWeight: 'bold' })};
    margin: ${space[2]}px 0;
`;

type ReminderCtaConfirmationProps = {
    remindMeConfirmationHeaderText: string;
    remindMeConfirmationText: string;
    onClose: () => void;
};

export const ReminderCtaConfirmation = ({
    remindMeConfirmationText,
    remindMeConfirmationHeaderText,
    onClose,
}: ReminderCtaConfirmationProps): JSX.Element => {
    return (
        <div css={reminderConfirmationContainerStyles}>
            <div css={closeButtonContainerStyles}>
                <Button
                    onClick={() => onClose()}
                    icon={<SvgCross />}
                    priority="subdued"
                    size="small"
                    hideLabel
                    css={confirmationCloseButtonStyles}
                >
                    Close
                </Button>
            </div>
            <StraightLines />
            {remindMeConfirmationHeaderText && (
                <h4 css={successHeadingStyles}>{remindMeConfirmationHeaderText}</h4>
            )}
            <p css={successTextStyles}>
                {remindMeConfirmationText} You can manage your email preferences in the My Account
                area,{' '}
                <a href="https://manage.theguardian.com/email-prefs">
                    emails and marketing section
                </a>
                .
            </p>
        </div>
    );
};
