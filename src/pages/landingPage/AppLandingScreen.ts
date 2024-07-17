import AppBaseScreen from '../basePage/AppBaseScreen';

class AppLandingScreen extends AppBaseScreen {
  private get homeButton() {
    const androidSelector = `new UiSelector().text("Home").className("${this.androidTextViewClassName}")`;
    const iosSelector = '**/XCUIElementTypeButton[`label == "Home, tab, 1 of 5"`]';
    const button = this.isAndroid
      ? $(`android=${androidSelector}`)
      : $(`-ios class chain:${iosSelector}`);
    return button;
  }

  private get continueButton() {
    const androidSelector = `new UiSelector().text("Continue").className("${this.androidTextViewClassName}")`;
    const iosSelector = '**/XCUIElementTypeOther[`label == "Continue"`]';
    const button = this.isAndroid
      ? $(`android=${androidSelector}`)
      : $(`-ios class chain:${iosSelector}`);
    return button;
  }

  async clickContinueModelButton() {
    const androidContinueSelector = 'new UiSelector().resourceId("android:id/button1")';
    const iosElementSelector = '**/XCUIElementTypeOther[`name Contains "Continue"`]';
    const button = this.isAndroid
      ? await $(`android=${androidContinueSelector}`)
      : await $(`-ios class chain:${iosElementSelector}`);
    await button.waitForDisplayed({ timeout: 50000 });
    await button.click();
  }

  async clickContinueButton() {
    await this.continueButton.waitForDisplayed({ timeout: 50000 });
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

  async clickAllowButton(): Promise<void> {
    const allowButton = await $(`//XCUIElementTypeButton[@name="Allow"]`);
    await allowButton.waitForDisplayed({ timeout: 50000 });
    await allowButton.click();
  }

  async goToHomeScreen(): Promise<boolean> {
    const androidSelector = `new UiSelector().text("Home").className("${this.androidTextViewClassName}")`;
    // const androidSelector = `new UiSelector().text("Home").className("android.widget.TextView")`;
    const iosHomeSelector = '**/XCUIElementTypeButton[`label == "Home, tab, 1 of 5"`]';

    await this.clickAllowButton();
    // await browser.waitUntil(async () => (await this.homeButton).isDisplayed());

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

    if (this.releaseType === 'prod') {
      // Click Continue on update widget and wait until app refresh
      await this.clickContinueModelButton();
      if (this.isAndroid) {
        await this.homeButton.waitForDisplayed({ timeout: 100000 });
        return this.homeButton.isDisplayed();
      }
      // await this.clickAllowButton();
      // await browser.waitUntil(async () => (await this.homeButton).isDisplayed());
    }
    if (this.releaseType === 'dev') {
      // Click Continue on acknowledgement widget
      await this.clickContinueButton();
      // Click Skip on Favourite players widget
      await this.clickSkipButton();
      // Click Skip on Notifications & Preferences widget
      await this.clickContinueButton();
      if (this.isAndroid) {
        await this.homeButton.waitForDisplayed({ timeout: 5000 });
        return this.homeButton.isDisplayed();
      }
      await this.clickAllowButton();
      await browser.waitUntil(async () => (await this.homeButton).isDisplayed());
    }
    return this.homeButton.isDisplayed();
  }

  async goBackToHomeScreen(): Promise<void> {
    await this.homeButton.click();
  }
}
export default new AppLandingScreen();
