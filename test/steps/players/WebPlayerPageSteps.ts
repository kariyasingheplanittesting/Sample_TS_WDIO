import { binding, then } from 'cucumber-tsflow';

import WebPlayersPage from 'src/pages/players/WebPlayersPage';

@binding()  
export default class WebPlayerPageSteps{
    @then(/^I see more than "(\d+)" players displayed$/)
    public async validateAllPlayerList(playerCount:number){
    
       const playerList = await WebPlayersPage.getAllPlayers();
       expect(playerList.length).toBeGreaterThanOrEqual(playerCount);

    }

    @then(/^by default "([^"]*)" filtering option is selected$/)
    public async validateDefultFilterSelected(eventName:string){
       expect ( await WebPlayersPage.getFilterName(eventName)).toBe(true);

    }

    @then(/^I fiter players by "([^"]*)"$/)
    public async validateFilterPlayerByEvents(eventName:string){
        await WebPlayersPage.filterPlayerByEvents(eventName);
    }

    @then(/^I see all players who played Men's Singles such as "([^"]*)"$/)
    public async validateFilteredPlayer(playerName:string){
        expect(await WebPlayersPage.verifyPlayNameExists(playerName)).toBe(true);

    }

    @then(/^I don't see any Women's Singles players such as "([^"]*)"$/)
    public async validateNonFilteredPlayer(playerName:string){
        expect(await WebPlayersPage.verifyPlayNameExists(playerName)).toBe(false);
    }

    @then(/^I search player name "([^"]*)" in search box and validate searched player results$/)
    public async validateSearchResultsByPlayer(player: string) {
        await WebPlayersPage.isResultsLoaded();
        expect(await WebPlayersPage.searchPlayer(player)).toBe(true);
      }

    @then(/^I search players by Country name "([^"]*)" in search box and validate results$/)
    public async validateSearchResultsByCoutry(country:string){
        await WebPlayersPage.isPageLoaded();
        expect(await WebPlayersPage.searchCountry(country)).toBe(true);
    }
    
    @then(/^I clear results for "([^"]*)"$/)
    public async validateCleareSearchResults(country:string){
        expect(await WebPlayersPage.clearSearchedResults(country)).toBe(true)
    }
}