import WebBasePage from '../basePage/WebBasePage';

class WebHomePage extends WebBasePage {
  async isHomePageLoaded(): Promise<true | void> {
    return browser.waitUntil(async () => {
      const isFeedTitleExist = await $(".header-main__nav-menu").isExisting();
      return isFeedTitleExist === true;
    });
  }

  async isLatestNewsDisplayed(): Promise<boolean> {
    return (await $('.latest-news')).isExisting();
  }

  async isHeadingDisplayed(title: string){
    const headingList = (await $$(`.heading-link__title`));
    let answer = false; 

    for(const heading of headingList){
       const name = await heading.getText();
      if (name === title ) {
        answer = true;
        break;
       
      }
  }

  return answer;
}

  async getFeaturedPlayersList(className?: string): Promise<WebdriverIO.Element[]> {
    return $$(`.player-circles ${className}`);
  }

  async getAllPlayers(): Promise<WebdriverIO.Element[]> {
    return this.getFeaturedPlayersList('.player-circle__name');
  }

  async getActivePlayer(): Promise<WebdriverIO.Element> {
    // mobile view
    if (await this.isHamburgerMenuBtnDisplayed()) {
      return $('.swiper-slide-active .players-to-watch__player-data h2');
    }
    // desktop view
    const listOfFeaturedPlayers = (await this.getFeaturedPlayersList('p.player-circle__name'))
    return (listOfFeaturedPlayers)[0];
  }

  async getPlayerListFromFeaturedPlayers(): Promise<WebdriverIO.Element[]> {
    return $$('.player-circle__name');
  }

  async isFeaturedPlayersDisplayed(): Promise<boolean> {
    return (await $('.player-circles')).isDisplayed();
  }

  async isFeaturedPlayersListDisplayed(): Promise<boolean> {
    // await this.goToFeaturedPlayers();
    return (await $(`//div[@class="player-circles__wrapper player-circles__wrapper--desktop"]`)).isDisplayed();
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
    // const activeElement = (await this.getActivePlayer())
    // const activePlayer = await (activeElement).getText();
    return player === (await playerDisplayed.getText());
  }

  async goToViewPlayersProfile(player:string) {
    const viewProfileBtn = await $(`//p[@class='player-circle__name' and text()='${player}']`);
    await viewProfileBtn.click();
    return browser.waitUntil(async () =>
      (await $('.player-data h1')).isDisplayed()
    );
  }

  async isViewAllPlayersButtonExist(): Promise<boolean> {
    return (
      await $(`//div[@class="player-circles"]//child::a[contains(text(),"See all")]`)
    ).isExisting();
  }

  async goToAllPlayersPage() {
    await (await $(`//div[@class="player-circles"]//child::a[contains(text(),"See all")]`)).click();
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

  async clickLeftArrow(){
    await (await $(`//button[@aria-label="Previous"]`)).click();
  }

  async clickRightArrow(){
    await (await $(`//button[@aria-label="Next"]`)).click();
  }
}

export default new WebHomePage();
