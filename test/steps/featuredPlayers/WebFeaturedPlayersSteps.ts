import { binding, when, then, given } from 'cucumber-tsflow';
import WebHomePage from 'src/pages/homePage/WebHomePage';
import WebPlayerProfilePage from 'src/pages/playerProfilePage/WebPlayerProfilePage';

@binding()
export default class WebPlayerToWatchSteps {
  @given(/^I see 'Aussies at the AO' is visible on home page$/)
  public async thenIseePlayerToWatchOnHomePage() {
    // mobile view
    if (await WebHomePage.isHamburgerMenuBtnDisplayed()) {
      expect(await WebHomePage.isFeaturedPlayersDisplayed()).toBe(true);
    // desktop view
    } else {
      expect(await WebHomePage.isFeaturedPlayersListDisplayed()).toBe(true);
    }
  }

  // @then(/^I see the following player is selected by default$/)
  // public async thenISeeAPlayerIsSelectedByDefault(table) {
  //   const expectedPlayer = table.hashes()[0].defaultPlayer;
  //   expect(await WebHomePage.isDefaultPlayerActive(expectedPlayer)).toBe(true);
  // }

  // @when(/^I view profile of (.+)$/)
  // public async whenIChooseToViewPlayerProfile(player: string) {
  //   // expect(await WebHomePage.selectPlayerByName(player)).toBe(true);
  //   // expect(await WebHomePage.verifyActivePlayer(player)).toBe(true);
  //   return player === player;
  // }

  @then(/^I can view profile details of (.+)$/)
  public async thenISeePlayerProfileDetails(player: string) {
    expect(await WebHomePage.goToViewPlayersProfile(player)).toBe(true);
    expect(await WebPlayerProfilePage.getPlayerName()).toBe(player);
  }

  @when(/^I click on left or right arrow$/)
  public async validateLeftAndRightArrowClicks(){
    await WebHomePage.clickRightArrow();
    await WebHomePage.clickLeftArrow();

  }

  // this step ALWAYS passes for mobile
  @when(/^I view all players$/)
  public async whenIChooseToViewAllPlayers() {
    if (!(await WebHomePage.isHamburgerMenuBtnDisplayed())) {
      expect(await WebHomePage.isViewAllPlayersButtonExist()).toBe(true);
      await WebHomePage.goToAllPlayersPage();
    }
  }


}
