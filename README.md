# AO Web/App Automation Framework

This is the automation framework for Australian Open Website and IOS/Android mobile Application. Extended documentation can be found on the following [confluence link](https://tennisaustralia.atlassian.net/wiki/spaces/DAWATR/pages/2424111285/Functional+-+Automation).

# AO App

## Dependencies to run the tests

### iOS

To run APP test scenarios on iOS devices

#### BrowserStack

Test execution can be directed to BrowserStack

- Make sure to have an active Browserstack account
- Your Browserstack username and access key is required
- The .ipa file for the ios app would be required

#### Local

All tests can be run on a local machine.

- Please follow the documentation on [confluence](https://tennisaustralia.atlassian.net/wiki/spaces/DAWATR/pages/2456682534/AO23+Automation+Framework+setup) for local setup

### Android

To run APP test scenarios on Android devices

#### BrowserStack

Test execution can be directed to BrowserStack

- Make sure to have an active Browserstack account
- Your Browserstack username and access key is required
- The .apk file for the Android app would be required

#### Local

All tests can be run on a local machine.

- Please follow the documentation on [confluence](https://tennisaustralia.atlassian.net/wiki/spaces/DAWATR/pages/2456682534/AO23+Automation+Framework+setup) for local setup

## Setup

**1. Ensure NodeJS and NPM are installed**

- Check with

```bash
node --version
npm --version
```

- If they are not installed then get them from [here](https://nodejs.org/en/download/) and follow the instructions. Run the above commands again to ensure they are installed

**2. Ensure yarn is installed**

- Check with

```bash
yarn --version
```

- If it is not installed, install it globally with

```bash
npm install --global yarn
```

**3. Clone the repository**

- Get it from <https://github.com/TennisAustralia/ao-test-automation>

**4. Install dependencies from the root of the repo**

```bash
cd AO-TEST-AUTOMATION
yarn
```

**5. Create a .env file in the root of the repo**

We create .env to assist development when setting or changing environment variables on the fly without having to set them at the OS level. This file contains the environment variables that will be used during the creation of test cases.
|**DON'T ADD .env TO A GIT REPO.**
|--------------------------------------|
|_Make sure that .gitignore contains an entry for .env before creating the file_

For Browserstack tests, make sure to have an active Browserstack account. Note that the required browserstack details (username and access key) are NOT your login details. To find the username and access key, login to the browserstack website -> click automate in the navigation bar -> click "Access Key" in the header.

### iOS

#### BrowserStack

The following variables need to be set in .env file in order to run test scenarios directed to BrowserStack

```bash
BROWSERSTACK_USERNAME=<YOUR_BROWSERSTACK_USERNAME>
BROWSERSTACK_ACCESS_KEY=<YOUR_BROWSERSTACK_ACCESS_KEY>
BROWSERSTACK_APP_ID=<YOUR_BROWSERSTACK_APP_ID>
CAPABILITIES=<CAPABILITIES_ARRAY>
RELEASE_TYPE=<APP_RELEASE_TYPE>
API_USER_NAME=<API Basic Auth username>
API_PASSWORD=<API Basic Auth password>
```

- **BROWSERSTACK_USERNAME** -> Mandatory. Username for your browserstack account
- **BROWSERSTACK_ACCESS_KEY** -> Mandatory. Access key for your browserstack account
- **BROWSERSTACK_APP_ID** -> Mandatory. App ID generated after uploading .ipa file to browserstack
- **CAPABILITIES** -> Mandatory. Array of devices to run the automation suite on
  Capabilities example, [{"device":"iphone 12","os_version": "14"},{"device": "iPhone 13","os_version": "15"}]
- **RELEASE_TYPE** -> Mandatory. Which AO APP release type, 'dev' or 'prod'
  Navigating to the APP landing page varies depending on the release type.
- **API_USER_NAME** -> Optional. Username for API basic authentication
- **API_PASSWORD** -> Optional. Password for API basic authentication

#### Local

The following variables need to be set in .env file in order to run test scenarios in your local machine

```bash
PLATFORM_VERSION=<YOUR_PLATFORM_VERSION>
DEVICE_NAME=<YOUR_DEVICE_NAME>
IOS_APP_PATH=<YOUR_LOCAL_IOS_APP_PATH>
RELEASE_TYPE=<APP_RELEASE_TYPE>
API_USER_NAME=<API Basic Auth username>
API_PASSWORD=<API Basic Auth password>
```

- **PLATFORM_VERSION** -> Mandatory. Platform version for your simulator
- **DEVICE_NAME** -> Mandatory. Device name for your simulator
- **IOS_APP_PATH** -> Mandatory. Local path to the .app or .ipa file on your computer
- **RELEASE_TYPE** -> Mandatory. Which AO APP release type, 'dev' or 'prod'
  Navigating to the APP landing page varies depending on the release type
- **API_USER_NAME** -> Optional. Username for API basic authentication
- **API_PASSWORD** -> Optional. Password for API basic authentication

### Android

#### BrowserStack

The following variables need to be set in .env file in order to run test scenarios directed to BrowserStack

```bash
BROWSERSTACK_USERNAME=<YOUR_BROWSERSTACK_USERNAME>
BROWSERSTACK_ACCESS_KEY=<YOUR_BROWSERSTACK_ACCESS_KEY>
BROWSERSTACK_APP_ID=<YOUR_BROWSERSTACK_APP_ID>
CAPABILITIES=<CAPABILITIES_ARRAY>
RELEASE_TYPE=<APP_RELEASE_TYPE>
API_USER_NAME=<API Basic Auth username>
API_PASSWORD=<API Basic Auth password>
```

- **BROWSERSTACK_USERNAME** -> Mandatory. Username for your browserstack account
- **BROWSERSTACK_ACCESS_KEY** -> Mandatory. Access key for your browserstack account
- **BROWSERSTACK_APP_ID** -> Mandatory. App ID generated after uploading .apk file to browserstack
- **CAPABILITIES** -> Mandatory. Array of devices to run the automation suite on
  Capabilities example, [{"device":"Samsung Galaxy S21","os_version": "11"},{"device": "Samsung Galaxy S22","os_version": "12"}]
- **RELEASE_TYPE** -> Mandatory. Which AO APP release type, 'dev' or 'prod'
  Navigating to the APP landing page varies depending on the release type
- **API_USER_NAME** -> Optional. Username for API basic authentication
- **API_PASSWORD** -> Optional. Password for API basic authentication

#### Local

The following variables need to be set in .env file in order to run test scenarios in your local machine

```bash
PLATFORM_VERSION=<YOUR_PLATFORM_VERSION>
DEVICE_NAME=<YOUR_DEVICE_NAME>
ANDROID_APP_PATH=<YOUR_LOCAL_ANDROID_APP_PATH>
RELEASE_TYPE=<APP_RELEASE_TYPE>
API_USER_NAME=<API Basic Auth username>
API_PASSWORD=<API Basic Auth password>
```

- **PLATFORM_VERSION** -> Mandatory. Platform version for your simulator
- **DEVICE_NAME** -> Mandatory. Device name for your simulator
- **ANDROID_APP_PATH** -> Mandatory. Local path to the .apk file on your computer
- **RELEASE_TYPE** -> Mandatory. Which AO APP release type, 'dev' or 'prod'
  Navigating to the APP landing page varies depending on the release type
- **API_USER_NAME** -> Optional. Username for API basic authentication
- **API_PASSWORD** -> Optional. Password for API basic authentication

**6. Running the automation suite**

Run one of the following commands to trigger the automation suite

### iOS

To run all the test scenarios tagged as @Ios

#### BrowserStack

In order to run test scenarios directed to BrowserStack

```bash
yarn app-ios-test-bs
```

#### Local

In order to run test scenarios in your local machine

```bash
yarn app-ios-test-local
```

### Android

To run all the test scenarios tagged as @Android

#### BrowserStack

In order to run test scenarios directed to BrowserStack

```bash
yarn app-android-test-bs
```

#### Local

In order to run test scenarios in your local machine

```bash
yarn app-android-test-local
```

# AO Web

### Browserstack & Local

**1. Ensure NodeJS and NPM are installed and up to date**
  - Check with 
  ```bash
  node --version
  npm --version
  ```
  - If they are not installed then get them from [here](https://nodejs.org/en/download/) and follow the instructions. Run the above commands again to ensure they are installed and up to date

**2. Ensure yarn is installed**

- Check with

```bash
yarn --version
```

- If it is not installed, install it globally with

```bash
npm install --global yarn
```

**3. Clone the repository**

- Get it from <https://github.com/TennisAustralia/ao-test-automation>

**4. Install dependencies**

```bash
cd AO-TEST-AUTOMATION
yarn
```

**5. Ensure the chromedriver version matches your current version of chrome**
  - Chromedriver version can be found in the `package.json` file in the root directory.
  - Chrome version can be found by clicking the kebab menu button (three dots) in top right -> Settings -> About Chrome. Chrome can also be updated from here.
  - Ensure the **major version** matches, minor version/build number matching is not necessary
  - If they do not match, go to package.json under devDependencies, change the major version of ChromeDriver under the ChromeDriver property before running `yarn` again in the root of the repository
  - E.g. change  "chromedriver": "^105.0.0" to "chromedriver": "^1xx.0.0", replacing xx with your version of Chrome


**6. Create a .env file in the root of the repo**

- We create .env to assist development when setting or changing environment variables on the fly without having to set them at the OS level. This file contains the environment variables that will be used during the creation of test cases.

| **DON'T ADD .env TO A GIT REPO.**                                               |
| ------------------------------------------------------------------------------- |
| _Make sure that .gitignore contains an entry for .env before creating the file_ |

### **BrowserStack - .env and running the automation suite**

These instructions are for **browserstack**, scroll down for local instructions.

Make sure to have an active Browserstack account. Note that the required browserstack details (username and access key) are NOT your login details. To find the username and access key, login to the browserstack website -> click automate in the navigation bar -> click "Access Key" in the header.

The following variables need to be set in .env file in order to run test scenarios directed to BrowserStack

```bash
BROWSERSTACK_USERNAME=<YOUR_BROWSERSTACK_USERNAME>
BROWSERSTACK_ACCESS_KEY=<YOUR_BROWSERSTACK_ACCESS_KEY>
WEB_URL=<AO_WEBSITE_UNDER_TEST_URL>
CAPABILITIES=<CAPABILITIES_ARRAY>
```

- **BROWSERSTACK_USERNAME** -> Mandatory. Username for your browserstack account
- **BROWSERSTACK_ACCESS_KEY** -> Mandatory. Access key for your browserstack account
- **WEB_URL** -> Mandatory. The URL of the system under test
- **CAPABILITIES** -> Mandatory. Array of devices and browser to run the automation suite on
- Capabilities example, [{"browserName": "chrome","browserVersion": "latest","bstack:options": {"os": "Windows","osVersion": "10"}}]

To run all the test scenarios tagged as @Web

In order to run test scenarios directed to BrowserStack

```bash
yarn web-test-bs
```

### **Local - .env and running the automation suite**

The following variables need to be set in .env file in order to run test scenarios in your local machine

```bash
WEB_HEADLESS=false
WEB_URL=<AO_WEBSITE_UNDER_TEST_URL>
WEB_BROWSER=chrome
WEB_WAIT=1000
```

- **WEB_HEADLESS** -> Optional. defaults to false
- **WEB_URL** -> Mandatory. The URL of the system under test
- **WEB_BROWSER** -> Mandatory. Currently supports the following values: `chrome|firefox|*` _(**\*** runs tests in all browsers at the same time)_
- **WEB_WAIT** -> Mandatory. Implicit wait in seconds for finding elements. This value should be as small as possible, and generally should not exceed 10 seconds but it is recommended to be 5 seconds or less.
- **WEB_GRID_URL** -> Optional. If a BYO grid is used (like a docker compose base one) use `http://<grid server>:<grid port>/<grid path>`. If using a cloud service like browserstack then set this value to `http://<providers user or key>:<provider password>@<provider grid server>:<grid port>/<grid path>`

In order to run test scenarios in your local machine

```bash
yarn web-test-local
```

# Test Reports

Two test reports are supported by the Framework:

- [Spec Reporter](https://webdriver.io/docs/spec-reporter)
- [Allure Reporter](https://webdriver.io/docs/spec-reporter)

## Spec Reporter

Test reporter, that prints detailed results to console.

### How to generate Spec reports

- No need to manually generate because the results will be printed to the console once the test is complete.
- [Sample report](./pngs/Sample%20Spec%20Report.PNG)

## Allure Reporter

Allure Report is a flexible, lightweight multi-language dynamic test reporting tool. It provides graphical reports and allows to extract the maximum of information from the everyday testing process.

### How to generate and open Allure reports locally

- Run the following command after the test has finished to generate and open the report

```bash
yarn report-generate
```

- To view a previously generated report, use the following command

```bash
yarn report-open
```

- [Sample report](./pngs/Sample%20Allure%20Report.PNG)

# How you can contribute to this framework

### When creating working git branches

## Please follow the following naming conventions and guidelines

### When creating working git branches

- Always create a feature branch for any change and then create a pull request to merge the changes into main.
- All PRs should be reviewed and approved by someone else before merging
- A branch should be named in the following format "[JIRA_TICKET_ID]automation-JIRA_TICKET_TITLE-APP_OR_WEB"
- for example,
  AODS-3780-automation-create_readme-app

### When creating folders

- Folder names should be **camelCase**
- e.g. thisIsAFolderNameExample

### When creating files
- File names should be **PascalCase**
- e.g. ThisIsAFileNameExample.ts

### When creating Classes

- Class names should be **PascalCase**

### When creating Variables

- Name should start with ios or android for app automation files
- The names should be **camelCase**

## When contributing to the BDD structure

- Features should be clearly distinguishable between app and web
- All feature files should be added to the feature folder at ao-test-automation/test/features
- All step files should be added to the steps folder at ao-test-automation/test/steps
- gherkin language should be used to write feature files
