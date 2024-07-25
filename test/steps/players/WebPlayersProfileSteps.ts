import { DataTable } from '@wdio/cucumber-framework';
import { binding, when, then } from 'cucumber-tsflow';
import WebPlayersPage from 'src/pages/players/WebPlayersPage';

@binding()
export default class WebPlayersSteps {
  @when(/^I click on name of ([^"]*)$/)
  public async whenIClickOnPlayerName(player: string) {
    await WebPlayersPage.selectPlayer(player);
  }

  @then(/^I see the player profile of ([^"]*)$/)
  public async iseePlayerProfilePage(playerName: string) {
    expect(await WebPlayersPage.viewPlayerProfileByName()).toBe(playerName);
  }

  
  @then(/^I see the ranks of the player ([^"]*) including ([^"]*) and ([^"]*)$/)
  public async ISeePlayerRanks(playerName: string,singlesRank: string,doublesRank:string ) {
    expect(await WebPlayersPage.viewPlayerProfileByName()).toBe(playerName);
    expect(await WebPlayersPage.getRank("Singles Rank")).toBe(singlesRank);
    expect(await WebPlayersPage.getRank("Doubles Rank")).toBe(doublesRank);

  }


  @then(/^I see all details of the player$/)
  public async allplayerDetails(table: DataTable) {
    const tableData = table.hashes();
    const details = tableData[0];
    await this.ISeePlayerRanks(details.Player,details.SinglesRank,details.DoublesRank)
    await this.playerDetails("Age", details.Age)
    await this.playerDetails("Born",details.Born)
    await this.playerDetails("Height",details.Height)
    await this.playerDetails("Weight",details.Weight)
    expect(await WebPlayersPage.getPlayingHand("Playing Hand")).toBe(details.PlayingHand);
  }
   
  @then(/^I see the player detail "([^"]*)" as ([^"]*)$/)
  public async playerDetails(detail: string, value:string ){
    expect(await WebPlayersPage.getInfo(detail)).toBe(value);
    
}
}
