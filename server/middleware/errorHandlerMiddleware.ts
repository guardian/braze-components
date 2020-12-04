import express from 'express';
import { PanDomainAuthError } from './guPanDomainAuthMiddleware';

const errorHandlerMiddleware = (
    error: Error,
    req: express.Request,
    res: express.Response,
    // Error handling middleware in Express needs to take 4 arguments in the handler
    // for it to run when `next()` function is called in the route handler
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction,
): void => {
    const { message } = error;

    switch (error.constructor) {
        case PanDomainAuthError:
            res.status(401).send({ error: message });
            break;
        default:
            res.status(500).send({ error: message });
    }

    console.log('Something went wrong: ', message);
};

export { errorHandlerMiddleware };
