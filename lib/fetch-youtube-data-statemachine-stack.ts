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

    const firstFunction = new lambda.NodejsFunction(this, 'firstFunction', {
      entry: 'src/lambda/firstFunction/app.ts',
      handler: 'handler',
      timeout: Duration.minutes(2)
    })

    const secondFunction = new lambda.NodejsFunction(this, 'secondFunction', {
      entry: 'src/lambda/secondFunction/app.ts',
      handler: 'handler',
      timeout: Duration.minutes(2)
    })

    const firstTask = new tasks.LambdaInvoke(this, 'firstTask', {
      lambdaFunction: firstFunction,
      payload: stepfunctions.TaskInput.fromJsonPathAt('$.Payload'),
      resultPath: '$.Payload'
    })

    const secondTask = new tasks.LambdaInvoke(this, 'secondTask', {
      lambdaFunction: secondFunction,
      payload: stepfunctions.TaskInput.fromJsonPathAt('$.Payload'),
      resultPath: '$.Payload'
    })

    const definition = firstTask
      .next(secondTask)
      .next(new stepfunctions.Succeed(this, 'Succeed'))

    new stepfunctions.StateMachine(this, 'StateMachine', {
      definition
    })
  }
}

export default FetchYoutubeDataStatemachineStack
