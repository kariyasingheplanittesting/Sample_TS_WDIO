import { binding, when } from 'cucumber-tsflow';
import AppScoresScreen from 'src/pages/scoresPage/AppScoresScreen';

@binding()
export default class AppScoresSteps {
  @when(/^no details of live matches are visible$/)
  public async canNotSeeContentOfLiveScoresDetails() {
    expect(await AppScoresScreen.isLiveContentDisplayed()).toBe(false);
  }

  @when(/^there are no live matches in progress$/)
  public async noLiveMatchesInProgress() {
    // This is an empty step that has been added for readability
  }
}
