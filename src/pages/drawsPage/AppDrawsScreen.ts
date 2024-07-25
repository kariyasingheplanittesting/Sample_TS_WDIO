import AppBaseScreen from '../basePage/AppBaseScreen';

class AppDrawsScreen extends AppBaseScreen {
  /**
   * Clicks on a round button in the application.
   *
   * @param round - The identifier of the round button to be clicked.
   *   For iOS, it is the label of the XCUIElementTypeOther element.
   *   For Android, it represents the position of the button from left to right (starting from 0).
   *
   * @example
   * // Click on the round button labeled "Quarterfinals" for iOS:
   * await clickRoundButton("Quarterfinals");
   *
   * // Click on the second round button from left to right for Android:
   * await clickRoundButton("1");
   */
  async clickRoundButton(round: string): Promise<void> {
    // iOS element selector for locating the round button
    const iosElementSelector = `**/XCUIElementTypeOther[\`label == "${round}"\`]/XCUIElementTypeOther[1]/XCUIElementTypeOther`;

    // Android selector for locating the round button by position from left to right
    const androidRoundSelector = `new UiSelector().resourceId("au.com.tennis.ausopen${global.resourceIdEnv}:id/ROUND_TEXT_F").fromParent(new UiSelector().className("android.view.ViewGroup").instance(${round}))`;

    // Click on the round button based on the platform
    if (this.isAndroid) {
      // For Android, the round parameter represents the position of the button from left to right (starting from 0).
      await $(`android=${androidRoundSelector}`).click();
    } else {
      // For iOS, the round parameter is the label of the XCUIElementTypeOther element
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

  async getAllMatchesFromActiveRound() : Promise<Number> {
    let matches = null;
    const androidAllMatchesSelector = `id=au.com.tennis.ausopen${global.resourceIdEnv}:id/LAZY_MATCH_CARD_CONTAINER`;
    if (this.isAndroid) {
      matches = await $$(`${androidAllMatchesSelector}`);
    }
    return matches != null ? matches.length : 0;
  }

  async isPageLoaded(): Promise<Boolean> {
    const androidDrawsPageIsLoaded = `id=au.com.tennis.ausopen${global.resourceIdEnv}:id/LAZY_MATCH_CARD_CONTAINER`;
    if (this.isAndroid) {
      await (await $(`${androidDrawsPageIsLoaded}`)).waitForDisplayed();
      return (await $(`${androidDrawsPageIsLoaded}`)).isExisting();
    }
    return false;
  }
}
export default new AppDrawsScreen();
