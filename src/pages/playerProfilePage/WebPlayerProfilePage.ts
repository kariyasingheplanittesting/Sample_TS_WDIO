import WebBasePage from '../basePage/WebBasePage';

class WebPlayerProfilePage extends WebBasePage {
  async isPageLoaded() {
    return browser.waitUntil(async () => (await $('.player-data')).isDisplayed());
  }

  async getPlayerName() {
    return $('.player-data h1').getText();
  }
}

export default new WebPlayerProfilePage();
