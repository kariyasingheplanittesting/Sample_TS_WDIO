import AppBaseScreen from '../basePage/AppBaseScreen';

class AppScoresScreen extends AppBaseScreen {
  private get noLiveMatchesBanner() {
    const androidSelector = `new UiSelector().text("No Live Matches").className("${this.androidTextViewClassName}")`;
    const iosSelector = '**/XCUIElementTypeOther[`label contains "No Live Matches"`]';
    const element = this.isAndroid
      ? $(`android=${androidSelector}`)
      : $(`-ios class chain:${iosSelector}`);
    return element;
  }

  async isLiveContentDisplayed(): Promise<boolean> {
    if (!(await this.noLiveMatchesBanner).isDisplayed()) {
      return true;
    }
    return false;
  }
}
export default new AppScoresScreen();
