import express from 'express';
import {
    PanDomainAuthentication,
    AuthenticationStatus,
    guardianValidation,
} from '@guardian/pan-domain-node';

class PanDomainAuthError extends Error {}

const pandaKeyFilename = 'keyFileName';

const panda = new PanDomainAuthentication(
    'someCookieName', // cookie name
    'eu-west-1', // AWS region
    'settingsBucketName', // Settings bucket
    pandaKeyFilename,
    guardianValidation,
);

const validatePanAuthCookie = async (cookieHeader: string | undefined) => {
    if (cookieHeader) {
        try {
            const { status } = await panda.verify(cookieHeader);

            if (status === AuthenticationStatus.AUTHORISED) {
                return;
            }
        } catch (e) {
            console.log('Error verifying panda cookie', e);
        }
    }

    throw new PanDomainAuthError('Not a valid Panda user');
};

const guPanDomainAuthMiddleware = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): Promise<void> => {
    try {
        await validatePanAuthCookie(req.headers['cookie']);
        next();
    } catch (e) {
        next(e);
    }
};

export { guPanDomainAuthMiddleware, PanDomainAuthError };
