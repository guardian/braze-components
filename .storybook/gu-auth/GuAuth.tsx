import React, { useState, useEffect, useRef } from 'react';
import dialogPolyfill from 'dialog-polyfill';
import { css } from '@emotion/react';
import { getLoginUrl } from '../utils';

export const overlayStyles = css`
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    height: 200px;
    width: 300px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    margin-top: -100px;
    z-index: 999;

    ::backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

export const GuAuth = () => {
    const [hasCheckedLoggedInStatus, setCheckedLoggedInStatus] = useState<boolean>(false);
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (dialogRef?.current) {
            dialogPolyfill.registerDialog(dialogRef.current);
        }
    }, [dialogRef]);

    useEffect(() => {
        if (hasCheckedLoggedInStatus) {
            dialogRef?.current?.close();
        } else {
            const alreadyOpen = dialogRef?.current?.open;

            if (!alreadyOpen) {
                dialogRef?.current?.showModal();

                // Don't close the modal on escape
                dialogRef?.current?.addEventListener('cancel', (e) => {
                    e.preventDefault();
                });
            }
        }
    }, [hasCheckedLoggedInStatus]);

    useEffect(() => {
        const handleLogin = async () => {
            const redirectToLogin = () => {
                const currentLocation = window.location.href;

                const loginUrl = `${getLoginUrl()}/login?returnUrl=${encodeURIComponent(
                    currentLocation,
                )}`;
                window.location.href = loginUrl;
            };

            try {
                const response = await fetch(`${getLoginUrl()}/whoami`, {
                    credentials: 'include',
                });

                if (response.ok) {
                    setTimeout(() => {
                        setCheckedLoggedInStatus(true);
                    }, 1000);
                } else if (response.status === 401) {
                    redirectToLogin();
                } else {
                    console.log(
                        'Something went wrong talking to login service: ',
                        response.statusText,
                    );
                }
            } catch (e) {
                // When the login service returns a 401 CORS headers are omitted, resulting in an
                // error from the fetch /whoami call above and we end up in this catch block.
                redirectToLogin();
            }
        };

        handleLogin();
    }, []);

    return (
        <dialog ref={dialogRef} css={overlayStyles}>
            Authenticating...
        </dialog>
    );
};
