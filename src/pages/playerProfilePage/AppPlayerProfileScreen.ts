import AppBaseScreen from '../basePage/AppBaseScreen';

class AppPlayerProfileScreen extends AppBaseScreen {
  async isPlayerNameExists(playerName: string) {
    const androidSelector = `new UiSelector().text("${playerName}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeStaticText[\`label == "${playerName}"\`]`;
    return browser.waitUntil(async () =>
      this.isAndroid
        ? (await $(`android=${androidSelector}`).isExisting()) === true
        : (await $(`-ios class chain:${iosElementSelector}`).isExisting()) === true
    );
  }

  async isCountryOfPlayerExists(country: string) {
    const androidSelector = `new UiSelector().text("${country}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeStaticText[\`label == "${country}"\`]`;
    return browser.waitUntil(async () =>
      this.isAndroid
        ? (await $(`android=${androidSelector}`).isExisting()) === true
        : (await $(`-ios class chain:${iosElementSelector}`).isExisting()) === true
    );
  }

  async isPlayerAgeExists(age: string) {
    const androidSelector = `new UiSelector().text("${age}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeStaticText[\`label == "${age}"\`]`;
    return browser.waitUntil(async () =>
      this.isAndroid
        ? (await $(`android=${androidSelector}`).isExisting()) === true
        : (await $(`-ios class chain:${iosElementSelector}`).isExisting()) === true
    );
  }

  async isSinglesSeedNumberExists(singlesSeedNumber: string) {
    const androidSelector = `new UiSelector().text("${singlesSeedNumber}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeStaticText[\`label == "${singlesSeedNumber}"\`]`;
    return browser.waitUntil(async () =>
      this.isAndroid
        ? (await $(`android=${androidSelector}`).isExisting()) === true
        : (await $(`-ios class chain:${iosElementSelector}`).isExisting()) === true
    );
  }

  async isDoublesSeedNumberExists(doublesSeedNumber: string) {
    const androidSelector = `new UiSelector().text("${doublesSeedNumber}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeStaticText[\`label == "${doublesSeedNumber}"\`]`;
    return browser.waitUntil(async () =>
      this.isAndroid
        ? (await $(`android=${androidSelector}`).isExisting()) === true
        : (await $(`-ios class chain:${iosElementSelector}`).isExisting()) === true
    );
  }

  async isSinglesRankExists(singlesRank: string) {
    const androidSelector = `new UiSelector().text("${singlesRank}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeStaticText[\`label == "${singlesRank}"\`]`;
    return browser.waitUntil(async () =>
      this.isAndroid
        ? (await $(`android=${androidSelector}`).isExisting()) === true
        : (await $(`-ios class chain:${iosElementSelector}`).isExisting()) === true
    );
  }

  async isDoublesRankExists(doublesRank: string) {
    const androidSelector = `new UiSelector().text("${doublesRank}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeStaticText[\`label == "${doublesRank}"\`]`;
    return browser.waitUntil(async () =>
      this.isAndroid
        ? (await $(`android=${androidSelector}`).isExisting()) === true
        : (await $(`-ios class chain:${iosElementSelector}`).isExisting()) === true
    );
  }

  async addPlayerToFavourites() {
    const androidSelector = `new UiSelector().text("Add To Favourites").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = '**/XCUIElementTypeOther[`label == "Add To Favourites"`]';
    const favPlayerBtn = this.isAndroid
      ? await $(`android=${androidSelector}`)
      : await $(`-ios class chain:${iosElementSelector}`);
    await favPlayerBtn.waitForDisplayed({ timeout: 30000 });
    await favPlayerBtn.click();
  }

  async isPlayerAddedToFavourited(favouritedText: string) {
    const androidSelector = `new UiSelector().text("${favouritedText}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeOther[\`label == "${favouritedText}"\`]`;

    return browser.waitUntil(async () =>
      this.isAndroid
        ? (await $(`android=${androidSelector}`).isExisting()) === true
        : (await $(`-ios class chain:${iosElementSelector}`).isExisting()) === true
    );
  }

  async removeFavouritedPlayer() {
    const androidSelector = `new UiSelector().text("Favourited").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeOther[\`label == "Favourited"\`]`;
    if (this.isAndroid) {
      await $(`android=${androidSelector}`).click();
    } else {
      await $(`-ios class chain:${iosElementSelector}`).click();
    }
  }
}
export default new AppPlayerProfileScreen();
