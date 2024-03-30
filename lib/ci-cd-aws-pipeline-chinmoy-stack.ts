import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stage';

export class CiCdAwsPipelineChinmoyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'ChinmoyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('chinmoy-git/ci-cd-aws-pipeline-chinmoy', 'main'),
        commands: ['npm ci',
                    'npm run build',
                    'npx cdk synth']
      }),
    });

    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: {account: "590183693989", region: "us-east-1"}
    }));

    testingStage.addPost(new ManualApprovalStep('Manual approval before production'));

    const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod", {
      env: {account: "590183693989", region: "us-east-1"}
    }));
  }
}
