import { binding, when, then } from 'cucumber-tsflow';
import { IMatchCard } from 'src/model/MatchCardModel';
import WebMatchDetailsPage from 'src/pages/matchDetailsPage/AppMatchDetailsScreen';

@binding()
export default class WebMatchDetailsSteps {
  @then(/^I see folowing match card details on Draws screen$/)
  public async whenISeeFollowingDetailsOnMatchCard(table) {
    const tableData = table.hashes();
    const newMatchCard: IMatchCard = tableData[0] as IMatchCard;
    const matchCard = WebMatchDetailsPage.getMatchCard();

    expect(
      await (await matchCard).isMatchPlayerNameDisplayed(newMatchCard.playerOneName, true)
    ).toBe(true);
    expect(
      await (await matchCard).isMatchPlayerNameDisplayed(newMatchCard.playerTwoName, false)
    ).toBe(true);

    if (newMatchCard.playerThreeName !== undefined) {
      expect(
        await (await matchCard).isMatchPlayerNameDisplayed(newMatchCard.playerThreeName, false)
      ).toBe(true);
      expect(
        await (await matchCard).isMatchPlayerNameDisplayed(newMatchCard.playerFourName, false)
      ).toBe(true);
      expect(
        await (
          await matchCard
        ).validatePlayerScore(
          `${newMatchCard.playerOneName} ${newMatchCard.playerTwoName}`,
          newMatchCard.playerOneScore,
          1
        )
      ).toBe(true);
      expect(
        await (
          await matchCard
        ).validatePlayerScore(
          `${newMatchCard.playerThreeName} ${newMatchCard.playerFourName}`,
          newMatchCard.playerTwoScore,
          2
        )
      ).toBe(true);
    } else {
      expect(
        await (
          await matchCard
        ).validatePlayerScore(newMatchCard.playerOneName, newMatchCard.playerOneScore, 1)
      ).toBe(true);
      expect(
        await (
          await matchCard
        ).validatePlayerScore(newMatchCard.playerTwoName, newMatchCard.playerTwoScore, 2)
      ).toBe(true);
    }
    expect(await (await matchCard).validateMatchStatus(newMatchCard.matchStatus)).toBe(true);
    expect(await (await matchCard).validateMatchDuration(newMatchCard.matchDuration)).toBe(true);
    expect(await (await matchCard).validateMatchRound(newMatchCard.matchRound)).toBe(true);
  }

  @when(/^I navigate to "([^"]*)" section$/)
  public async whenINavigateToSection(section: string) {
    await WebMatchDetailsPage.clickGivenBtn(section);
  }

  @then(/^I see "([^"]*)" heading on screen$/)
  public async whenISeeStatsSection(heading: string) {
    await WebMatchDetailsPage.isSectionDisplayed(heading);
  }

  @then(/^I see highlights details$/)
  public async whenISeeHighlightsSection() {
    // To verify if the video is displayed make sure the video is linked in drupla prior to running tests
    expect(
      (await WebMatchDetailsPage.isSectionDisplayed('Highlights not available')) ||
        (await WebMatchDetailsPage.isVideoDisplayed('Match Highlights'))
    ).toBe(true);
  }

  @then(/^I see the following players on match details screen$/)
  public async whenISeeTheFollowingPlayersOnMatchDetailsScreen(table) {
    const tableData = table.hashes();
    const players = tableData[0];
    await WebMatchDetailsPage.isPlayersNameDisplayed(
      players.playerOneName,
      players.playerTwoName,
      players?.playerThreeName,
      players?.playerFourName
    );
  }

  @when(/^I navigate to Highlights section from home screen$/)
  public async whenINavigateToHighlightsSectionFromHomeScreen() {
    await WebMatchDetailsPage.clickHighlightsOnHomePage();
  }
}
