/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 974:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 639:
/***/ ((module) => {

module.exports = eval("require")("@aws-sdk/client-codepipeline");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const { CodePipeline } = __nccwpck_require__(639);
const core = __nccwpck_require__(974);

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

})();

module.exports = __webpack_exports__;
/******/ })()
;