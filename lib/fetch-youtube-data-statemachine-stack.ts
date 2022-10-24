import { Construct } from 'constructs';
import {
  Stack,
  StackProps,
  aws_lambda_nodejs as lambda,
  Duration,
  aws_stepfunctions_tasks as tasks,
  aws_stepfunctions as stepfunctions
} from 'aws-cdk-lib';

class FetchYoutubeDataStatemachineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fetchChannelFunction = new lambda.NodejsFunction(this, 'FetchChannelFunction', {
      entry: 'src/lambda/fetchChannel/app.ts',
      handler: 'handler',
      timeout: Duration.minutes(2)
    })

    const fetchVideoFunction = new lambda.NodejsFunction(this, 'FetchVideoFunction', {
      entry: 'src/lambda/fetchVideo/app.ts',
      handler: 'handler',
      timeout: Duration.minutes(2)
    })

    const fetchChannel = new tasks.LambdaInvoke(this, 'FetchChannel', {
      lambdaFunction: fetchChannelFunction,
      payload: stepfunctions.TaskInput.fromJsonPathAt('$.Payload'),
      resultPath: '$.Payload'
    })

    const fetchVideo = new tasks.LambdaInvoke(this, 'FetchVideo', {
      lambdaFunction: fetchVideoFunction,
      payload: stepfunctions.TaskInput.fromJsonPathAt('$.Payload'),
      resultPath: '$.Payload'
    })

    const definition = fetchChannel
      .next(fetchVideo)
      .next(new stepfunctions.Succeed(this, 'Succeed'))

    new stepfunctions.StateMachine(this, 'StateMachine', {
      definition
    })
  }
}

export default FetchYoutubeDataStatemachineStack
