var { config } = require('./wdio.shared.conf.ts');

config.user = process.env.BROWSERSTACK_USERNAME || '';
config.key = process.env.BROWSERSTACK_ACCESS_KEY || '';
config.baseUrl = process.env.WEB_URL || 'https://automation-7oxbj4.ausopen.com/';
config.commonCapabilities = {
  'bstack:options': {
    buildName: 'ao-web-browserstack-build',
  },
};

config.capabilities = JSON.parse(process.env.CAPABILITIES) || [{}];

config.updateJob = false;

exports.config = config;

// Code to support common capabilities
exports.config.capabilities.forEach((caps) => {
  // eslint-disable-next-line guard-for-in
  for (const i in exports.config.commonCapabilities) {
    // eslint-disable-next-line no-param-reassign
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
  }
});
