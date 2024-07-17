import BasePage from './BasePage';

export default abstract class WebBasePage extends BasePage {
  private popUpSelector = '.gdpr-popup__message button.btn.-alt';

  public async open() {
    await browser.url(browser.options.baseUrl);
    await browser.maximizeWindow(); // full size

    // uncomment to test mobile browser locally
    // await browser.setWindowRect(0, 0, 412, 915);
  }

  async continuePopUpButtonExist(): Promise<boolean> {
    return (await $(this.popUpSelector)).isExisting();
  }

  async clickOnContinuePopUpIfExist() {
    const isContinueButtonExist = await this.continuePopUpButtonExist();
    if (isContinueButtonExist) await (await $(this.popUpSelector)).click();
  }

  async clickMenu(selector: string): Promise<void> {
    await browser.waitUntil(async () => {
      // this selector finds both the mobile menu option and the desktop one, we must
      //   loop through to check at least one is displayed and clickable
      const menuOptions = await $$(`*=${selector}`);
      for (const menuOption of menuOptions) {
        if (await menuOption.isClickable()) return true;
      }
      return false;
    });
    const menuOptions = await $$(`*=${selector}`);
    for (const menuOption of menuOptions) {
      if (await menuOption.isClickable()) {
        await menuOption.click();
        return;
      }
    }
  }

  async clickTopMenu(selector: string): Promise<void> {
    await browser.waitUntil(async () => {
      // this selector finds both the mobile menu option and the desktop one, we must
      //   loop through to check at least one is displayed and clickable
      const menuOptions = await $$(`a.nav-item.-has-drop-down.first-level[data-menu="${selector}"]`);
      for (const menuOption of menuOptions) {
        if (await menuOption.isClickable()) return true;
      }
      return false;
    });
    const menuOptions = await $$(`a.nav-item.-has-drop-down.first-level[data-menu="${selector}"]`);
    for (const menuOption of menuOptions) {
      if (await menuOption.isClickable()) {
        await menuOption.click();
        return;
      }
    }
  }

  async isHamburgerMenuBtnDisplayed(): Promise<boolean> {
    return (await $('.mobile-menu-wrapper')).isDisplayed();
  }

  async expandHamburgerBtn(): Promise<void> {
    await (await $('.mobile-menu-toggle')).click();
  }

  async clickHamburgerMenuOption(selector: string): Promise<void> {
    // TODO: improve this and fix capitalisation because the selector doesn't work otherwise, not sure why
    // the below line converts to pascal case e.g. 'MATCHES' -> 'Matches'
    const fixedSelector = selector.charAt(0).toUpperCase() + selector.slice(1).toLowerCase();
    
    await browser.waitUntil(async () => {
      const isOptionClickable = await (await $(`button*=${fixedSelector}`)).isClickable();
      return isOptionClickable === true;
    });
    await (await $(`button*=${fixedSelector}`)).click();
  }

  public async getPageTitle(): Promise<string> {
    return (await $('h1.component-hero-type-1__heading')).getText();
  }



}
