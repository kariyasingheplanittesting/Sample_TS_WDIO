export default class WebMatchCard {
  private parentElement: WebdriverIO.Element;

  private readonly score_Duration_Selector = '.score-header__duration';

  private readonly score_Status_Selector = '.score-header__status';

  private readonly score_SubTitle_Selector = '.score-header__subtitle';

  private readonly score_Title_Selector = '.score-header__title';



  constructor(parentElement: WebdriverIO.Element) {
    this.parentElement = parentElement;
  }

  public async getMatchStatus(): Promise<string> {
    browser.waitUntil(async () => {
      const matchStatus = await this.parentElement.$(this.score_Status_Selector).isExisting();
      return matchStatus === true;
    });
    return this.parentElement.$(this.score_Status_Selector).getText();
  }

  public async validatePlayerScore(scores: string, playerNumber: number): Promise<Boolean> {
    // split by both , and : for tiebreakers
    const receivedScores = scores.split(/,|:/);
    // playerNumber is the index of the player whose score is being checked, 0 or 1
    const score = await this.parentElement
      .$$('.player-row__score-game-wrapper')
      [playerNumber].getText();

    let count = 0;

    for (const receivedScore of receivedScores) {
      if (receivedScore !== score[count]) {
        return false;
      }
      // The score received is a number followed by an empty line, that is why the count is incremented by 2
      count += 2;
    }
    return true;
  }

  public async getMatchDuration(): Promise<string> {
    browser.waitUntil(async () => {
      const matchStatus = await this.parentElement.$(this.score_Duration_Selector).isExisting();
      return matchStatus === true;
    });
    return this.parentElement.$(this.score_Duration_Selector).getText();
  }

  public async isMatchPlayerNameDisplayed(expectedName: string): Promise<Boolean> {
    browser.waitUntil(async () => {
      const matchPlayerName = await this.parentElement.$(`*=${expectedName}`).isExisting();
      return matchPlayerName === true;
    });
    const actualName = (await this.parentElement.$(`*=${expectedName}`).getText())
      .replace(/[0-9]/g, '') // remove seeding
      .trim();
    return actualName === expectedName;
  }

  public async getMatchRound(): Promise<string> {
    browser.waitUntil(async () => {
      const matchStatus = await this.parentElement.$(this.score_SubTitle_Selector).isExisting();
      return matchStatus === true;
    });
    return this.parentElement.$(this.score_SubTitle_Selector).getText();
  }

  public async getEventName() : Promise<String>{
    browser.waitUntil(async() => {
      const eventName = await this.parentElement.$(this.score_SubTitle_Selector).isExisting();
      return eventName === true;
    });
    return (await this.parentElement.$(this.score_Title_Selector)).getText();

  }

  public async goToPlayerProfile(playerName: string) {
    const playerProfileLink = await this.getPlayerProfileLink(playerName);
    await playerProfileLink.click();
  }

  private async getPlayerProfileLink(playerName: string) {
    const playerNameSubtStr = playerName.split(' ');
    return this.parentElement.$(`*=${playerNameSubtStr[playerNameSubtStr.length - 2]}`);
  }

  public async getPlayerNameFromUrl(playerName: string) {
    const playerProfileLink = await this.getPlayerProfileLink(playerName);
    const link = await playerProfileLink.getAttribute('href');
    const url = link.split('/');
    return url[url.length - 1].replace('-', ' ');
  }

  public async getPlayers() {
    const playersList = await this.parentElement.$$('.player-row__team p');
    const players: string[] = [];
    for (const player of playersList) {
      // getText() does not work here to retrieve all player names as not all scorecards are
      // always visible. RegEx might not be the best way to do this
      const regex = /<p>((?:.|\n)*)<span>/; // captures name and seeding between p and span tags
      const playerHtml = await player.getHTML();
      const [, name] = playerHtml.match(regex);
      players.push(name
        .replace(/ WC$/, '') // regex to remove wildcard WC from end of string
        .replace(/ Q$/, '') // regex to remove Q from end of string
        .replace(/ A$/, '') // regex to remove A from end of string
        .replace(/[0-9]$/g, '')// regex to remove seeding from end of string
        .trim());
    }
    return players;
  }

  public async goToMatchDetails() {
    return this.parentElement.click();
  }

  public async getMatchTitle() {
    return (await this.parentElement.$('.score-header__title')).getText();
  }
}
