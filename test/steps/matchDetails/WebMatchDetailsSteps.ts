import { binding, then, when } from 'cucumber-tsflow';
import WebMatchCard from 'src/component/matchCardComponent/WebMatchCardComponent';
import { IMatchCard } from 'src/model/MatchCardModel';
import WebDrawsPage from 'src/pages/drawsPage/WebDrawsPage';
import WebMatchDetailsPage from 'src/pages/matchDetailsPage/WebMatchDetailsPage';

@binding()
export default class WebMatchDetailsSteps {
  @when(/^I navigate to the '([^"]*)'$/)
  public async navigateToRound(round: string) {
    expect(await WebDrawsPage.clickRoundNavBtn(round)).toBe(true);
  }

  @when(/^I select score card with following players$/)
  public async whenISelectScoreCardWithFollowingPlayers(table) {
    const tableData = table.hashes();
    const players = tableData[0];
    expect(
      await WebDrawsPage.openMatch([
        players.playerOneName,
        players.playerTwoName,
        players?.playerThreeName,
        players?.playerFourName
      ])
    ).toBe(true);
  }

  @then(/^I see the following players on match details page$/)
  public async thenICanSeeTheFollowingPlayersOnMatchDetailsPage(table) {
    const tableData = table.hashes();
    const players = tableData[0];
    expect(
      await WebMatchDetailsPage.isPlayersNameDisplayed([
        players.playerOneName,
        players.playerTwoName,
        players?.playerThreeName,
        players?.playerFourName
      ])
    ).toBe(true);
  }

  @when(/^I click on name of player "([^"]*)"$/)
  public async whenIClickOnPlayerName(player: string) {
    await WebMatchDetailsPage.selectPlayer(player);
  }

  @then(/^I see the "([^"]*)" section open$/)
  public async thenICanSeeTheCommentarySectionOpen(chosenTab: string) {
    expect(await WebMatchDetailsPage.isChosenSectionDisplayed(chosenTab)).toBe(true);
  }

  @then(/^I see following details on match card$/)
  public async thenICanSeeDetailsOnMatchCard(table) {
    const tableData = table.hashes();
    const newMatchCard: IMatchCard = tableData[0] as IMatchCard;
    const matchCard = WebMatchDetailsPage.getFirstMatchCard();
    expect(await (await matchCard).isMatchPlayerNameDisplayed(newMatchCard.playerOneName)).toBe(
      true
    );
    expect(await (await matchCard).isMatchPlayerNameDisplayed(newMatchCard.playerTwoName)).toBe(
      true
    );
    // Doubles - check extra player names
    if (newMatchCard.playerThreeName !== undefined) {
      expect(await (await matchCard).isMatchPlayerNameDisplayed(newMatchCard.playerThreeName)).toBe(
        true
      );
      expect(await (await matchCard).isMatchPlayerNameDisplayed(newMatchCard.playerFourName)).toBe(
        true
      );
    }
    expect(await (await matchCard).validatePlayerScore(newMatchCard.playerOneScore, 0)).toBe(true);
    expect(await (await matchCard).validatePlayerScore(newMatchCard.playerTwoScore, 1)).toBe(true);
    expect(await (await matchCard).getMatchStatus()).toBe(newMatchCard.matchStatus);
    expect(await (await matchCard).getMatchDuration()).toBe(newMatchCard.matchDuration);
    expect((await (await matchCard).getMatchRound()).includes(newMatchCard.matchRound)).toBe(true);
  }

  @when(/^I navigate to ([^"]*) section$/)
  public async whenINavigateToASection(chosenTab: string) {
    await WebMatchDetailsPage.clickTabsNavButton(chosenTab);
  }

  // adding new method for changing the set for commentary
  @when(/^I change the dropdown to "([^"]*)"$/)
  public async changeSet(event: string) {
    await WebDrawsPage.selectDropDown(event);
    expect(await WebDrawsPage.getEventsFilteredOption()).toBe(event);

  }

  // adding new method for changing the set for stats
  @when(/^I change the stat dropdown to "([^"]*)"$/)
  public async changeStatSet(event: string) {
    await WebDrawsPage.selectStatDropDown(event);
    expect(await WebDrawsPage.getStatFilteredOption()).toBe(event);

  }

  @then(/^I validate the text of commentary for Point to "([^"]*)"$/)
  public async validateCommentary(chosenTab: string) {
    expect(await WebMatchDetailsPage.getCommentaryText(chosenTab)).toBe(true);
  }

  @then (/^I validate the values of "([^"]*)" to "([^"]*)" and "([^"]*)"$/)
  public async validateStatsValue(chosenTab: string, leftValue:string, rightValue:string) {
      expect(await WebMatchDetailsPage.getStatsValue(chosenTab, leftValue, rightValue)).toBe(true); 
  
  }

  @then(/^I see "([^"]*)" as status on match details page$/)
  public async validateMatchStatusOnMatchDetailsPage(matchStatus:string){
    const webMatchCard = new WebMatchCard(await $(`//div[@class="score-row score-row--fixed-height score-row--disabled match-centre-scorecard__card"]`));
    const actualMatchStatus = await webMatchCard.getMatchStatus();
    expect(actualMatchStatus).toBe(matchStatus);
  }

  
}
 