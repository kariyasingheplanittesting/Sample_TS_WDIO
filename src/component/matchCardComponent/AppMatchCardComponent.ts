import AppBaseComponent from '../baseComponent/AppBaseComponent';

export default class AppMatchCard extends AppBaseComponent {
  public async validateMatchStatus(status: string): Promise<boolean> {
    const androidElementSelector = `new UiSelector().text("${status}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `label contains "${status}" AND name contains "MATCH_CARD_MATCH_CARD"`;

    return this.isAndroid
      ? (
          await $(
            `id=au.com.tennis.ausopen${global.resourceIdEnv}:id/MATCH_CARD_HEADER_MATCH_CARD_HEADER`
          ).$(`android=${androidElementSelector}`)
        ).isDisplayed()
      : (await $(`-ios predicate string:${iosElementSelector}`)).isDisplayed();
  }

  public async validatePlayerScore(
    playerName: string,
    scores: string,
    teamNumber: number
  ): Promise<Boolean> {
    const iosElementSelector = `label contains "${playerName} ${scores}" AND name contains "MATCH_CARD_MATCH_CARD"`;

    return this.isAndroid
      ? this.verifyScore(scores, teamNumber)
      : (await $(`-ios predicate string:${iosElementSelector}`)).isDisplayed();
  }

  public async verifyScore(score: string, teamNumber: number): Promise<boolean> {
    let i = 0;
    const resourceId =
      teamNumber === 1 ? 'TEAM_SCORE_MATCH_CARD_TEAM1' : 'TEAM_SCORE_MATCH_CARD_TEAM2';
    const scores = await $(`id=au.com.tennis.ausopen${global.resourceIdEnv}:id/${resourceId}`).$$(
      `android=new UiSelector().className("${this.androidTextViewClassName}")`
    );

    for (const individualScore of scores) {
      if (score[i] !== (await individualScore.getText())) {
        return false;
      }
      i += 2;
    }
    return true;
  }

  public async validateMatchDuration(duration: string): Promise<boolean> {
    let newstr = duration.replace('hours', 'h');
    newstr = newstr.replace('minutes', 'm');
    const androidElementSelector = `new UiSelector().text("${newstr}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `label contains "${duration}" AND name contains "MATCH_CARD_MATCH_CARD"`;
    return this.isAndroid
      ? (
          await $(
            `id=au.com.tennis.ausopen${global.resourceIdEnv}:id/MATCH_CARD_HEADER_MATCH_CARD_HEADER`
          ).$(`android=${androidElementSelector}`)
        ).isDisplayed()
      : (await $(`-ios predicate string:${iosElementSelector}`)).isDisplayed();
  }

  public async isMatchPlayerNameDisplayed(
    playerName: string,
    isPlayerOne: boolean
  ): Promise<Boolean> {
    const androidElementSelector = `new UiSelector().textContains("${playerName}").className("${this.androidTextViewClassName}")`;
    const iosElementSelector = `label contains "${playerName}" AND name contains "MATCH_CARD_MATCH_CARD"`;

    if (this.isAndroid) {
      const result = isPlayerOne
        ? await $(
            `id=au.com.tennis.ausopen${global.resourceIdEnv}:id/MATCH_CARD_ROW_MATCH_CARD_TEAM1`
          )
            .$(`android=${androidElementSelector}`)
            .isDisplayed()
        : await $(
            `id=au.com.tennis.ausopen${global.resourceIdEnv}:id/MATCH_CARD_ROW_MATCH_CARD_TEAM2`
          )
            .$(`android=${androidElementSelector}`)
            .isDisplayed();
      return result;
    }
    await browser.waitUntil(async () =>
      $(`-ios predicate string:${iosElementSelector}`).isDisplayed()
    );
    return (await $(`-ios predicate string:${iosElementSelector}`)).isDisplayed();
  }

  public async validateMatchRound(round: string): Promise<boolean> {
    const androidElementSelector = `new UiSelector().resourceId("au.com.tennis.ausopen${
      global.resourceIdEnv
    }:id/MATCH_CARD_HEADER_MATCH_ROUND_${round.toUpperCase()}")`;
    const iosElementSelector = `label contains "${round}" AND name contains "MATCH_CARD_MATCH_CARD"`;
    return this.isAndroid
      ? (await $(`android=${androidElementSelector}`)).isDisplayed()
      : (await $(`-ios predicate string:${iosElementSelector}`)).isDisplayed();
  }
}
