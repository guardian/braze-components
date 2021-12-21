import { join } from 'path';
import type { CfnDistribution } from '@aws-cdk/aws-cloudfront';
import { CloudFrontWebDistribution, OriginAccessIdentity } from '@aws-cdk/aws-cloudfront';
import { Bucket } from '@aws-cdk/aws-s3';
import { CfnInclude } from '@aws-cdk/cloudformation-include';
import type { App } from '@aws-cdk/core';
import { Duration } from '@aws-cdk/core';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack, GuStageParameter } from '@guardian/cdk/lib/constructs/core';
import { GuCname } from '@guardian/cdk/lib/constructs/dns';

export class BrazeComponents extends GuStack {
    constructor(scope: App, id: string, props: GuStackProps) {
        super(scope, id, props);
        const yamlTemplateFilePath = join(__dirname, '../..', 'cloudformation.yaml');
        const template = new CfnInclude(this, 'YamlTemplate', {
            templateFile: yamlTemplateFilePath,
            parameters: {
                Stage: GuStageParameter.getInstance(this),
            },
        });

        const oldCloudfrontDist = template.getResource('CDN') as CfnDistribution;

        new GuCname(this, 'DNS entry', {
            app: 'braze-components',
            domainNameProps: {
                CODE: { domainName: 'braze-components.code.dev-gutools.co.uk' },
                PROD: { domainName: 'braze-components.gutools.co.uk' },
            },
            resourceRecord: oldCloudfrontDist.getAtt('DomainName').toString(),
            ttl: Duration.hours(1),
        });

        const bucketNameFromStaticCloudformationStack = 'braze-components-storybook';
        const sourceBucket = Bucket.fromBucketName(
            this,
            'braze-components-bucket',
            bucketNameFromStaticCloudformationStack,
        );

        const originAccessIdFromStaticCloudformationStack = 'E3EA9DC41190PP';
        const originAccessIdentity = OriginAccessIdentity.fromOriginAccessIdentityName(
            this,
            'braze-components-origin-access-identity',
            originAccessIdFromStaticCloudformationStack,
        );

        new CloudFrontWebDistribution(this, 'braze-components-cloudfront', {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: sourceBucket,
                        originAccessIdentity,
                        originPath: `/${this.stage}/braze-components-storybook-static`,
                    },
                    behaviors: [{ isDefaultBehavior: true }],
                },
            ],
        });
    }
}
