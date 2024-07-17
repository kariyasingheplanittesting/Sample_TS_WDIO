import WebMatchCard from 'src/component/matchCardComponent/WebMatchCardComponent';
import WebBasePage from '../basePage/WebBasePage';


class WebMatchDetailsPage extends WebBasePage {
  async isPlayersNameDisplayed(players: string[]): Promise<Boolean> {
    const [playerOne, playerTwo, playerThree, playerFour] = players;
    await browser.waitUntil(async () => {
      const isPlayerNameDisplayed = await $('.player-name').isExisting();
      return isPlayerNameDisplayed === true;
    });

    // Note that for doubles:
    //   actualPlayerNames[0] includes 2 players from the first team
    //   actualPlayerNames[1] includes 2 players from the second team
    const actualPlayerNames = await $$('.player-name');
    const actualTeamOne = await actualPlayerNames[0].getText();
    const actualTeamTwo = await actualPlayerNames[1].getText();

    // Doubles
    if (playerThree !== undefined) {
      // split, remove trailing newlines, and remove whitespace
      const actualPlayerOne = actualTeamOne.split('/')[0].trim();
      const actualPlayerTwo = actualTeamOne.split('/')[1].trim();
      const actualPlayerThree = actualTeamTwo.split('/')[0].trim();
      const actualPlayerFour = actualTeamTwo.split('/')[1].trim();
      return (
        actualPlayerOne === playerOne &&
        actualPlayerTwo === playerTwo &&
        actualPlayerThree === playerThree &&
        actualPlayerFour === playerFour
      );
    }

    // Singles
    const actualPlayerOne = actualTeamOne.replace('vs', '').trim();
    const actualPlayerTwo = actualTeamTwo.trim();
    return actualPlayerOne === playerOne && actualPlayerTwo === playerTwo;
  }

  async isChosenSectionDisplayed(sectionName: string): Promise<Boolean> {
    const navSelected = await $('.tab-nav.is-active');
    return (await navSelected.getText()) === sectionName;
  }

  async clickStatsNavButton(): Promise<void> {
    await $('=Stats').click();
    browser.waitUntil(async () => (await $('tab-nav.is-active').getText()) === 'Stats');
  
}

 async clickTabsNavButton(chosenTab:string): Promise<void> {
   await $(`=${chosenTab}`).click();
  browser.waitUntil(async () => (await $('tab-nav.is-active').getText()) === chosenTab);
  
}

  async getFirstMatchCard(): Promise<WebMatchCard> {
    return new WebMatchCard(await $('.scorecards-container'));
  }

  async isPageLoaded() {
    return browser.waitUntil(async () => (await $('.score-header__title')).isDisplayed());
  }

  async isPlayersExist(expectedPlayers: string[]) {
    const playersOnPage = await $$('.player-row__team p');
    let allExpectedPlayersExist = false;
    const namesOnPage = [];

    for (const playerOnPage of playersOnPage) {
      const name = (await playerOnPage
        .getText())
        .replace(/ WC$/, '') // regex to remove wildcard WC from end of string
        .replace(/ Q$/, '') // regex to remove Q from end of string
        .replace(/ A$/, '') // regex to remove A from end of string
        .replace(/[0-9]$/g, '')// regex to remove seeding from end of string
        .trim();
      namesOnPage.push(name);
    }

    for (const expectedPlayerName of expectedPlayers) {
      allExpectedPlayersExist = namesOnPage.includes(expectedPlayerName);
      if (!allExpectedPlayersExist) 
      break;
    }
    return allExpectedPlayersExist;
  }

  async isScoreCardTitleHasTheEventName(name: string) {
    const matchCard = new WebMatchCard(await $('.score-row__wrapper'));
    return (await matchCard.getMatchTitle()).includes(name);
  }


  async getCommentaryText(sectionName: string): Promise<Boolean> {
    const navSelected = await $('.commentary-row__commentary');
    return (await navSelected.getText()) === sectionName;
  }

  async getStatsValue(sectionName: string, leftValue:string, rightValue:string): Promise<Boolean> {

    let answer = false;

    const selectLeftValue = await $(`(//p[contains(text(), "${sectionName}")])[1]/preceding-sibling::p`);
    answer = (await selectLeftValue.getText()) === leftValue;

    if (answer === true) {

    const selectRightValue = await $(`(//p[contains(text(), "${sectionName}")])[1]/following-sibling::p`);
    answer = (await selectRightValue.getText()) === rightValue;
    
    }
    return answer;

  }

}
export default new WebMatchDetailsPage();
