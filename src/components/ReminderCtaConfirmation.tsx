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
    success: boolean;
    label: string;
    onClose: () => void;
};

export const ReminderCtaConfirmation = ({
    success,
    label,
    onClose,
}: ReminderCtaConfirmationProps): JSX.Element => {
    if (success) {
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
                <h4 css={successHeadingStyles}>Thank you! Your reminder is set.</h4>
                <p css={successTextStyles}>
                    Okay, we&apos;ll send you an email in {label}. You can manage your email
                    preferences in the My Account area,{' '}
                    <a href="https://manage.theguardian.com/email-prefs">
                        emails and marketing section
                    </a>
                    .
                </p>
            </div>
        );
    }

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
            <h4 css={successHeadingStyles}>Something went wrong</h4>
            <p css={successTextStyles}>Sorry, we were not able to sign you up for a reminder.</p>
        </div>
    );
};
