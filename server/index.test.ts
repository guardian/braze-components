import request from 'supertest';
import withEnv from '@shopify/with-env';

import { app } from './index';

describe('POST /signedImageUrl', () => {
    it('successfully signs a valid image URL', (done) => {
        withEnv({ IMAGE_SALT: 'abcde' }, async () => {
            const imageUrl =
                'https://media.guim.co.uk/273bca7a4a3d0a38886ea9229f7a87a6d63d723c/608_1843_5584_5584/master/5584.jpg';
            const payload = { imageUrl };

            const res = await request(app).post('/signedImageUrl').send(payload);

            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('signedUrl');
            expect(res.body.signedUrl).toEqual(
                'https://i.guim.co.uk/img/media/273bca7a4a3d0a38886ea9229f7a87a6d63d723c/608_1843_5584_5584/master/5584.jpg?width=600&quality=45&s=c313380fc1d3a06f7547dbc750b5c999',
            );

            done();
        });
    });

    it('returns 400 Bad Request given an invalid payload', async () => {
        const payload = { foo: 'bar' };

        const res = await request(app).post('/signedImageUrl').send(payload);

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
    });
});
