import { binding, when, then } from 'cucumber-tsflow';
import WebHomePage from 'src/pages/homePage/WebHomePage';
import WebNewsArticlePage from 'src/pages/newsArticlePage/WebNewsArticlePage';
import WebNewsPage from 'src/pages/newsPage/WebNewsPage';
import WebAOLiveRadioPage from 'src/pages/aoRadioPage/WebAORadioPage';

@binding()
export default class WebNewsFeedSteps {
  protected latestNewsHeading = '';

  @then(/^I can see the latest News$/)
  public async thenICanSeeTheLatestNews() {
    expect(await WebHomePage.isLatestNewsDisplayed()).toBe(true);
  }

  @when(/^I open a news article$/)
  public async whenIOpenANewsArticle() {
    this.latestNewsHeading = await WebHomePage.clickFirstLatestNews();
    expect(this.latestNewsHeading).not.toBe('');
  }

  @then(/^I can see the news details$/)
  public async thenICanSeeTheNewsDetails() {
    expect(await WebNewsArticlePage.isPageLoaded()).toBe(true);
    expect(await WebNewsArticlePage.getArticleTitle()).toBe(this.latestNewsHeading);
  }

  @then(/^I can see the News page$/)
  public async thenICanSeeTheNewsPage() {
    expect(await WebNewsPage.isPageLoaded()).toBe(true);
  }

  @then(/^I can AO Match Highlights headline$/)

  @when(/^I navigate to Ao Live Radio page$/)
  public async whenINavigateToAOLiveRadioPage() {
    await WebHomePage.clickAoLiveRadioButton();
  }

  @when(/^I navigate to The AO Show page$/)
  public async whenINavigateToTheAOShowPage() {
    await WebHomePage.clickAoShowButton();
  }

  @then(/^I can see "([^"]*)" title on AO radio$/)
  @then(/^I can see "([^"]*)" title on AO podcast$/)
  public async thenICanSeeTheAORadioPage(pageTitle: string) {
    expect(await WebAOLiveRadioPage.isPageLoaded()).toBe(true);
    expect(await WebAOLiveRadioPage.getPageTitle()).toBe(pageTitle);
  }

  @then(/^I can see "([^"]*)" heading$/)
  public async thenICanSeeTheHeading(heading: string) {
    expect(await WebAOLiveRadioPage.isPageLoaded()).toBe(true);
    expect(await WebAOLiveRadioPage.getHeading(heading)).toBe(true);
  }

}
