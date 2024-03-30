import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MylambdaStack } from './lambda-stack';

export class MyPipelineAppStage extends cdk.Stage {

    constructor(scope: Construct, stageName: string, props?: cdk.StageProps) {
        super(scope,stageName, props);

        const lambdaStack = new MylambdaStack(this, 'LambdaStack', stageName);
    }
}