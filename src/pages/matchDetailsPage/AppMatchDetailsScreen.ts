import { scrollDownUntil } from 'src/utils/ScrollFind';
import AppMatchCard from 'src/component/matchCardComponent/AppMatchCardComponent';
import AppBaseScreen from '../basePage/AppBaseScreen';

class AppMatchDetailsScreen extends AppBaseScreen {
  async isPlayersNameDisplayed(
    playerOne: string,
    playerTwo: string,
    playerThree?: string,
    playerFour?: string
  ): Promise<Boolean> {
    let androidElementSelector = '';
    let iosElementSelector = '';
    if (playerThree === undefined) {
      androidElementSelector = `new UiSelector().text("${playerOne} vs ${playerTwo}").className("${this.androidTextViewClassName}")`;
      iosElementSelector = `**/XCUIElementTypeStaticText[\`label == "${playerOne} vs ${playerTwo}"\`]`;
    } else {
      androidElementSelector = `new UiSelector().text("${playerOne} /${playerTwo} vs ${playerThree} /${playerFour}").className("${this.androidTextViewClassName}")`;
      iosElementSelector = `**/XCUIElementTypeStaticText[\`label == "${playerOne} /${playerTwo} vs ${playerThree} /${playerFour}"\`]`;
    }

    await browser.waitUntil(async () =>
      this.isAndroid
        ? (await $(`android=${androidElementSelector}`)).isDisplayed()
        : (await $(`-ios class chain:${iosElementSelector}`)).isDisplayed()
    );
    return this.isAndroid
      ? (await $(`android=${androidElementSelector}`)).isDisplayed()
      : (await $(`-ios class chain:${iosElementSelector}`)).isDisplayed();
  }

  async getMatchCard(): Promise<AppMatchCard> {
    return new AppMatchCard();
  }

  async clickGivenBtn(sectionName: string) {
    const androidElementSelector = `new UiSelector().text("${sectionName}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeOther[\`label == "${sectionName}"\`]`;

    await scrollDownUntil(async () =>
      // eslint-disable-next-line no-nested-ternary
      this.isAndroid
        ? (await $$(`android=${androidElementSelector}`)).length > 0
          ? true
          : null
        : (await $$(`-ios class chain:${iosElementSelector}`)).length > 0
        ? true
        : null
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.isAndroid
      ? await (await $(`android=${androidElementSelector}`)).click()
      : await (await $(`-ios class chain:${iosElementSelector}`)).click();
  }

  async isSectionDisplayed(heading: string): Promise<Boolean> {
    const androidElementSelector = `new UiSelector().text("${heading}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeStaticText[\`label == "${heading}"\`]`;

    return this.isAndroid
      ? (await $(`android=${androidElementSelector}`)).isDisplayed()
      : (await $(`-ios class chain:${iosElementSelector}`)).isDisplayed();
  }

  async isVideoDisplayed(heading: string): Promise<Boolean> {
    const androidElementSelector = `new UiSelector().text("${heading}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeOther[\`label contains "${heading}"\`]`;

    return this.isAndroid
      ? (await $(`android=${androidElementSelector}`)).isDisplayed()
      : (await $(`-ios class chain:${iosElementSelector}`)).isDisplayed();
  }

  async clickHighlightsOnHomePage(): Promise<void> {
    const iosElementSelector = `**/XCUIElementTypeOther[\`label contains "Highlights"\`]`;
    await (await $(`-ios class chain:${iosElementSelector}`)).click();
    await this.clickGivenBtn('Highlights');
  }
}

export default new AppMatchDetailsScreen();
