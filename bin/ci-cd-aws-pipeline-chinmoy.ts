#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CiCdAwsPipelineChinmoyStack } from '../lib/ci-cd-aws-pipeline-chinmoy-stack';

const app = new cdk.App();
new CiCdAwsPipelineChinmoyStack(app, 'CiCdAwsPipelineChinmoyStack', {
  env: {
    account: '590183693989',
    region: 'us-east-1',
  }
});

app.synth();