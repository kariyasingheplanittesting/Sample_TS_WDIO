import AppBaseScreen from '../basePage/AppBaseScreen';
import { scrollLeftFromLocationUntil } from '../../utils/ScrollFind';

class AppMatchScheduleScreen extends AppBaseScreen {
  private get daysPicker() {
    const androidSelector = `new UiSelector().resourceId("au.com.tennis.ausopen${global.resourceIdEnv}:id/DAY_PICKER_DAY_PICKER")`;
    const iosSelector = `**/XCUIElementTypeOther[\`name == "DAY_PICKER_DAY_PICKER"\`]`;
    const element = this.isAndroid
      ? $(`android=${androidSelector}`)
      : $(`-ios class chain:${iosSelector}`);
    return element;
  }

  private get listOfDaysPickers() {
    const androidSelector = `new UiSelector().resourceId("au.com.tennis.ausopen${global.resourceIdEnv}:id/DAY_TEXT")`;
    const iosSelector = `**/XCUIElementTypeOther[\`name contains "DAY_BUTTON_MD"\`]`;
    const element = this.isAndroid
      ? $$(`android=${androidSelector}`)
      : $$(`-ios class chain:${iosSelector}`);
    return element;
  }

  async isDaysPickerPanelDisplayed(): Promise<boolean> {
    await browser.waitUntil(async () => (await $(await this.daysPicker).isExisting()) === true);
    return (await this.daysPicker).isDisplayed();
  }

  async selectDay(dayInPanel: string) {
    const androidToElementSelector = `new UiSelector().text("${dayInPanel}").className("${this.androidTextViewClassName}")`;
    const iosToElementSelector = `**/XCUIElementTypeOther[\`label contains "${dayInPanel}"\`]`;

    const dayWantToSelect = this.isAndroid
      ? await $(`android=${androidToElementSelector}`)
      : await $(`-ios class chain:${iosToElementSelector}`);

    const lastDayOfDaysPicker = await this.listOfDaysPickers[
      (await this.listOfDaysPickers.length) - 1
    ];

    const { x, y } = await lastDayOfDaysPicker.getLocation();
    const { width, height } = await lastDayOfDaysPicker.getSize();

    if (await dayWantToSelect.isDisplayed()) {
      await dayWantToSelect.click();
    } else {
      await browser.waitUntil(async () => lastDayOfDaysPicker.isDisplayed());
      if (this.isAndroid) {
        await scrollLeftFromLocationUntil({ x, y, width, height }, async () =>
          (await $$(`android=${androidToElementSelector}`)).length > 0 ? true : null
        );
        await (await $(`android=${androidToElementSelector}`)).click();
      } else {
        await scrollLeftFromLocationUntil({ x, y, width, height }, async () =>
          (await $$(`-ios class chain:${iosToElementSelector}`)).length > 0 ? true : null
        );
        await (await $(`-ios class chain:${iosToElementSelector}`)).click();
      }
    }
  }
}
export default new AppMatchScheduleScreen();
