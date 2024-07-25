import { binding, then, when } from 'cucumber-tsflow';
import AppDrawsScreen from 'src/pages/drawsPage/AppDrawsScreen';

@binding()
export default class AppDrawsPageSteps {
  @when(/^I select score card with following players on Draws screen$/, undefined, 100000)
  public async whenISelectScoreCardWithFollowingPlayersOnDrawsScreen(table) {
    const tableData = table.hashes();
    const players = tableData[0];
    // There are no unique identifiers to select different rounds in the current App implementation.
    // As a result, the first round, which is the default, is always selected.
    await AppDrawsScreen.clickRoundButton(players.round);
    await AppDrawsScreen.openMatchCard([
      players.playerOneName,
      players.playerTwoName,
      players.playerThreeName,
      players.playerFourName
    ]);
  }

  @when(/^I select "([^"]*)" from dropdown on Draws screen$/)
  public async whenISelectOptionFromTheDropdownOnDrawsScreen(matchType: string) {
    await AppDrawsScreen.clickMatchDropdownAndChose(matchType);
  }

  @then(/^I select Round 1 by using index "([^"]*)"$/)
  public async validateRoundButtonIsClicked(round:string){
    await AppDrawsScreen.clickRoundButton(round);

  }

  @then(/^I can see match cards for that round$/)
  public async validateMathCardsDisplayedForSelectedRound(){
    await AppDrawsScreen.isPageLoaded();
    expect(await AppDrawsScreen.getAllMatchesFromActiveRound()).toBeGreaterThan(0);
  }
}
