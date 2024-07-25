import AppBaseScreen from '../basePage/AppBaseScreen';

class AppLandingScreen extends AppBaseScreen {
  private get homeButton() {
    const androidSelector = `new UiSelector().text("Home").className("${this.androidTextViewClassName}")`;
    const iosSelector = '**/XCUIElementTypeButton[`name contains "Home"`]';
    const button = this.isAndroid
      ? $(`android=${androidSelector}`)
      : $(`-ios class chain:${iosSelector}`);
    return button;
  }

  async viewMessage(){
    const androidSelector = `new UiSelector().className("${this.androidTextViewClassName}")`;
    const label = await $(`android=${androidSelector}`);
    return label.getText();
  }

  private get continueButton() {
    const androidSelector = `new UiSelector().text("Continue").className("${this.androidTextViewClassName}")`;
    const iosSelector = '**/XCUIElementTypeOther[`label == "Continue"`]';
    const button = this.isAndroid
      ? $(`android=${androidSelector}`)
      : $(`-ios class chain:${iosSelector}`);
    return button;
  }

  async clickOnNewUpdateAvailableContinueButtonIfVisible() {
    const androidContinueSelector = 'new UiSelector().resourceId("android:id/button1")';
    const iosElementSelector = '**/XCUIElementTypeOther[`name Contains "Continue"`]';
    const button = this.isAndroid
      ? await $(`android=${androidContinueSelector}`)
      : await $(`-ios class chain:${iosElementSelector}`);
    
    try {
      await button.waitForDisplayed({ timeout: 50000 });
      await button.click();
    } catch (error) {
      // Log here, it's just that the continue button appears on dev/prod and is intermittent
    }
    
  }

  async clickContinueButton() {
    await this.continueButton.waitForDisplayed({ timeout: 5000 });
    await this.continueButton.click();
  }

  async clickSkipButton() {
    const androidContinueSelector = `new UiSelector().text("Skip").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = '**/XCUIElementTypeOther[`label == "Skip"`]';
    const button = this.isAndroid
      ? await $(`android=${androidContinueSelector}`)
      : await $(`-ios class chain:${iosElementSelector}`);
    await button.waitForDisplayed({ timeout: 50000 });
    await button.click();
  }

  async clickOnAllowButtonIfVisible(): Promise<void> {
    try {    
      const allowButton = await $(`~Allow`);
      await allowButton.waitForDisplayed({ timeout: 5000 });
      await allowButton.click();
    } catch (error) {
      // Log here, it's just that the allow all setting appears on dev/prod and is intermittent
    }
  }

  async goToHomeScreen(): Promise<boolean> {
    const androidSelector = `new UiSelector().text("Home").className("${this.androidTextViewClassName}")`;
    // const androidSelector = `new UiSelector().text("Home").className("android.widget.TextView")`;
    const iosHomeSelector = '**/XCUIElementTypeButton[`label == "Home, tab, 1 of 5"`]';

    
    await this.clickOnNewUpdateAvailableContinueButtonIfVisible();

    // if (this.releaseType === 'dev') {
      
    //   if (this.isAndroid) {
    //     await this.homeButton.waitForDisplayed({ timeout: 100000 });
    //     return this.homeButton.isDisplayed();
    //   }
    //   await this.clickOnAllowButtonIfVisible();
    //   await browser.waitUntil(async () => (await this.homeButton).isDisplayed());
    // }
    // if (this.releaseType === 'prod') {
      // Click Continue on acknowledgement widget
      await this.clickContinueButton();
      // Click Skip on Favourite players widget
      await this.clickSkipButton();
      // Click Skip on Notifications & Preferences widget
      await this.clickContinueButton();
      await this.clickContinueButton();
      
      await this.clickOnAllowButtonIfVisible();

      if (this.isAndroid) {
        await this.homeButton.waitForDisplayed({ timeout: 5000 });
        return this.homeButton.isDisplayed();
      }
      
      await browser.waitUntil(async () => (await this.homeButton).isDisplayed());
    // }

    if (
      this.isAndroid
        ? await $(`android=${androidSelector}`).isDisplayed()
        : await (await $(`-ios class chain:${iosHomeSelector}`)).isExisting()
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.isAndroid
        ? await (await $(`android=${androidSelector}`)).click()
        : await (await $(`-ios class chain:${iosHomeSelector}`)).click();
      return true;
    }
    return this.homeButton.isDisplayed();
  }

  async goBackToHomeScreen(): Promise<void> {
    await this.homeButton.click();
  }

  async goToLandingPage(){
    
    if (this.releaseType === 'dev') {
      // Click Continue on update widget and wait until app refresh
      await this.clickOnNewUpdateAvailableContinueButtonIfVisible();
    }
    return this.continueButton.isDisplayed();
    
  }

}
export default new AppLandingScreen();
