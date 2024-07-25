import WebMatchCard from 'src/component/matchCardComponent/WebMatchCardComponent';
import WebBasePage from '../basePage/WebBasePage';
import WebDrawsPage from '../drawsPage/WebDrawsPage';

class WebResultsPage extends WebBasePage {
  async isPageLoaded() {
    return browser.waitUntil(async () =>
      (await $('//h1[@class="component-hero-type-1__heading"]')).isDisplayed()
    );
  }

  public async clickOnDayPicker(day: string) {
    const selectedDay = await $(
      `//div[ contains(@class, "desktop")]//button[normalize-space(text())='${day}']`
    );
    if (selectedDay === null) {
      throw new Error(`Can not find the "${day}"`);
    } else {
      browser.waitUntil(async () => selectedDay.isClickable());
      await selectedDay.click();
    }
  }

  public async checkTitle(title: string) {
    const getTitle = (await $(`//button[contains (text(), "${title}")]`)).getText();
    return getTitle;
  }

  public async getAllMatchesOnSelectedDay() {
    const matches = await $$(`//div[@class="live-scores__row"]/child::div[@class="score-row"]`);
    return matches.map((e1) => new WebMatchCard(e1));
  }

  public async checkEventTitles(evenTitles: Array<string>) {
    const matchScoreCard = await this.getAllMatchesOnSelectedDay();
    let answer = false;
    for (const match of matchScoreCard) {
      const title = await match.getMatchTitle();
      answer = evenTitles.includes(title);
    }
    return answer;
  }

  public async selectEventFilterFromDropDown(selectedEventTitle: string) {
    const selectEventDropDown = await $(`//button[@class="mobile-tray__toggle"]`);
    browser.waitUntil(async () => selectEventDropDown.isClickable());
    await selectEventDropDown.click();

    const selectEventTitle = await $(`//label[contains(text(), "${selectedEventTitle}")]`);
    await browser.waitUntil(async () => selectEventTitle.isClickable());

    await selectEventTitle.click();
  }

  public async clickApplyButton() {
    const selectEventTitle = await $(`//button[contains (text(),"Apply")]`);
    await browser.waitUntil(async () => selectEventTitle.isClickable());

    await selectEventTitle.click();
  }

  public async isResultsLoaded() {
    return browser.waitUntil(async () =>
      (await $('//div[@class="live-scores__wrapper"]')).isDisplayed()
    );
  }

  public async selectMultipleEvents(multipleEvents: Array<string>) {
    const selectEventDropDown = await $(`//div[@class="filter-bar__item"]/div/button`);
    browser.waitUntil(async () => selectEventDropDown.isClickable());
    await selectEventDropDown.click();

    for (const event of multipleEvents) {
      const selectEventTitle = await $(`//label[contains(text(), "${event}")]`);
      await browser.waitUntil(async () => selectEventTitle.isClickable());

      await selectEventTitle.click();

      this.selectEventFilterFromDropDown(event);
    }
  }

  public async clickResetAllButton() {
    const resetAll = await $(`//button[contains (text(),"Reset all")]`);
    await resetAll.click();
  }

  public async searchPlayers(player: string) {
    await WebDrawsPage.searchInput(player);
    const searchResults = await $(`//div[@class="result-count player-search__result-count"]`);
    await browser.waitUntil(async () => searchResults.isDisplayed());
    return (await this.getAllMatchesOnSelectedDay()).length > 0;
  }

  public async searchCountry(country: string) {
    await WebDrawsPage.searchInput(country);
    const searchResults = await $(`//div[@class="result-count player-search__result-count"]`);
    await browser.waitUntil(async () => searchResults.isDisplayed());
    return (await this.getAllMatchesOnSelectedDay()).length > 0;
  }

  public async clearSearchResults(country: string) {
    await WebDrawsPage.searchInput(country);
    const clearResults = await $(`//button[@class="player-search__clear-button"]`);
    await clearResults.click();

    const searchBar = await $('.player-search .multiselect__tags');
    browser.waitUntil(async () => searchBar.isDisplayed());

    const searchBarText = await searchBar.getText();
    return searchBarText === "Find a player or country";
  }
}

export default new WebResultsPage();
