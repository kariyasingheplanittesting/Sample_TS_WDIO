var { config } = require('./wdio.shared.conf');
var {envVars} = require('./wdio.validate.app.conf');

config.user = process.env.BROWSERSTACK_USERNAME || '';
config.key = process.env.BROWSERSTACK_ACCESS_KEY || '';

config.capabilities = JSON.parse(process.env.CAPABILITIES) || [{}];

config.commonCapabilities = {
  project: "AO Android Test Automation",
    build: 'Webdriverio Android Parallel',
    name: 'parallel_test',
    allowDeviceMockServer: "true",
    app: process.env.BROWSERSTACK_APP_ID || '',
    maxInstances: 5,
    'browserstack.debug': true,
    'autoAcceptAlerts': 'true'
};

config.before= function () {
  if (process.env.RELEASE_TYPE === 'dev') {
    global.resourceIdEnv = '.dev';
  } else global.resourceIdEnv = '';
};

config.updateJob= false;

exports.config = config;

// Code to support common capabilities
exports.config.capabilities.forEach((caps)=> {
  // eslint-disable-next-line guard-for-in
  for(const i in exports.config.commonCapabilities)
  { 
    // eslint-disable-next-line no-param-reassign
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
  }
});
