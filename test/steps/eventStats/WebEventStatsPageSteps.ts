import { binding, when, then } from 'cucumber-tsflow';

import WebEventStatsPage from 'src/pages/eventStatsPage/WebEventStatsPage';

@binding()
export default class StatsEvaluation {



    @then(/^I see the Event Stats page$/)
    public async thenISeeEventStatsPage() {



        expect(await WebEventStatsPage.isEventStatsPageLoaded()).toBe(true);

    }



    @when(/^I change the dropdown to "([^"]*)"$/)
    public async changeSelection(selection: string) {

        await WebEventStatsPage.selectDropDown(selection);





    }





    @then(/^I see MEN’S LEADER "([^"]*)" as "([^"]*)" and WOMEN’S LEADER "([^"]*)" as "([^"]*)"$/)
    public async thenICanSeeTheStatScores(playerOne: string, score: string, playerTwo: string, scoreTwo: string) {



        expect(await WebEventStatsPage.playerTypeisDisplayed("Men")).toBe(playerOne);

        expect(await WebEventStatsPage.getScore("Men")).toBe(score);

        expect(await WebEventStatsPage.playerTypeisDisplayed("Women")).toBe(playerTwo);

        expect(await WebEventStatsPage.getScore("Women")).toBe(scoreTwo);







    }



    @then(/^I can view player ([^"]*) and ([^"]*) as the score$/)
public async thenIcanviewScore(player: string, score: string) {

        expect(await WebEventStatsPage.playerNameisDisplayed(player)).toBe(true);

        expect(await WebEventStatsPage.ScoreisDisplayed(player)).toBe(score);

    }





}

