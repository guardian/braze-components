import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import { Context } from 'aws-lambda';
import { format } from '@guardian/image';

const SALT = process.env.IMAGE_SALT;

const app = express();
app.use(express.json());

app.get('/healthcheck', (req: express.Request, res: express.Response) => {
    res.header('Content-Type', 'text/plain');
    res.send('OK');
});

app.post('/signImage', (req: express.Request, res: express.Response) => {
    const { imageUrl } = req.body;

    const profile = {
        width: 600,
        quality: 45,
    };

    const signedUrl = format(imageUrl, SALT, profile);

    res.send({ signedUrl });
});

const PORT = process.env.PORT || 3030;

console.log('NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
} else {
    const server = awsServerlessExpress.createServer(app);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exports.handler = (event: any, context: Context): void => {
        awsServerlessExpress.proxy(server, event, context);
    };
}

export { app };
