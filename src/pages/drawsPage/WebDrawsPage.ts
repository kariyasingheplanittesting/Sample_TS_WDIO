import WebMatchCard from 'src/component/matchCardComponent/WebMatchCardComponent';
import WebBasePage from '../basePage/WebBasePage';
import WebMatchDetailsPage from '../matchDetailsPage/WebMatchDetailsPage';

class WebDrawsPage extends WebBasePage {
  private readonly events_Filter_Selector = '.filter-dropdown__display';

  async isPageLoaded() {
    return browser.waitUntil(async () => {
      const knockoutRoundHeading = await $$('.knockout-round-heading h3');
      // NOTE:  we are using getHTML() here as getText() does not work towards
      //       the end of the tournament as the first round heading is not visible
      //       when the page loads during the later rounds
      const knockoutFirstRoundHeading = knockoutRoundHeading[0].getHTML();
      return (await knockoutFirstRoundHeading).includes('1st Round');
    });
  }

  async clickRoundNavBtn(round: string): Promise<boolean> {
    let feedTitleSelector: string;
    switch (round) {
      case '1st Round':
        feedTitleSelector = '.round-navigation__group--R1';
        break;
      case '2nd Round':
        feedTitleSelector = '.round-navigation__group--R2';
        break;
      case '3rd Round':
        feedTitleSelector = '.round-navigation__group--R3';
        break;
      case '4th Round':
        feedTitleSelector = '.round-navigation__group--R4';
        break;
      case 'Quarterfinals':
        feedTitleSelector = '.round-navigation__group--QF';
        break;
      case 'Semifinals':
        feedTitleSelector = '.round-navigation__group--SF';
        break;
      case 'Finals':
        feedTitleSelector = '.round-navigation__group--F';
        break;
      default:
        throw Error("Invalid round given");
    }
    await browser.waitUntil(async () => {
      const isFeedTitleClickable = await $(feedTitleSelector).isClickable();
      return isFeedTitleClickable === true;
    });

// Click on the element selected by feedTitleSelector
await $(feedTitleSelector).click();


// Find the correct heading
const allFeedTitles = await $$('.knockout-round-heading__heading');

let feedTitle: WebdriverIO.Element;

// Iterate through each element to find the first one that contains the round text
await Promise.all(allFeedTitles.map(async (title) => {
  const text = await title.getHTML();
  if (text.includes(round)) {
    feedTitle = title;
  }
}));

if (!feedTitle) {
  // Handle the case when the feedTitle is not found
  throw new Error(`Feed title with "${round}" not found.`);
}

// Wait until the filtered feedTitle element is displayed in the viewport
await feedTitle.waitForDisplayed();

// Verify that the HTML of the feedTitle contains the round value
const feedTitleHTML = await feedTitle.getHTML();
if (!feedTitleHTML.includes(round)) {
  // Handle the case when the feedTitle HTML does not contain the round value
  throw new Error(`Feed title HTML "${feedTitleHTML}" does not include "${round}".`);
}else{
  return true
}
  
}

  async openMatch(players: string[]): Promise<boolean> {
    const matches = await $$('.score-row__players-wrapper');
    for (const match of matches) {
      if (await this.arePlayersPresentOnMatchCard(players, match)) {
        await match.waitForClickable();
        await match.click();
        return true;
      }
    }
    return false;
  }

  async arePlayersPresentOnMatchCard(
    players: string[],
    match: WebdriverIO.Element
  ): Promise<Boolean> {
    const matchCardPlayersEl = match.$$('.player-row__team');
    const matchCardPlayers = await matchCardPlayersEl.map(async (el) =>
      (
        await el.getText()
      )
        .replace(/[0-9]/g, '') // removing seeding
        .trim() // remove spaces
    ); 
    for (const player of players) {
      // player 3 and 4 are undefined if it's a singles match
      if (player !== undefined) {
        if (!matchCardPlayers.includes(player)) return false;
      }
    }
    return true;
  }

  async isEventsFilterDisplayed() {
    return (await $(this.events_Filter_Selector)).isDisplayed();
  }

  async getEventsFilteredOption() {
      return (await $(this.events_Filter_Selector)).getText();
  }

  async getStatFilteredOption() {
    return (await (await $('//nav[@class="match-center-stats__filter-container"]//div/span')).getText()).trim();

  }

  async getAllMatchesFromActiveRound() {
    const matches = await $$('.knockout-tree__column.swiper-slide-active .draws-score-row');
    return matches.map((el) => new WebMatchCard(el));
  }

  async getAllMatchesFromNextRound() {
    const matches = await $$('.knockout-tree__column.swiper-slide-next .draws-score-row');
    return matches.map((el) => new WebMatchCard(el));
  }

  async getTheHighlightedMatches() {
    const highlightedMatches = await $$('.player-row--highlighted');
    return highlightedMatches.map((el) => new WebMatchCard(el));
  }

  async goToAnyMatchDetail() {
    // It's necessary to navigate to the first round before selecting match
    //     cards as the active rounds are not always visible/clickable on load
    await this.clickRoundNavBtn("1st Round");
    const matchScoreCards = await this.getAllMatchesFromActiveRound();
    const randomMatchScoreCard = Math.floor(Math.random() * matchScoreCards.length);
    const cardData = matchScoreCards[randomMatchScoreCard];
    await cardData.goToMatchDetails();
    return WebMatchDetailsPage.isPageLoaded();
  }

  async isPlayerDisplayedInMatchesHighlighted(searchStr: string) {
    const matchesHighlighted = await this.getTheHighlightedMatches();
    let isPlayerExistInMatchesHighlighted = true;
    for (const match of matchesHighlighted) {
      const playersInMatch = await match.getPlayers();
      const playerExistInMatch = playersInMatch.some((el) => el.includes(searchStr));
      if (!playerExistInMatch) {
        isPlayerExistInMatchesHighlighted = false;
        break;
      }
    }
    return isPlayerExistInMatchesHighlighted;
  }

  async searchPlayer(searchStr: string) {
    await this.searchInput(searchStr);
    await this.isPageLoaded();
    return (await this.getTheHighlightedMatches()).length > 0;
  }

  private async searchInput(searchStr: string) {
    await browser.waitUntil(async () => {
      const isSearchClickable = (await (await $('.player-search .multiselect__tags')).isClickable());
      return isSearchClickable === true;
    });
    
    const searchBar = await $('.player-search .multiselect__tags');
    await searchBar.click();
    const searchInput = await searchBar.$('#multiselect-player-search');
    await searchInput.setValue(searchStr);
    // click highlighted result (which is the first one), sending enter key isn't supported
    // by certain browsers on BrowserStack
    await (await $('.multiselect__option--highlight')).click();
  }

  async selectDropDown(event: string) {
    return (await $('.filter-dropdown__select')).selectByVisibleText(event);
  }

  async selectStatDropDown(event: string) {
    return (await $('//nav[@class="match-center-stats__filter-container"]/div/select')).selectByVisibleText(event);
  }

}

export default new WebDrawsPage();
