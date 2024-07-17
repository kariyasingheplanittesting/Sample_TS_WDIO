import WebMatchCard from 'src/component/matchCardComponent/WebMatchCardComponent';
import WebDay from 'src/component/WebDaysPickerPanelComponent';
import BasePage from '../basePage/BasePage';
import WebMatchDetailsPage from '../matchDetailsPage/WebMatchDetailsPage';

class WebMatchSchedulePage extends BasePage {
  private readonly scheduled_Matches_Score_Row_Wrapper_Selector = '.score-row__wrapper';

  async isPageLoaded() {
    return browser.waitUntil(async () => {
      const scheduleLocationList = await $$('.schedule-location__location-title');
      const locationNameForFirstCourt = scheduleLocationList[0].getText();
      return (await locationNameForFirstCourt) !== '';
    });
  }

  async isDaysPickerPanelDisplayed() {
    const desktopPickerIsDisplayed = (await $('.day-selectors--swiper')).isDisplayed();
    const mobilePickerIsDisplayed = (await $('.day-selectors__mobile')).isDisplayed();
    return ((await desktopPickerIsDisplayed) || (await mobilePickerIsDisplayed));
  }

  async getAllDaysFromDaysPickerPanel() {
    await browser.waitUntil(async () => {
      const isLocationTitleVisible = await (await $(`.schedule-location__location-title`)).isDisplayed();
      return isLocationTitleVisible === true;
    });

    const isMobile = await (await $('.day-selectors__mobile')).isDisplayedInViewport();
    let daysList: WebdriverIO.Element[];
    
    // check if in mobile/skinny window view
    if (isMobile) {
      daysList = await $$('.day-selectors__days-list-mobile .day-list__link');
    } else {
      daysList = await $$('.day-selectors__desktop .swiper-slide .day-list__link');
    }
    return daysList.map((el) => new WebDay(el));
  }

  async getActiveDay() { 
    await browser.waitUntil(async () => {
      const isLocationTitleVisible = await (await $(`.schedule-location__location-title`)).isDisplayed();
      return isLocationTitleVisible === true;
    });
    
    const isMobile = await (await $('.day-selectors__mobile')).isDisplayedInViewport();
    let activeDay: WebdriverIO.Element;

    // check if in mobile/skinny window view
    if (isMobile) {
      activeDay = await $('.day-selectors__days-list-mobile .day-list__link--active');
    } else {
      activeDay = await $('.day-selectors__desktop .swiper-slide .day-list__link--active');
    }
    return new WebDay(activeDay);
  }

  async getSelectedDay() { 
    await browser.waitUntil(async () => {
      const isLocationTitleVisible = await (await $(`.schedule-location__location-title`)).isDisplayed();
      return isLocationTitleVisible === true;
    });
    
    const isMobile = await (await $('.day-selectors__mobile')).isDisplayedInViewport();
    let selectedDay: WebdriverIO.Element;

    // check if in mobile/skinny window view
    if (isMobile) {
      selectedDay = await $('.day-selectors__days-list-mobile .day-list__link--selected');
    } else {
      selectedDay = await $('.day-selectors__desktop .swiper-slide .day-list__link--selected');
    }
    return new WebDay(selectedDay);
  }

  async getAllMatches() {
    const matches = await $$(this.scheduled_Matches_Score_Row_Wrapper_Selector);
    return matches.map((el) => new WebMatchCard(el));
  }

  public async getMatchesScheduled() {
    return $$(this.scheduled_Matches_Score_Row_Wrapper_Selector);
  }

  async isMatchCardForGivenPlayersExist(players: string[]) {
    const matchList = await this.getAllMatches();
    let isCardExist = false;
    for (const match of matchList) {
      const playersList = await match.getPlayers();
      const areThePlayersInBothArrayEqual = await this.Equals(players, playersList);
      if (areThePlayersInBothArrayEqual) {
        isCardExist = true;
        break;
      }
    }
    return isCardExist;
  }

  async goToMatchDetails(players: string[]) {
    const matchList = await this.getAllMatches();
    for (const match of matchList) {
      const playersList = await match.getPlayers();
      if (await this.Equals(players, playersList)) {
        match.goToMatchDetails();
        await WebMatchDetailsPage.isPageLoaded();
        break;
      }
    }
    return null;
  }

  async goToPlayersProfile(player: string) {
    const matchList = await this.getAllMatches();
    let playerName = '';
    for (const match of matchList) {
      const playersList = await match.getPlayers();
      if (playersList.includes(player)) {
        playerName = await match.getPlayerNameFromUrl(player);
        await match.goToPlayerProfile(player);
        break;
      }
    }
    return playerName;
  }

  async goToTheGivenDay(dayInPanel: string) {
    const daysList = await this.getAllDaysFromDaysPickerPanel();
    for (const day of daysList) {
      const dayTitle = await day.getDay();
      if (dayTitle === dayInPanel) {
        (await day.getDayElement()).click();
        break;
      }
    }
  }

  private async Equals(playerNames: string[], playerNamesFromElements: string[]) {
    return (
      playerNames.length === playerNamesFromElements.length &&
      playerNames.every((i, j) => i === playerNamesFromElements[j])
    );
  }
}

export default new WebMatchSchedulePage();
