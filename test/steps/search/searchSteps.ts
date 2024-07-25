import { binding, when, then } from 'cucumber-tsflow';
import SearchPage from 'src/pages/searchWeb/searchPage';

@binding()
export default class SearchSteps {
  @when(/^I click on the search option$/)
  public async iClickOnTheSearchOption() {
    await SearchPage.clickSearch();
  }

  @when(/^I see the search bar$/)
  public async iSeeTheSearchBar() {
    await SearchPage.viewSearchBar();
  }

  @then(/^I enter search as "(.+)" and see the results$/)
  public async iEnterSearchWord(searchWord: string): Promise<void> {
    await SearchPage.setSearchWord(searchWord);
    await SearchPage.viewSearchResults(searchWord);
  }

  @then(/^I click on "([^"]*)"$/)
  public async iClickOnMatch(matchedName: string) {
    await SearchPage.selectMatchedItem(matchedName);
  }

  @then(/^I see the player profile page of "([^"]*)"$/)
  public async iseePlayerProfilePage(playerName: string) {
   expect(await SearchPage.viewPlayerProfilePage()).toBe(playerName);
  }

  @then(/^I see the related news article with heading "([^"]*)"$/)
  public async iseeNewArticlePage(heading:string) {
   expect(await SearchPage.viewNewsArticlePage()).toBe(heading);
  }

  @then(/^I see the related video with title "([^"]*)"$/)
  public async iseeRelatedVideo(title:string) {
   expect(await SearchPage.viewVideoCard()).toBe(title);
  }

}
