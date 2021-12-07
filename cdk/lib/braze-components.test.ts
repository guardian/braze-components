import '@aws-cdk/assert/jest';
import { SynthUtils } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';
import { BrazeComponents } from './braze-components';

describe('The BrazeComponents stack', () => {
    it('matches the snapshot', () => {
        const app = new App();
        const stack = new BrazeComponents(app, 'BrazeComponents', { stack: 'targeting' });
        expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
    });
});
