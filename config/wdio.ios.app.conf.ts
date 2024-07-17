var { config } = require('./wdio.shared.conf.ts');

config.port = 4723;
config.path = '/wd/hub';
config.runner = 'local';
config.maxInstances = 1;
config.capabilities = [
  {
    platformName: "iOS",
    platformVersion: process.env.PLATFORM_VERSION || '',
    deviceName: process.env.DEVICE_NAME || '',
    app: process.env.IOS_APP_PATH || "",
    automationName: "XCUITest",
    maxInstances:1,
    orientation: 'PORTRAIT',
    autoGrantPermissions: true,
  }
];
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
