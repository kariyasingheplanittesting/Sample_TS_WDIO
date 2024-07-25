import WebPlayersComponent from 'src/component/playersComponent/WebPlayersComponent';
import WebBasePage from '../basePage/WebBasePage';
import WebDrawsPage from '../drawsPage/WebDrawsPage';

/**
 * Represents a web page for managing player information.
 * This class extends WebBasePage and provides methods to interact with player data.
 */

class WebPlayerPage extends WebBasePage {
  /**
   * Checks if the page is loaded by waiting for a specific element to be displayed.
   * @returns A promise that resolves to true if the element is displayed.
   */

  public async isPageLoaded() {
    return browser.waitUntil(async () =>
      (await $('//h1[@class="component-hero-type-1__heading"]')).isDisplayed()
    );
  }

  /**
   * Retrieves a list of all players on the page.
   * @returns A promise that resolves to an array of WebPlayersComponent instances.
   */

  public async getAllPlayers() {
    await this.isPageLoaded();
    const allPlayers = await $$(`.player-list__list-item`);
    return allPlayers.map((e1) => new WebPlayersComponent(e1));
  }

  /**
   * Checks if a list of player names exists on the page.
   * @param playerNames - An array of player names to check.
   * @returns True if any of the player names match; otherwise, false.
   */

  public async checkPalyerNames(playerNames: Array<string>) {
    const allPlayersList = await this.getAllPlayers();
    let answer = false;
    for (const player of allPlayersList) {
      const name = await player.getPlayerName();
      answer = playerNames.includes(name);
    }
    return answer;
  }

  /**
   * Waits for a filter option with the specified text to be displayed.
   * @param filterOption - The text of the filter option to wait for.
   */

  public async getFilterName(filterOption: string) {
    return browser.waitUntil(async () =>
      (await $(`//option[text()="${filterOption}"]`)).isDisplayed()
    );
  }

  /**
   * Filters players by a specific event.
   * @param eventName - The name of the event to filter by.
   * @returns The select element used for filtering.
   */

  public async filterPlayerByEvents(eventName: string) {
    await $(`//div[@class="filter-dropdown player-listing__event-dropdown"]`).click();

    (
      await $(`//div[@class="filter-dropdown player-listing__event-dropdown"]/select`)
    ).selectByVisibleText(eventName);
    await this.isResultsLoaded();
    return $(`//div[@class="filter-dropdown player-listing__event-dropdown"]/select`);
  }

  public async verifyPlayNameExists(playerNameSearched: string) {
    await this.isResultsLoaded();
    const allPlayerGroups = await $$('p.player-card-2018__title');

    const playerNames = [];

    for (const group of allPlayerGroups) {
      playerNames.push(await group.getText());
    }

    return playerNames.includes(playerNameSearched);
  }

  /**
   * Searches for a player by name.
   * @param player - The name of the player to search for.
   * @returns True if search results are displayed; otherwise, false.
   */

  public async searchPlayer(player: string) {
    await WebDrawsPage.searchInput(player);
    const searchResults = await $(`//div[@class="section-heading__yellow-bar"]`);
    await browser.waitUntil(async () => searchResults.isDisplayed());
    return (await this.getSearchedPlayerResults()).length > 0;
  }

  /**
   * Retrieves a list of searched player results.
   * @returns A promise that resolves to an array of WebPlayersComponent instances.
   */

  public async getSearchedPlayerResults() {
    const result = await $$(`//h3[@class="player-card-visual__title"]`);
    return result.map((e1) => new WebPlayersComponent(e1));
  }

  /**
   * Checks if search results are loaded on the page.
   * @returns A promise that resolves to true if search results are displayed.
   */

  public async isResultsLoaded() {
    return browser.waitUntil(async () =>
      (await $('//div[@class="section-heading__yellow-bar"]')).isDisplayed()
    );
  }

  /**
   * Searches for players by country.
   * @param country - The name of the country to search for.
   * @returns True if search results are displayed; otherwise, false.
   */

  public async searchCountry(country: string) {
    await WebDrawsPage.searchInput(country);
    const searchCountryResults = await $(`//h2[text()="Search results for ${country}"]`);
    await browser.waitUntil(async () => searchCountryResults.isDisplayed());
    return (await this.getSearchedCountyResults()).length > 0;
  }

  /**
   * Retrieves a list of searched country results.
   * @returns A promise that resolves to an array of WebPlayersComponent instances.
   */

  public async getSearchedCountyResults() {
    const result = await $$(`//div[@class="player-list"]`);
    return result.map((e1) => new WebPlayersComponent(e1));
  }

  /**
   * Clears the search results for a specified country.
   * @param country - The name of the country for which to clear search results.
   * @returns True if the search bar is reset to its default state; otherwise, false.
   */
  
  public async clearSearchedResults(country: string) {
    await WebDrawsPage.searchInput(country);
    const clearResults = await $(`.player-search__clear-button`);
    await clearResults.click();
    const searchBar = await $('.player-search .multiselect__tags');
    browser.waitUntil(async () => searchBar.isDisplayed());
    const searchBarText = await searchBar.getText();

    return searchBarText === 'Find a player or country';
  }
  
  public async selectPlayer(player: string) {
    const findPlayer = await $(`//h3[contains(text(),'${player}')]`);
    browser.waitUntil(async () => findPlayer.isDisplayed());
    findPlayer.click();
  }

  public async viewPlayerProfileByName() {
    const playerName = await $(`//div[@class="player-data"]//h1`);
    browser.waitUntil(async () => playerName.isDisplayed());
    await playerName.isDisplayed();
    return playerName.getText();
  }

  public async getRank(rank: string) {
    let answer: any;
    const playerRank = await $$(`.player-stats-col`);
    for (const ranking of playerRank)
      if ((await ranking.$('span').getText()).includes(rank)) {
        answer = await ranking.$('div').getText();
      }
    return answer;
  }

  public async getInfo(attribute: string) {
    const fulltable = await $(`.player-table`);
    browser.waitUntil(async () => fulltable.isDisplayed());
    let answer: any;
    const table = await $$('.player-table .row');
    for (const element of table) {
      if ((await element.$('span.player-table-cat').getText()) === attribute) {
        answer = await element.$('span.player-table-val').getText();
        break;
      }
    }
    return answer;
  }

  public async getPlayingHand(playingHand: string) {
    let answer: any;
    const table = await $$('.stats-table-row');
    for (const element of table) {
      if ((await element.$('div').getText()) === playingHand) {
        answer = await element.$('span').getText();
        break;
      }
    }
    return answer;
  }
}
export default new WebPlayerPage();
