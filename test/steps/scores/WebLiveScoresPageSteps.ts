import { DataTable } from '@wdio/cucumber-framework';
import { binding, then } from 'cucumber-tsflow';
import WebMatchSchedulePage from 'src/pages/matchSchedulePage/WebMatchSchedulePage';


@binding()
export default class WebLiveScorePagesSteps{

@then(/^I see "([^"]*)" as status on Matchcard on Live Scores page$/)
public async validateLiveMatchCardStatus(status:string,table:DataTable){
    const tableData = table.hashes();
    const players = tableData[0];
    expect(await WebMatchSchedulePage.getMatchStatus([
      players.playerOneName,
      players.playerTwoName])).toBe(status);

  }
}