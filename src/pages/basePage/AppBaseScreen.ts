import { scrollDownUntil } from 'src/utils/ScrollFind';
import BasePage from './BasePage';

export default abstract class AppBaseScreen extends BasePage {
  protected isAndroid: boolean;

  protected releaseType: string;

  protected androidTextViewClassName = 'android.widget.TextView';

  constructor() {
    super();
    this.isAndroid = browser.isAndroid;
    this.releaseType = process.env.RELEASE_TYPE;
  }

  async goToScreen(menuItem: string): Promise<void> {
    const androidSelector = `new UiSelector().text("${menuItem}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeButton[\`label contains "${menuItem}, tab,"\`]`;

    if (this.isAndroid) {
      if (await $(`android=${androidSelector}`).isExisting()) {
        await $(`android=${androidSelector}`).click();
      } else {
        await this.goToScreenFromMoreMenu(menuItem);
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (await $(`-ios class chain:${iosElementSelector}`).isExisting()) {
        await $(`-ios class chain:${iosElementSelector}`).click();
      } else {
        await this.goToScreenFromMoreMenu(menuItem);
      }
    }
  }

  async goToScreenFromMoreMenu(selector: string): Promise<void> {
    const androidMoreMenuSelector = `new UiSelector().text("More").className("${this.androidTextViewClassName}")`;
    const androidSelector = `new UiSelector().text("${selector}").className("${this.androidTextViewClassName}")`;
    const iosMoreMenuSelector = `**/XCUIElementTypeButton[\`label == "More, tab, 5 of 5"\`]`;
    const iosElementSelector = `**/XCUIElementTypeOther[\`label == "${selector} "\`][2]`;

    if (this.isAndroid) {
      await $(`android=${androidMoreMenuSelector}`).click();
      await browser.waitUntil(async () => {
        const matchPlayerName = await $(`android=${androidSelector}`).isExisting();
        return matchPlayerName === true;
      });
      await $(`android=${androidSelector}`).click();
    } else {
      await $(`-ios class chain:${iosMoreMenuSelector}`).click();
      await browser.waitUntil(async () => {
        const matchPlayerName = await $(`-ios class chain:${iosElementSelector}`).isExisting();
        return matchPlayerName === true;
      });
      await $(`-ios class chain:${iosElementSelector}`).click();
    }
  }

  async selectSection(sectionName: string) {
    const androidElementSelector = `new UiSelector().text("${sectionName}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `**/XCUIElementTypeOther[\`label == "${sectionName}"\`]`;

    const element = this.isAndroid
      ? await $(`android=${androidElementSelector}`)
      : await $(`-ios class chain:${iosElementSelector}`);

    if (element.isExisting()) {
      await element.click();
    } else {
      await scrollDownUntil(async () =>
        (await $$(`android=${element}`)).length > 0 ? true : null
      );
      await element.click();
    }
  }

  async openMatchCard(players: string[]): Promise<void> {
    const androidElementSelector = `new UiSelector().resourceId("au.com.tennis.ausopen${global.resourceIdEnv}:id/LAZY_MATCH_CARD_CONTAINER")`;
    const iosElementSelector = `**/XCUIElementTypeOther[\`name contains "LAZY_MATCH_CARD_CONTAINER"\`]`;
    const selector = this.isAndroid
      ? `android=${androidElementSelector}`
      : `-ios class chain:${iosElementSelector}`;

    await browser.waitUntil(async () => (await $(selector)).isDisplayed());
    const matches = await $$(selector);

    for (const match of matches) {
      if (await this.arePlayersPresentOnMatchCard(players, match)) {
        if (!(await match.isDisplayed())) {
          await scrollDownUntil(async () => ((await match.isDisplayed()) ? true : null));
        }
        await match.click();
        break;
      }
    }
  }

  async arePlayersPresentOnMatchCard(
    players: string[],
    match: WebdriverIO.Element
  ): Promise<Boolean> {
    for (const player of players) {
      const androidPlayerSelector = `new UiSelector().textContains("${player}").className("${this.androidTextViewClassName}")`;
      const iosPlayerSelector = `**/XCUIElementTypeOther[\`label contains "${player}"\`]`;
      const selector = this.isAndroid
        ? `android=${androidPlayerSelector}`
        : `-ios class chain:${iosPlayerSelector}`;

      if (player !== undefined) {
        if ((await match.$$(selector).length) === 0) {
          return false;
        }
      }
    }
    return true;
  }
}
