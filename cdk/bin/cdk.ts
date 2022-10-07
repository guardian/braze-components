import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { BrazeComponents } from '../lib/braze-components';

const app = new App();
const cloudFormationStackName = process.env.GU_CFN_STACK_NAME;
new BrazeComponents(app, 'BrazeComponents-PROD', {
    stack: 'targeting',
    stage: 'PROD',
    cloudFormationStackName,
    domainName: 'braze-components.gutools.co.uk',
    tlsCertId: 'eca82256-dff4-4b0a-80d6-7f884a1ee92d',
});
new BrazeComponents(app, 'BrazeComponents-CODE', {
    stack: 'targeting',
    stage: 'CODE',
    cloudFormationStackName,
    domainName: 'braze-components.code.dev-gutools.co.uk',
    tlsCertId: '1df4da51-49e5-4dd4-b136-3c5e1cac9d64',
});
