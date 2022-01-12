import type { CloudFrontWebDistributionProps } from '@aws-cdk/aws-cloudfront';
import { CloudFrontWebDistribution } from '@aws-cdk/aws-cloudfront';
import type { GuStack } from '@guardian/cdk/lib/constructs/core';
import type { GuMigratingResource } from '@guardian/cdk/lib/constructs/core/migrating';
import { GuMigratableConstruct } from '@guardian/cdk/lib/utils/mixin';

export interface GuCloudFrontWebDistributionProps
    extends GuMigratingResource,
        CloudFrontWebDistributionProps {}

export class GuCloudFrontWebDistribution extends GuMigratableConstruct(CloudFrontWebDistribution) {
    constructor(scope: GuStack, id: string, props: GuCloudFrontWebDistributionProps) {
        super(scope, id, props);
    }
}
