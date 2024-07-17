import AppBaseScreen from '../basePage/AppBaseScreen';

class AppDrawsScreen extends AppBaseScreen {
  async clickRoundButton(round = 'R1'): Promise<void> {
    const iosElementSelector = `**/XCUIElementTypeOther[\`label == "${round}"\`]/XCUIElementTypeOther[1]/XCUIElementTypeOther`;

    if (this.isAndroid) {
      // Don't have anything to grab on the rounds buttons
    } else {
      await $(`-ios class chain:${iosElementSelector}`).click();
    }
  }

  async clickMatchDropdownAndChose(matchType: string): Promise<void> {
    const androidDropDownSelector = `new UiSelector().textContains("Men's Singles").className("${this.androidTextViewClassName}")`;
    const androidPlayerSelector = `new UiSelector().textContains("${matchType}").className("${this.androidTextViewClassName}")`;
    const iosElementDropDownSelector = '**/XCUIElementTypeOther[`label == "Men\'s Singles "`]';
    const iosElementSelector = `**/XCUIElementTypeOther[\`label == "${matchType}"\`]`;

    if (this.isAndroid) {
      $(`android=${androidDropDownSelector}`).click();
      $(`android=${androidPlayerSelector}`).click();
    } else {
      await (await $(`-ios class chain:${iosElementDropDownSelector}`)).doubleClick();
      await $(`-ios class chain:${iosElementSelector}`).click();
    }
  }
}
export default new AppDrawsScreen();
