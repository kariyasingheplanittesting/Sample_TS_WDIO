import * as dotenv from 'dotenv';
import Allure from '@wdio/allure-reporter';

dotenv.config({ path: `${__dirname}/../.env` });

exports.config = {
  specs: ['./test/features/**/*.feature'],
  exclude: [],

  capabilities: [{}],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      project: './tsconfig.json',
    },
  },

  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'cucumber',

  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    // <string[]> (file/dir) require files before executing features
    require: ['./test/steps/**/*.ts'],
    // <boolean> show full backtrace for errors
    backtrace: false,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    requireModule: ['tsconfig-paths/register'],
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    // <boolean> abort the run on first failure
    failFast: false,
    // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    format: ['pretty'],
    // <boolean> hide step definition snippets for pending steps
    snippets: true,
    // <boolean> hide source uris
    source: true,
    // <boolean> fail if there are any undefined or pending steps
    strict: false,
    // <string> (expression) only execute the features or scenarios with tags matching the expression
    tagExpression: '',
    // <number> timeout for step definitions
    timeout: 100000,
    // <boolean> Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: false,
  },
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: true,
      },
    ],
  ],
  beforeScenario() {
    if (process.env.RELEASE_TYPE === undefined) {
      Allure.addEnvironment('Automation Type', 'Web');
      Allure.addEnvironment('Web Url', process.env.WEB_URL);
    }
    if (process.env.WEB_URL === undefined) {
      Allure.addEnvironment('Automation Type', 'App');
      Allure.addEnvironment('Release Type', process.env.RELEASE_TYPE);
    }
  },
  afterStep(uri: undefined, feature: undefined, scenario: { error: boolean }) {
    browser.takeScreenshot();
  },
};

export function calculateCapabilities(browser: string, headless: string[]) {
  const availableCapabilities = [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--disable-gpu',
          '--no-sandbox',
          '--disable-impl-side-painting',
          '--disable-gpu-sandbox',
          '--disable-accelerated-2d-canvas',
          '--disable-accelerated-jpeg-decoding',
          '--test-type=ui',
          ...headless,
        ],
      },
    },
    {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: [...headless],
      },
    },
    {
      browserName: 'MicrosoftEdge',
      'ms:edgeOptions': {
        args: ['window-size=1920,1080', ...headless],
      },
    },
  ];
  const CAPABILITIES =
    browser === 'all' || browser === '*'
      ? availableCapabilities
      : [availableCapabilities.find((c) => c.browserName.toLowerCase() === browser.toLowerCase())];
  return CAPABILITIES;
}

export function calculateConfigParameters(gridUrl: string) {
  const GRID_HOST = gridUrl ? gridUrl.split('/')[2].split(':')[0] : undefined;
  const GRID_PORT = gridUrl ? Number(gridUrl.split('/')[2].split(':')[1]) : undefined;
  const GRID_PATH = gridUrl ? `/` : undefined;
  const WEB_STANDALONE_SERVICE = gridUrl ? [] : ['selenium-standalone'];
  const RESULTS_FOLDER = 'tests_output';
  return { GRID_HOST, GRID_PORT, GRID_PATH, WEB_STANDALONE_SERVICE, RESULTS_FOLDER };
}

export function readEnvironmentVariables() {
  const WEB_HEADLESS =
    (process.env.WEB_HEADLESS ? process.env.WEB_HEADLESS : 'false') === 'true'
      ? ['--headless']
      : [];
  const WEB_URL = process.env.WEB_URL;
  const WEB_BROWSER = process.env.WEB_BROWSER;
  const WEB_WAIT =
    process.env.WEB_WAIT === undefined || process.env.WEB_WAIT.length === 0
      ? 1000
      : Number(process.env.WEB_WAIT) * 1000;
  const WEB_GRID_URL = process.env.WEB_GRID_URL;
  return { WEB_GRID_URL, WEB_HEADLESS, WEB_BROWSER, WEB_URL, WEB_WAIT };
}
