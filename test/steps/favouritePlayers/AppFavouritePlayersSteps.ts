import { binding, then, when, given } from 'cucumber-tsflow/dist';
import AppPlayerScreen from 'src/pages/playerProfilePage/AppPlayerProfileScreen';
import AppHomeScreen from 'src/pages/homePage/AppHomeScreen';
import { IPlayer } from 'src/model/PlayerModel';
import AppAllPlayersPage from 'src/pages/allPlayersPage/AppAllPlayersScreen';

@binding()
export default class AppFavouritePlayersSteps {
  @then(/^I selected "(.+)" from Suggested Players list$/)
  @when(/^I select "(.+)" from Suggested Players list$/)
  public async whenISelectPlayerFromSuggestedPlayerList(playerName: string) {
    await AppHomeScreen.selectSuggestedPlayer(playerName);
  }

  @then(/^I can see following details on Players screen$/)
  public async thenICanSeePlayerDetails(table) {
    const tableData = table.hashes();
    const player: IPlayer = tableData[0] as IPlayer;
    expect(await AppPlayerScreen.isPlayerNameExists(player.name)).toBe(true);
    expect(await AppPlayerScreen.isCountryOfPlayerExists(player.country)).toBe(true);
    expect(await AppPlayerScreen.isPlayerAgeExists(player.age)).toBe(true);
    expect(await AppPlayerScreen.isSinglesSeedNumberExists(player.singlesSeed)).toBe(true);
    expect(await AppPlayerScreen.isSinglesRankExists(player.singlesRank)).toBe(true);
    expect(await AppPlayerScreen.isDoublesSeedNumberExists(player.doublesSeed)).toBe(true);
    expect(await AppPlayerScreen.isDoublesRankExists(player.doubleRank)).toBe(true);
  }

  @when(/^I add player "(.+)" to the Favourites list$/)
  public async givenIAddPlayerToFavourites(playerName: string) {
    expect(await AppPlayerScreen.isPlayerNameExists(playerName)).toBe(true);
    await AppPlayerScreen.addPlayerToFavourites();
  }

  @then(/^I can see the player has "([^"]*)" label$/)
  public async thenPlayerIsAddedToFavourited(label: string) {
    expect(await AppPlayerScreen.isPlayerAddedToFavourited(label)).toBe(true);
    await AppPlayerScreen.removeFavouritedPlayer();
  }

  @given(/^player "(.+)" is added to the "(.+)" list$/)
  public async playerIsAddedToFavouritedList(playerName: string, label: string) {
    expect(await AppPlayerScreen.isPlayerNameExists(playerName)).toBe(true);
    await AppPlayerScreen.addPlayerToFavourites();
    expect(await AppPlayerScreen.isPlayerAddedToFavourited(label)).toBe(true);
  }

  @then(/^I can see "(.+)" is in Favourite Players list$/)
  public async thenICanSeePlayerIsInFavouritePlayerslist(playerName: string) {
    expect(await AppHomeScreen.isFavouritePlayerExistInFavouriteList(playerName)).toBe(true);
  }

  @when(/^I navigate to All players screen$/)
  public async thenINavigateToAllPlayersScreen() {
    await AppHomeScreen.clickAllPlayersButton();
  }

  @then(/^I can see "(.+)" in Favourites section$/)
  public async thenICanSeePlayerInFavouritesSection(playerName: string) {
    await AppAllPlayersPage.clickFavouritesSection();
    expect(await AppAllPlayersPage.isFavouritePlayerDisplayed(playerName)).toBe(true);
  }
}
