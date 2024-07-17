import { binding, then, when } from 'cucumber-tsflow';
import WebMatchDetailsPage from 'src/pages/matchDetailsPage/WebMatchDetailsPage';
import WebMatchSchedulePage from 'src/pages/matchSchedulePage/WebMatchSchedulePage';
import WebPlayerProfilePage from 'src/pages/playerProfilePage/WebPlayerProfilePage';

@binding()
export default class WebMatchScheduleSteps {
  @then(/^I see the Days Picker panel$/)
  public async thenISeeDaysPanel() {
    expect(await WebMatchSchedulePage.isDaysPickerPanelDisplayed()).toBe(true);
  }

  @then(/^I see following Day is active by default$/)
  public async thenISeeADayIsSelectedByDefault(table) {
    const tableDate = table.hashes();
    const activeDay = await WebMatchSchedulePage.getActiveDay();
    expect(await activeDay.getDay()).toBe(tableDate[0].defaultDay);
    // TODO: website is currently inconsistently serving either dates or date ranges (e.g. either '21 Feb' or '20-21 Feb')
    expect((await activeDay.getDate()).includes(tableDate[0].date)).toBe(true);
  }

  @then(/^I see scheduled matches$/)
  public async thenISeeMatchesScheduled() {
    expect((await WebMatchSchedulePage.getMatchesScheduled()).length > 0).toBe(true);
  }

  @then(/^I can see following players on match details card$/)
  public async whenISelectAMatchCardWithFollowingPlayers(table) {
    const playerTable = table.hashes();
    const playerArray = playerTable.flatMap((i) => Object.values(i));
    expect(await WebMatchSchedulePage.isMatchCardForGivenPlayersExist(playerArray)).toBe(true);
  }

  @when(/^I select a match card with following Players$/)
  public async thenINavigateToMatchDetails(table) {
    const playerTable = table.hashes();
    const playerArray = playerTable.flatMap((i) => Object.values(i));
    await WebMatchSchedulePage.goToMatchDetails(playerArray);
    expect(await WebMatchDetailsPage.isPlayersExist(playerArray)).toBe(true);
  }

  @then(/^I can navigate to "([^"]*)" profile by selecting the name$/)
  public async thenINavigateToPlayerProfile(player: string) {
    const expectedPlayerName = await WebMatchSchedulePage.goToPlayersProfile(player);
    expect(await WebPlayerProfilePage.isPageLoaded()).toBe(true);
    const actualPlayerName = await WebPlayerProfilePage.getPlayerName();
    expect(actualPlayerName.toLowerCase()).toBe(expectedPlayerName);
  }

  @then(/^I select "([^"]*)"$/)
  public async thenISelectDay(day: string) {
    await WebMatchSchedulePage.goToTheGivenDay(day);
    expect(await (await WebMatchSchedulePage.getSelectedDay()).getDay()).toBe(day);
  }
}
