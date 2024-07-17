import { binding, when, then } from 'cucumber-tsflow';
import AppHomeScreen from 'src/pages/homePage/AppHomeScreen';
import AppNewsArticlePage from 'src/pages/newsArticlePage/AppNewsArticleScreen';

@binding()
export default class AppNewsFeedSteps {
  @when(/^I open news "([^"]*)" from news feeds$/)
  public async whenINavigateToTheNewsDetailsScreen(newsTitle: string) {
    await AppHomeScreen.selectLatestNews(newsTitle);
  }

  @when(/^I scroll right from "([^"]*)" to "([^"]*)" on the news panel$/)
  public async whenIScrollRightOnNewsPanel(titleOne: string, titleTwo: string) {
    await AppHomeScreen.scrollToRightOnNewsSection(titleOne, titleTwo);
  }

  @then(/^I see more details about the news$/)
  public async thenICanSeeNewsDetails(table) {
    const tableData = table.hashes();
    const details = tableData[0];
    expect(
      await AppNewsArticlePage.isNewsDetailsScreen(
        details.authorName,
        details.title,
        details.publisedDate
      )
    ).toBe(true);
  }

  @then(/^I see "([^"]*)" news title$/)
  public async thenICanSeeNewsTitle(newFeedLabel: string) {
    expect(await AppHomeScreen.isNewsTitleDisplayed(newFeedLabel)).toBe(true);
  }
}
