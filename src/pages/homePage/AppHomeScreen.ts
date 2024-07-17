import FavouritePlayerComponent from 'src/component/AppFavouritePlayerComponent';
import AppBaseScreen from '../basePage/AppBaseScreen';
import {
  scrollRightFromLocationUntil,
  scrollDownUntil,
  scrollLeftFromLocationUntil
} from '../../utils/ScrollFind';

class AppHomeScreen extends AppBaseScreen {
  private get matchHighlightCard() {
    const androidSelector = `new UiSelector().resourceId("au.com.tennis.ausopen${global.resourceIdEnv}:id/MATCH_CARD_MATCH_CARD_MD601")`;
    const iosSelector = '**/XCUIElementTypeButton[`name contains "Home"`]';
    const element = this.isAndroid
      ? $(`android=${androidSelector}`)
      : $(`-ios class chain:${iosSelector}`);
    return element;
  }

  async isFavouritePlayerExistInFavouriteList(playerName: string): Promise<boolean> {
    let favouritedPlayer: FavouritePlayerComponent;
    const androidSuggestedPlayerSelector = `new UiSelector().resourceId("au.com.tennis.ausopen${global.resourceIdEnv}:id/FAVOURITE_PLAYER_SUGGESTED_PLAYER")`;
    const favouritePlayerParentSelector = `new UiSelector().resourceId("au.com.tennis.ausopen${global.resourceIdEnv}:id/FAVOURITE_PLAYER_FAVOURITE_PLAYER")`;
    const iosFavouritePlayerNameLocator = `**/XCUIElementTypeOther[\`label == "${playerName}"\`]`;
    const iosFavouritePlayerScrollToLocator = `**/XCUIElementTypeOther[\`label contains "${playerName}"\`]`;
    const iosFavouritePlayerElementLocator = `**/XCUIElementTypeOther[\`name == "FAVOURITE_PLAYER_FAVOURITE_PLAYER"\`]`;
    let isDisplayed = false;

    if (this.isAndroid) {
      const suggestedPlayersList = await $$(`android=${androidSuggestedPlayerSelector}`);

      // This is to get the last player from the suggested players list on the widget's left side
      const lastSuggestedPlayer = suggestedPlayersList[suggestedPlayersList.length - 1];

      const { x, y } = await lastSuggestedPlayer.getLocation();
      const { width, height } = await lastSuggestedPlayer.getSize();

      await scrollLeftFromLocationUntil({ x, y, width, height }, async () => {
        const playerList = await $$(`android=${favouritePlayerParentSelector}`);
        const favouritePlayers = playerList.map((e) => new FavouritePlayerComponent(e));
        for (const player of favouritePlayers) {
          const name = await player.getName();
          if (name === playerName) {
            favouritedPlayer = player;
            return true;
          }
        }
        return null;
      });
      isDisplayed = (await favouritedPlayer.getName()) === playerName;
    } else {
      const lastSuggestedPlayer = await $(`-ios class chain:${iosFavouritePlayerScrollToLocator}`);

      const { x, y } = await lastSuggestedPlayer.getLocation();
      const { width, height } = await lastSuggestedPlayer.getSize();

      await scrollRightFromLocationUntil({ x, y, width, height }, async () =>
        (await $$(`-ios class chain:${iosFavouritePlayerNameLocator}`)).length > 0 ? true : null
      );
      isDisplayed = await (
        await $(`-ios class chain:${iosFavouritePlayerNameLocator}`).$(
          `-ios class chain:${iosFavouritePlayerElementLocator}`
        )
      ).isDisplayed();
    }
    return isDisplayed;
  }

  async isNewsTitleDisplayed(newsTitle: string): Promise<Boolean> {
    const androidNewsTitleSelector = `new UiSelector().text("${newsTitle}" ).className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeOther[\`label == "${newsTitle}"\`]`;

    const isDisplayed = this.isAndroid
      ? await $(`android=${androidNewsTitleSelector}`).isDisplayed()
      : await $(`-ios class chain:${iosElementSelector}`).isDisplayed();
    return isDisplayed;
  }

  async isMatchHighlightCardDisplayed(): Promise<boolean> {
    return (await this.matchHighlightCard).isDisplayed();
  }

  async getWidgetText(widgetLabel: string): Promise<String> {
    const androidElementSelector = `new UiSelector().text("${widgetLabel}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeOther[\`name contains "${widgetLabel}"\`]`;

    let label: WebdriverIO.Element;
    if (this.isAndroid) {
      await scrollDownUntil(async () =>
        (await $$(`android=${androidElementSelector}`)).length > 0 ? true : null
      );
      label = await $(`android=${androidElementSelector}`);
    } else {
      if (!(await $(`-ios class chain:${iosElementSelector}`).isDisplayed())) {
        await scrollDownUntil(async () =>
          (await $(`-ios class chain:${iosElementSelector}`).isDisplayed()) ? true : null
        );
      }
      label = await $(`-ios class chain:${iosElementSelector}`);
    }
    return label.getText();
  }

