import { binding, then } from 'cucumber-tsflow';

import WebResultsPage from 'src/pages/resultsPage/WebResultsPage';

@binding()
export default class WebResultsPageSteps {
  @then(/^I click on "([^"]*)" button$/)
  public async clickOnDayPicker(day: string) {
    await WebResultsPage.clickOnDayPicker(day);
  }

  @then(/^I see "([^"]*)" title on the filter$/)
  public async checkTitle(title: string) {
    expect(await WebResultsPage.checkTitle(title)).toBe(title);
  }

  @then(/^I see all "([^"]*)" and "([^"]*)" matches played$/)
  public async validateMatchesPlayed(menTitle: string, womenTitle: string) {
    await WebResultsPage.isResultsLoaded();
    const titleArray = [menTitle, womenTitle];
    expect(await WebResultsPage.checkEventTitles(titleArray)).toBe(true);
  }

  @then(/^I select "([^"]*)" from the dropdown menu$/)
  public async selectEvent(selectedEventTitle: string) {
    await WebResultsPage.selectEventFilterFromDropDown(selectedEventTitle);
    await WebResultsPage.clickApplyButton();
  }

  @then(/^I see "([^"]*)" matches played$/)
  public async validateMatchesByEvents(evenTitles: string) {
    await WebResultsPage.isResultsLoaded();
    const titleArray = [evenTitles];
    expect(await WebResultsPage.checkEventTitles(titleArray)).toBe(true);
  }

  @then(
    /^I select "([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)" from the dropdown menu$/
  )
  public async selectMultipleEvents(
    menSingles: string,
    womenSingle: string,
    menDoubles: string,
    womenDoubles: string,
    mixedDoubles: string,
    juniorBoySingles: string,
    juniorGirlSingles: string,
    juniorBoyDoubles: string
  ) {
    await WebResultsPage.isResultsLoaded();
    await WebResultsPage.clickResetAllButton();
    const titleArray = [
      menSingles,
      womenSingle,
      menDoubles,
      womenDoubles,
      mixedDoubles,
      juniorBoySingles,
      juniorGirlSingles,
      juniorBoyDoubles,
    ];
    await WebResultsPage.selectMultipleEvents(titleArray);
    await WebResultsPage.clickApplyButton();
  }

  @then(
    /^I see "([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)" matches played$/
  )
  public async validatedFilteredResultsByMultipleEvents(
    menSingles: string,
    womenSingle: string,
    menDoubles: string,
    womenDoubles: string,
    mixedDoubles: string,
    juniorBoySingles: string,
    juniorGirlSingles: string,
    juniorBoyDoubles: string
  ) {
    await WebResultsPage.isResultsLoaded();
    const titleArray = [
      menSingles,
      womenSingle,
      menDoubles,
      womenDoubles,
      mixedDoubles,
      juniorBoySingles,
      juniorGirlSingles,
      juniorBoyDoubles,
    ];
    expect(await WebResultsPage.checkEventTitles(titleArray)).toBe(true);
  }

  @then(/^I search player name "([^"]*)" in search box and validate results$/)
  public async validateSearchResultsByPlayer(player: string) {
    await WebResultsPage.isResultsLoaded();
    expect(await WebResultsPage.searchPlayers(player)).toBe(true);
  }

  @then(/^I search Country name "([^"]*)" in search box and validate results$/)
  public async validateSearchResultsByCountry(country: string) {
    await WebResultsPage.isResultsLoaded();
    expect(await WebResultsPage.searchPlayers(country)).toBe(true);
  }

  @then(/^I clear search results for "([^"]*)"$/)
  public async validateClearSearchResults(country:string){
    await WebResultsPage.isResultsLoaded();
    expect(await WebResultsPage.clearSearchResults(country)).toBe(true);
  }
}
