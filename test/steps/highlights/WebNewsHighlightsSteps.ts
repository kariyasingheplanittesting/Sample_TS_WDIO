import { binding, when, then } from 'cucumber-tsflow';
import WebNewsArticlePage from 'src/pages/newsArticlePage/WebNewsArticlePage';
import WebNewsPage from 'src/pages/newsPage/WebNewsPage';

@binding()
export default class WebNewsHighlightsSteps {
  @when(/^I see 'News' page is loaded$/)
  public async newsPageIsLoaded() {
    expect(await WebNewsPage.isPageLoaded()).toBe(true);
  }

  @then(/^I see news highlights$/)
  public async thenIShouldSeeNewsHiglights() {
    expect(await WebNewsPage.getMainNewsArticleCount()).toBeGreaterThan(0);
  }

  @then(/^I see "([^"]*)" news articles$/)
  public async thenISeeNewsArticles(count: string) {
    expect(await WebNewsPage.getMainNewsArticleCount()).toBe(parseInt(count, 10));
  }

  @then(/^I see "([^"]*)"$/)
  public async thenISeeComponentHeadings(heading: string) {
    expect(await WebNewsPage.isHeadingDisplayed(heading)).toBe(true);
  }

  @then(/^I see list of news articles$/)
  public async theISeeListOfNewsArticles() {
    expect((await WebNewsPage.getNewsArticleList()).length > 0).toBe(true);
  }

  @then(/^I see title, description, TimeStamp for an article$/)
  public async thenISeeNewsArticle() {
    const newsArticle = await WebNewsPage.getAnyNewsArticle();
    expect(await newsArticle.getTitle()).not.toEqual('');
    // description is not shown when mobile hamburger menu is present
    if (!(await WebNewsPage.isHamburgerMenuBtnDisplayed())) {
      expect(await newsArticle.getDescription()).not.toEqual('');
    }
    expect(await newsArticle.getTimeStamp()).not.toEqual('');
  }

  @then(/^I can navigate to any news article$/)
  public async canNavigateToAnyNewsArticle() {
    const selectedNewsArticleTitle = await WebNewsPage.goToAnyNewsArticle();
    expect(await WebNewsArticlePage.isPageLoaded()).toBe(true);
    expect(await WebNewsArticlePage.getArticleTitle()).toBe(selectedNewsArticleTitle);
  }
}
