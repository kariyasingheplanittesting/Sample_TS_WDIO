var {
  config,
  calculateCapabilities,
  readEnvironmentVariables,
  calculateConfigParameters,
} = require('./wdio.shared.conf.ts');

config.runner = 'local';
config.port = 4723;
config.maxInstances = 10;

/**
 * Load configuration from environment variables
 * See: https://12factor.net/config
 */
const { WEB_GRID_URL, WEB_HEADLESS, WEB_BROWSER, WEB_URL, WEB_WAIT } =
  readEnvironmentVariables();

/* Calculate other config parameters based on environment variables */
const {
  GRID_HOST,
  GRID_PORT,
  GRID_PATH,
  SELENIUM_STANDALONE_SERVICE,
  RESULTS_FOLDER,
} = calculateConfigParameters(WEB_GRID_URL);

/**
 * Capabilities avaialable.
 * These are here so that the appropiate capability can be
 * determined from the WEB_BROWSER environment variable
 */
const CAPABILITIES = calculateCapabilities(WEB_BROWSER, WEB_HEADLESS);

config.capabilities = CAPABILITIES;
config.hostname = GRID_HOST;
config.port = GRID_PORT;
config.path = GRID_PATH;
config.baseUrl = WEB_URL;
config.waitforTimeout = WEB_WAIT;

/**
 * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
 * beforeEach in Mocha)
 */
// beforeHook: function (test, context) {
// },
/**
 * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
 * afterEach in Mocha)
 */
// afterHook: function (test, context, { error, result, duration, passed, retries }) {
// },
/**
 *
 * Runs before a Cucumber Scenario.
 * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
 * @param {Object}                 context  Cucumber World object
 */
// (config.beforeScenario = function (world, context) {
//   browser.url(WEB_URL);
//   browser.maximizeWindow();
// }),
/**
 * Function to be executed after a test (in Mocha/Jasmine only)
 * @param {Object}  test             test object
 * @param {Object}  context          scope object the test was executed with
 * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
 * @param {Any}     result.result    return object of test function
 * @param {Number}  result.duration  duration of test
 * @param {Boolean} result.passed    true if test has passed, otherwise false
 * @param {Object}  result.retries   informations to spec related retries, e.g. `{ attempts: 0, limit: 0 }`
 */
  config.afterScenario = function(world, context, {error, result, duration, passed, retries}) {
  if (error !== undefined) {
      const name = `ERROR-${world.title}-${Date.now()}`;
      browser.saveScreenshot(`./${RESULTS_FOLDER}/${name}.png`);
  }
  browser.deleteAllCookies();
  browser.execute('window.localStorage.clear()');
},
  (config.updateJob = false);
config.services = ['chromedriver'];

exports.config = config;