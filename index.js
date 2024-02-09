const { CodePipeline } = require("@aws-sdk/client-codepipeline");
const core = require("@actions/core");

try {
  const awsRegion = core.getInput("aws-region");
  const awsAccessKey = core.getInput("aws-access-key");
  const awsSecretKey = core.getInput("aws-secret-key");
  const pipelineName = core.getInput("pipeline-name");
  const failOnError = core.getBooleanInput("fail-on-error");

  const codepipeline = new CodePipeline({
    region: awsRegion,
    credentials: {
      accessKeyId: awsAccessKey,
      secretAccessKey: awsSecretKey,
    },
  });

  const pipeline = {
    name: pipelineName,
  };

  codepipeline.startPipelineExecution(pipeline, function (err, okData) {
    if (err) {
      core.error(err, err.stack);
      if (failOnError) {
        core.setFailed(`Action failed with error ${err}`);
      }
    } else {
      core.info(okData.pipelineExecutionId);
      core.setOutput("codepipeline-execution-id", okData.pipelineExecutionId);
    }
  });
} catch (error) {
  core.error(error.message);
  core.setFailed(error.message);
}
