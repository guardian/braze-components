import { join } from 'path';
import { Certificate } from '@aws-cdk/aws-certificatemanager';
import {
    CloudFrontWebDistribution,
    OriginAccessIdentity,
    ViewerCertificate,
} from '@aws-cdk/aws-cloudfront';
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
        new CfnInclude(this, 'YamlTemplate', {
            templateFile: yamlTemplateFilePath,
            parameters: {
                Stage: GuStageParameter.getInstance(this),
            },
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

        const tlsCertId = this.withStageDependentValue({
            app: 'braze-components',
            variableName: 'certificateId',
            stageValues: {
                PROD: 'eca82256-dff4-4b0a-80d6-7f884a1ee92d',
                CODE: '1df4da51-49e5-4dd4-b136-3c5e1cac9d64',
            },
        });

        const domainNameMappings = {
            CODE: 'braze-components.code.dev-gutools.co.uk',
            PROD: 'braze-components.gutools.co.uk',
        };

        const customDomainName = this.withStageDependentValue({
            app: 'braze-components',
            variableName: 'customDomainName',
            stageValues: domainNameMappings,
        });

        const certificate = Certificate.fromCertificateArn(
            this,
            'braze-components-cert',
            `arn:aws:acm:us-east-1:${this.account}:certificate/${tlsCertId}`,
        );

        const cloudfrontDist = new CloudFrontWebDistribution(this, 'braze-components-cloudfront', {
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
            viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
                aliases: [customDomainName],
            }),
        });

        new GuCname(this, 'DNS entry', {
            app: 'braze-components',
            domainNameProps: {
                CODE: { domainName: domainNameMappings['CODE'] },
                PROD: { domainName: domainNameMappings['PROD'] },
            },
            resourceRecord: cloudfrontDist.distributionDomainName,
            ttl: Duration.minutes(1),
        });
    }
}
