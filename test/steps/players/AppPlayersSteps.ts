import { binding, when } from 'cucumber-tsflow';
import AppPlayersScreen from 'src/pages/players/AppPlayersScreen';

@binding()
export default class AppPlayersSteps {
  @when(/^I can see "([^"]*)" is in the list$/)
  public async canSeeFavouritesList(playerName: string) {
    expect(await AppPlayersScreen.isPlayerListed(playerName)).toBe(true);
  }
}
