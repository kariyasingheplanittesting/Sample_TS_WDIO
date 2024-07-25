import WebBasePage from '../basePage/WebBasePage';

class SearchPage extends WebBasePage {
  public async clickSearch() {
    const searchButton = await $(
      `//div[@class="secondary-nav-wrapper flex-basis"]//div[@class="action-container"]`
    );
    browser.waitUntil(async () => searchButton.isClickable());
    await searchButton.click();
  }

  public async viewSearchBar() {
    return browser.waitUntil(async () =>
      (await $(`//input[@class="form-autocomplete form-text ui-autocomplete-input"]`)).isDisplayed()
    );
  }

  public async setSearchWord(searchWord: string) {
    return $(`//input[@class="form-autocomplete form-text ui-autocomplete-input"]`).setValue(
      searchWord
    );
  }

  public async viewSearchResults(searchName: string) {
    const element = $(`//span[contains(text(),'${searchName}')]`);
    element.waitForDisplayed();
    if (element.isExisting()) {
      return true;
    }
    return false;
  }

  public async selectMatchedItem(matchedName: string) {
    const matchedRecord = $(`//span[contains(text(),'${matchedName}')]`);
    matchedRecord.waitForDisplayed();
    await matchedRecord.click();
  }

  public async viewPlayerProfilePage() {
    const playerName = await $(`//div[@class="player-data"]//h1`);
    browser.waitUntil(async () => playerName.isDisplayed());
    await playerName.isDisplayed();
    return playerName.getText();
  }

  public async viewNewsArticlePage() {
    const articleTitle = await $(`//div[@class="article-title"]//h1`);
    browser.waitUntil(async () => articleTitle.isDisplayed());
    await articleTitle.isDisplayed();
    return articleTitle.getText();
  }

  public async viewVideoCard() {
    const videoTitle = await $(`//div[@class="card-inner"]//h3`);
    browser.waitUntil(async () => videoTitle.isDisplayed());
    await videoTitle.isDisplayed();
    return videoTitle.getText();
  }
}
export default new SearchPage();
