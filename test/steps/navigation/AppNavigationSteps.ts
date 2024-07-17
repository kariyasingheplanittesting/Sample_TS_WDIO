import { DataTable } from '@wdio/cucumber-framework';
import { binding, when, then } from 'cucumber-tsflow';
import AppMatchScheduleScreen from 'src/pages/matchSchedulePage/AppMatchScheduleScreen';
import AppMatchDetailsPage from 'src/pages/matchDetailsPage/AppMatchDetailsScreen';
import AppNewsScreen from 'src/pages/newsPage/AppNewsScreen';

@binding()
export default class AppNavigationSteps {
  @when(/^I am able to see content of the Results screen$/)
  @when(/^I am able to see content of the Schedule screen$/)
  public async seeContentOfScheduleScreen() {
    expect(await AppMatchScheduleScreen.isDaysPickerPanelDisplayed()).toBe(true);
  }

  @then(/^I can see draws up to the match with following players$/)
  @then(/^I can see results up to the match with following players$/)
  @then(/^I can see schedules up to the match with following players$/)
  public async seeDetailsUpToMatch(table: DataTable) {
    const tableData = table.hashes();
    const playerNames = tableData[0];
    const matchCard = AppMatchDetailsPage.getMatchCard();
    expect(
      await (await matchCard).isMatchPlayerNameDisplayed(playerNames.playerOneName, true)
    ).toBe(true);
    expect(
      await (await matchCard).isMatchPlayerNameDisplayed(playerNames.playerTwoName, false)
    ).toBe(true);
  }

  @then(/^I can see the news content$/)
  public async canSeeTheNewsContent() {
    expect(await AppNewsScreen.isNewsContentDisplayed()).toBe(true);
  }
}
