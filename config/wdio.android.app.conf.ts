var { config } = require('./wdio.shared.conf.ts');

config.port = 4723;
config.path = '/wd/hub';
config.runner = 'local';
config.maxInstances = 1;
config.capabilities = [
  {
    platformName: 'android',
    platformVersion: process.env.PLATFORM_VERSION || '',
    deviceName: process.env.DEVICE_NAME || '',
    automationName: 'uiAutomator2',
    app: process.env.ANDROID_APP_PATH || "",
    autoGrantPermissions: true,
  }
];

config.before= function () {
    if (process.env.RELEASE_TYPE === 'dev') {
      global.resourceIdEnv = '.dev';
    } else global.resourceIdEnv = '';
  };

config.services = [
  [
    'appium',
    {
      args: {
        relaxedSecurity: true,
        address: 'localhost',
        port: 4723
       },
      command: 'appium'
    }
  ]
];

exports.config = config;
