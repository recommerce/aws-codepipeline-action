const { CodePipeline } = require("@aws-sdk/client-codepipeline");

var core = require("@actions/core");

try {
  var awsRegion = core.getInput("aws-region");
  var awsAccessKey = core.getInput("aws-access-key");
  var awssecretKey = core.getInput("aws-secret-key");
  var pipelineName = core.getInput("pipeline-name");
  var failOnError = core.getBooleanInput("fail-on-error");

  var codepipeline = new CodePipeline({
    region: awsRegion,

    credentials: {
      accessKeyId: awsAccessKey,
      secretAccessKey: awssecretKey,
    },
  });
  var pipeline = {
    name: pipelineName,
  };

  codepipeline.startPipelineExecution(pipeline, function (err, okData) {
    if (err) {
      core.error(err, err.stack);
      if (failOnError) {
        core.setFailed(`Action failed with error ${err}`);
      }
    } else {
      core.info(okData);
    }
  });
} catch (error) {
  core.error(error.message)
  core.setFailed(error.message);
}
