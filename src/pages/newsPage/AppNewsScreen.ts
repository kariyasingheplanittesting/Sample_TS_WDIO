import AppBaseScreen from '../basePage/AppBaseScreen';

class AppNewsScreen extends AppBaseScreen {
  private iosSelector = '**/XCUIElementTypeOther[`label == "Australian Open Tennis News | AO"`]';

  private get newsContentContainer() {
    const androidSelector = `new UiSelector().resourceId("block-ausopen-official-content")`;
    const element = this.isAndroid
      ? $(`android=${androidSelector}`)
      : $(`-ios class chain:${this.iosSelector}`);
    return element;
  }

  private get newsBanner() {
    const androidSelector =
      'new UiSelector().textContains("News | AO").className("android.webkit.WebView")';
    const element = this.isAndroid
      ? $(`android=${androidSelector}`)
      : $(`-ios class chain:${this.iosSelector}`);
    return element;
  }

  async isNewsContentDisplayed(): Promise<boolean> {
    await browser.waitUntil(async () => (await this.newsContentContainer).isExisting());
    const isDisplayed = (await this.newsBanner).isDisplayed();
    return isDisplayed;
  }
}
export default new AppNewsScreen();
