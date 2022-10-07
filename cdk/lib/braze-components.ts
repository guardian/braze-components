import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuCname } from '@guardian/cdk/lib/constructs/dns';
import type { App } from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import {
    CloudFrontWebDistribution,
    OriginAccessIdentity,
    ViewerCertificate,
} from 'aws-cdk-lib/aws-cloudfront';
import { Bucket } from 'aws-cdk-lib/aws-s3';

export interface BrazeComponentsStackProps extends GuStackProps {
    tlsCertId: string;
    domainName: string;
}
export class BrazeComponents extends GuStack {
    constructor(scope: App, id: string, props: BrazeComponentsStackProps) {
        super(scope, id, props);

        const bucketNameFromStaticCloudformationStack = 'braze-components-storybook';
        const sourceBucket = Bucket.fromBucketName(
            this,
            'braze-components-bucket',
            bucketNameFromStaticCloudformationStack,
        );

        const originAccessIdFromStaticCloudformationStack = 'E3EA9DC41190PP';
        const originAccessIdentity = OriginAccessIdentity.fromOriginAccessIdentityId(
            this,
            'braze-components-origin-access-identity',
            originAccessIdFromStaticCloudformationStack,
        );

        const certificate = Certificate.fromCertificateArn(
            this,
            'braze-components-cert',
            `arn:aws:acm:us-east-1:${this.account}:certificate/${props.tlsCertId}`,
        );

        const cloudFrontDist = new CloudFrontWebDistribution(this, 'braze-components-cloudfront', {
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
                aliases: [props.domainName],
            }),
        });

        this.overrideLogicalId(cloudFrontDist, {
            logicalId: 'CDN',
            reason: 'We are adopting the existing CloudFront dist so that we can migrate to CDK without downtime.',
        });

        new GuCname(this, 'DNS entry', {
            app: 'braze-components',
            domainName: props.domainName,
            resourceRecord: cloudFrontDist.distributionDomainName,
            ttl: Duration.hours(1),
        });
    }
}