  async selectSuggestedPlayer(playerName: string): Promise<void> {
    const androidElementSelector = `new UiSelector().resourceId("au.com.tennis.ausopen${global.resourceIdEnv}:id/FAVOURITE_PLAYERS")`;
    const androidSecondElementSelector = `new UiSelector().text("${playerName}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeOther[\`name == "FAVOURITE_PLAYERS"\`]`;
    const iosSecondElementSelector = `**/XCUIElementTypeOther[\`label == "${playerName} Suggested"\`]`;

    const findPlayerBtn = this.isAndroid
      ? await $(`android=${androidElementSelector}`)
      : await $(`-ios class chain:${iosElementSelector}`);
    const { x, y } = await findPlayerBtn.getLocation();
    const { width, height } = await findPlayerBtn.getSize();

    if (this.isAndroid) {
      await scrollRightFromLocationUntil({ x, y, width, height }, async () =>
        (await $$(`android=${androidSecondElementSelector}`)).length > 0 ? true : null
      );
      await (await $(`android=${androidSecondElementSelector}`)).click();
    } else {
      await scrollRightFromLocationUntil({ x, y, width, height }, async () =>
        (await $$(`-ios class chain:${iosSecondElementSelector}`)).length > 0 ? true : null
      );
      await $(`-ios class chain:${iosSecondElementSelector}`).click();
    }
  }

  async selectLatestNews(newsTitle: string): Promise<void> {
    const androidNewsTitleSelector = `new UiSelector().text("${newsTitle}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeOther[\`label == "${newsTitle}"\`]`;

    if (this.isAndroid) {
      await scrollDownUntil(async () =>
        (await $$(`android=${androidNewsTitleSelector}`)).length > 0 ? true : null
      );
      (await $(`android=${androidNewsTitleSelector}`)).click();
    } else {
      await scrollDownUntil(async () =>
        (await $$(`-ios class chain:${iosElementSelector}`)).length > 0 ? true : null
      );
      await $(`-ios class chain:${iosElementSelector}`).click();
    }
  }

  async scrollToRightOnNewsSection(titleOne: string, titleTwo: string): Promise<void> {
    const androidFirstElementSelector = `new UiSelector().text("${titleOne}").className("${this.androidTextViewClassName}")`;
    const androidSecondElementSelector = `new UiSelector().text("${titleTwo}").className("${this.androidTextViewClassName}")`;
    const iosFirstElementSelector = `**/XCUIElementTypeOther[\`label == "${titleOne}"\`]`;
    const iosSecondElementSelector = `**/XCUIElementTypeOther[\`label == "${titleTwo}"\`]`;

    if (this.isAndroid) {
      await scrollDownUntil(async () =>
        (await $(`android=${androidFirstElementSelector}`).isDisplayed()) ||
        (await $(`android=${androidSecondElementSelector}`).isDisplayed())
          ? true
          : null
      );

      if (!(await $(`android=${androidSecondElementSelector}`).isDisplayed())) {
        const newsFeedElement = await $(`android=${androidFirstElementSelector}`);
        const { x, y } = await newsFeedElement.getLocation();
        const { width, height } = await newsFeedElement.getSize();
        await scrollRightFromLocationUntil({ x, y, width, height }, async () =>
          (await $$(`android=${androidSecondElementSelector}`)).length > 0 ? true : null
        );
      }
    } else {
      await scrollDownUntil(async () =>
        (await $(`-ios class chain:${iosFirstElementSelector}`).isDisplayed()) ||
        (await $(`-ios class chain:${iosSecondElementSelector}`).isDisplayed())
          ? true
          : null
      );
      if (!(await $(`-ios class chain:${iosSecondElementSelector}`).isDisplayed())) {
        const initialLocation = await $(`-ios class chain:${iosFirstElementSelector}`);
        const { x, y } = await initialLocation.getLocation();
        const { width, height } = await initialLocation.getSize();

        await scrollRightFromLocationUntil({ x, y, width, height }, async () =>
          (await $$(`-ios class chain:${iosSecondElementSelector}`)).length > 0 ? true : null
        );
      }
    }
  }

  async clickAllPlayersButton(): Promise<void> {
    const androidNewsTitleSelector = `new UiSelector().text("All players" ).className("${this.androidTextViewClassName}")`;
    const iosElementSelector = '**/XCUIElementTypeOther[`label == "All players"`]';

    if (this.isAndroid) {
      await (await $(`android=${androidNewsTitleSelector}`)).click();
    } else {
      await (await $(`-ios class chain:${iosElementSelector}`)).click();
    }
  }
}

export default new AppHomeScreen();
