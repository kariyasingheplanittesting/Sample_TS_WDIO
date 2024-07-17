var { config } = require('./wdio.shared.conf.ts');

config.user = process.env.BROWSERSTACK_USERNAME || '';
config.key = process.env.BROWSERSTACK_ACCESS_KEY || '';

config.commonCapabilities = {
  project: "AO IOS Test Automation",
  build: 'Webdriverio iOS Parallel',
  name: 'parallel_test',
  maxInstances: 5,
  allowDeviceMockServer: "true",
  app: process.env.BROWSERSTACK_APP_ID || '',
  'browserstack.debug': true,
  'autoAcceptAlerts': 'true',
  'settings[snapshotMaxDepth]': 500
}

config.capabilities = JSON.parse(process.env.CAPABILITIES) || [{}];

config.updateJob= false;

exports.config = config;

// Code to support common capabilities
exports.config.capabilities.forEach((caps)=> {
  for(const i in exports.config.commonCapabilities)
  { 
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
  }
});
