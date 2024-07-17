import { binding, given, then, when } from 'cucumber-tsflow';
import WebHomePage from 'src/pages/homePage/WebHomePage';
import BaseSteps from './BaseSteps';

@binding()
export default class WebBaseSteps extends BaseSteps {
  @given(/^I am on Ao web home page$/)
  @when(/^I am on AO web home page$/)
  public async amOnHomePage() {
    await WebHomePage.open();
    expect(await WebHomePage.isHomePageLoaded()).toBe(true);
    await WebHomePage.clickOnContinuePopUpIfExist();
  }

  // NOTE: This does not work for 'News' page under 'NEWS' as there is no page title on that page
  @then(/^I see '([^"]*)' page$/)
  public async seePage(pageTitle: string) {
    expect(await WebHomePage.getPageTitle()).toBe(pageTitle);
  }

  // TODO: improve this as this test ALWAYS passes for mobile
  @then(/^I see the players page$/)
  public async seePlayersPageDesktop() {
    if (!(await WebHomePage.isHamburgerMenuBtnDisplayed())) {
      expect(await WebHomePage.getPageTitle()).toBe("Players");
    }
  }

  @when(/^I navigate to '([^"]*)' under '([^"]*)'$/)
  public async navigateToSubMenu(subMenuOption: string, mainMenuOption: string) {
    // skinny mobile window
    if (await WebHomePage.isHamburgerMenuBtnDisplayed()) {
      await WebHomePage.expandHamburgerBtn();
      await WebHomePage.clickHamburgerMenuOption(mainMenuOption);
      await WebHomePage.clickMenu(subMenuOption);
    // maximised window
    } else {
      if(mainMenuOption.endsWith("Tournament")){
        await WebHomePage.clickTopMenu(mainMenuOption);
      }else{
      await WebHomePage.clickMenu(mainMenuOption);
      }
      await WebHomePage.clickMenu(subMenuOption);
    }

  }
}
