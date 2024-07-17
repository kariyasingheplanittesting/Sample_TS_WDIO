import AppBaseScreen from '../basePage/AppBaseScreen';

class AppPlayersScreen extends AppBaseScreen {
  async isPlayerListed(playerName: string): Promise<boolean> {
    const androidToElementSelector = `new UiSelector().textContains("${playerName}").className("${this.androidTextViewClassName}")`;
    const iosToElementSelector = `**/XCUIElementTypeOther[\`label contains "${playerName}"\`]`;

    const playerElement = this.isAndroid
      ? await $(`android=${androidToElementSelector}`)
      : await $(`-ios class chain:${iosToElementSelector}`);

    return playerElement.isDisplayed();
  }
}
export default new AppPlayersScreen();
