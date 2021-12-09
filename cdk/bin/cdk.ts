import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { BrazeComponents } from '../lib/braze-components';

const app = new App();
const cloudFormationStackName = process.env.GU_CFN_STACK_NAME;
new BrazeComponents(app, 'BrazeComponents', { stack: 'targeting', cloudFormationStackName });
