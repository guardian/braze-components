import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { BrazeComponents } from './braze-components';

describe('The BrazeComponents stack', () => {
    it('matches the snapshot', () => {
        const app = new App();
        const stack = new BrazeComponents(app, 'BrazeComponents', {
            stack: 'targeting',
            stage: 'TEST',
            domainName: 'braze-components.test.dev-gutools.co.uk',
            tlsCertId: 'xxx-xxx-xxx',
        });
        const template = Template.fromStack(stack);
        expect(template.toJSON()).toMatchSnapshot();
    });
});
