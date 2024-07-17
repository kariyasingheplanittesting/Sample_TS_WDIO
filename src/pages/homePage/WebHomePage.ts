import WebBasePage from '../basePage/WebBasePage';

class WebHomePage extends WebBasePage {
  async isHomePageLoaded(): Promise<true | void> {
    return browser.waitUntil(async () => {
      const isFeedTitleExist = await $('.homepage-recap-feed__title').isExisting();
      return isFeedTitleExist === true;
    });
  }

  async isLatestNewsDisplayed(): Promise<boolean> {
    return (await $('.latest-news')).isExisting();
  }

  async goToPlayerToWatch() {
    return (await $('.players-to-watch')).scrollIntoView(true);
  }

  async getPlayersToWatchList(className?: string): Promise<WebdriverIO.Element[]> {
    return $$(`.player-list ${className}`);
  }

  async getAllPlayers(): Promise<WebdriverIO.Element[]> {
    return this.getPlayersToWatchList('.player');
  }

  async getActivePlayer(): Promise<WebdriverIO.Element> {
    // mobile view
    if (await this.isHamburgerMenuBtnDisplayed()) {
      return $('.swiper-slide-active .players-to-watch__player-data h2');
    }
    // desktop view
    return (await this.getPlayersToWatchList('.player.active'))[0];
  }

  async getPlayerListFromPlayerToWatch(): Promise<WebdriverIO.Element[]> {
    return $$('.player-list .player');
  }

  async isPlayersToWatchDisplayed(): Promise<boolean> {
    await this.goToPlayerToWatch();
    return (await $('.players-to-watch')).isDisplayed();
  }

  async isPlayersToWatchListDisplayed(): Promise<boolean> {
    await this.goToPlayerToWatch();
    return (await $('.player-list')).isDisplayed();
  }

  async isDefaultPlayerActive(expectedPlayer: string) {
    return (await (await this.getActivePlayer()).getText() === expectedPlayer);
  }

  async selectPlayerByName(expectedPlayerName: string): Promise<boolean> {
    // if mobile
    if (await this.isHamburgerMenuBtnDisplayed()) {
      const seenPlayers = [];
      let activePlayerName = await (await this.getActivePlayer()).getText();
      do {
        if (activePlayerName === expectedPlayerName) {
          return true;
        }
        seenPlayers.push(activePlayerName);
        await this.clickMobileNextPlayerButton();
        
        activePlayerName = await (await this.getActivePlayer()).getText();
      } while (!seenPlayers.includes(activePlayerName));
      return false;
    }

    // if desktop
    const players = await this.getAllPlayers();
    let selectedPlayer: WebdriverIO.Element;

    for (const player of players) {
      // eslint-disable-next-line no-await-in-loop
      const name = await player.getText();
      if (name === expectedPlayerName) {
        selectedPlayer = player;
        await selectedPlayer.click();
        return true;
      }
    }
    // failed to find player
    return false;
  }

  async verifyActivePlayer(player: string): Promise<boolean> {
    const playerDisplayed = await $('.swiper-slide-active .players-to-watch__player-data h2');
    const activePlayer = await (await this.getActivePlayer()).getText();
    return activePlayer === (await playerDisplayed.getText()) && activePlayer === player;
  }

  async goToViewPlayersProfile() {
    const viewProfileBtn = await $('.swiper-slide-active .players-to-watch__action-btns a');
    await viewProfileBtn.click();
    return browser.waitUntil(async () =>
      (await $('.player-data h1')).isDisplayed()
    );
  }

  async isViewAllPlayersButtonExist(): Promise<boolean> {
    return (
      await $('a.players-to-watch__view-all-button.ao-button.ao-button--white-1')
    ).isExisting();
  }

  async goToAllPlayersPage() {
    await (await $('a.players-to-watch__view-all-button.ao-button.ao-button--white-1')).click();
  }

  async clickFirstLatestNews(): Promise<string> {
    const singleArticleTitleSelector = '.single-article__title';
    const headingTitle = await (await $(singleArticleTitleSelector)).getText();
    await (await $(singleArticleTitleSelector)).click();
    return headingTitle;
  }

  async clickAllNewsButton(): Promise<void> {
    if (await (await $('.ao-button--cms')).isClickable()) {
      await (await $('.ao-button--cms')).click();
    }
  }

  async clickAoLiveRadioButton(): Promise<void> {
    await (await $('.ao-live-radio')).click();
  }

  async clickAoShowButton(): Promise<void> {
    await (await $('*=Show')).click();
  }

  async clickMobileNextPlayerButton(): Promise<void> {
    await (await $('.players-to-watch .swiper-button-next')).click();
  }
}

export default new WebHomePage();
