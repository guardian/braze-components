import { join } from 'path';
import { CfnInclude } from '@aws-cdk/cloudformation-include';
import type { App } from '@aws-cdk/core';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack, GuStageParameter } from '@guardian/cdk/lib/constructs/core';

export class BrazeComponents extends GuStack {
    constructor(scope: App, id: string, props: GuStackProps) {
        super(scope, id, { ...props, withoutTags: true });
        const yamlTemplateFilePath = join(__dirname, '../..', 'cloudformation.yaml');
        new CfnInclude(this, 'YamlTemplate', {
            templateFile: yamlTemplateFilePath,
            parameters: {
                Stage: GuStageParameter.getInstance(this),
            },
        });
    }
}
