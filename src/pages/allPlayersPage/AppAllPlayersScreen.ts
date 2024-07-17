import AppBaseScreen from '../basePage/AppBaseScreen';

class AppAllPlayersScreen extends AppBaseScreen {
  async clickFavouritesSection() {
    const androidElementSelector = `new UiSelector().text("Favourites" ).className("${this.androidTextViewClassName}")`;
    const iosElementSelector = '**/XCUIElementTypeOther[`label == "Favourites"`]';
    const section = this.isAndroid
      ? await $(`android=${androidElementSelector}`)
      : await $(`-ios class chain:${iosElementSelector}`);
    await section.click();
  }

  async isFavouritePlayerDisplayed(playerName: string) {
    const androidElementSelector = `new UiSelector().textContains("${playerName}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeOther[\`label contains "${playerName}"\`]`;
    let isDisplayed = false;
    if (this.isAndroid) {
      isDisplayed = await $(`android=${androidElementSelector}`).isDisplayed();
      await $(`android=${androidElementSelector}`).isDisplayed();
    } else {
      isDisplayed = await $(`-ios class chain:${iosElementSelector}`).isDisplayed();
      await (await $(`-ios class chain:${iosElementSelector}`)).click();
    }
    return isDisplayed;
  }
}
export default new AppAllPlayersScreen();
