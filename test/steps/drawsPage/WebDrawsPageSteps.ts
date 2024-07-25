import { binding, then, when } from 'cucumber-tsflow';
import WebDrawsPage from 'src/pages/drawsPage/WebDrawsPage';
import WebMatchDetailsPage from 'src/pages/matchDetailsPage/WebMatchDetailsPage';

@binding()
export default class WebDrawsPageSteps {
  @when(/^I see Draws page has loaded$/)
  public async whenISeeDrawsPageHasLoaded() {
    expect(await WebDrawsPage.isPageLoaded()).toBe(true);
  }

  @then(/^I can see the match events filter$/)
  public async thenISeeMatchEventsFilter() {
    expect(await WebDrawsPage.isEventsFilterDisplayed()).toBe(true);
  }

  @then(/^I can see the "([^"]*)" as default event$/)
  public async thenICanSeeTheDefaultEvent(defaultEvent: string) {
    expect(await WebDrawsPage.getEventsFilteredOption()).toBe(defaultEvent);
  }

  @then(/^I can filter matches by event "([^"]*)"$/)
  @when(/^I filtered matches by event "([^"]*)"$/)
  public async thenICanFilterMatcheEvents(event: string) {
    await WebDrawsPage.selectDropDown(event);
    expect(await WebDrawsPage.getEventsFilteredOption()).toBe(event);
    await WebDrawsPage.isPageLoaded();
  }

  @then(/^I can see Matches for (.+)$/)
  public async thenICanSeeMatchesForGivenEvent(eventName: string) {
    expect(await WebDrawsPage.goToAnyMatchDetail()).toBe(true);
    expect(await WebMatchDetailsPage.isScoreCardTitleHasTheEventName(eventName)).toBe(true);
  }

  @then(/^I can see matches for the event$/)
  public async thenICanMatchesForSelectedEvent() {
    expect((await WebDrawsPage.getAllMatchesFromActiveRound()).length).toBeGreaterThan(0);
  }

  @then(/^I search player "([^"]*)"$/)
  public async thenSearchPlayer(playerName: string) {
    expect(await WebDrawsPage.searchPlayer(playerName)).toBe(true);
  }

  @then(/^I see all the matches played by "([^"]*)"$/)
  public async thenISeeAllTheMatchesPlayedBy(playerName: string) {
    expect(await WebDrawsPage.isPlayerDisplayedInMatchesHighlighted(playerName)).toBe(true);
  }


}
