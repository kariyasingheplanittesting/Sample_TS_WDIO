import WebNewsArticle from 'src/component/WebNewsArticleComponent';
import WebBasePage from '../basePage/WebBasePage';

class WebNewsPage extends WebBasePage {
  async isPageLoaded() {
    return browser.waitUntil(
      async () => (await $('.ao-media-mosaic-banner__rhs-panel').isDisplayed()) === true
    );
  }

  async getMainNewsArticleCount() {
    return (await $$('.ao-media-mosaic-banner__news-item')).length;
  }

  async isHeadingDisplayed(headingText: string) {
    return (await $(`iframe[title='${headingText}']`)).isExisting();
  }

  async getNewsArticleList() {
    const articles = await $$('.news-listing__item');
    return articles.map((el) => new WebNewsArticle(el));
  }

  // Note this function returns any CLICKABLE news article
  async getAnyNewsArticle() {
    const newsArticleList = await this.getNewsArticleList();
    let randomNewsArticleIndex: number;
    let randomNewsArticle: WebNewsArticle;
    // Some articles are hidden by the CMS with no property in the DOM
    //   that indicates they are hidden so we must keep selecting until
    //   we find a clickable article
    do {
      randomNewsArticleIndex = Math.floor(Math.random() * newsArticleList.length);
      [randomNewsArticle] = newsArticleList.splice(randomNewsArticleIndex, 1);
    } while ((await (await randomNewsArticle.getRootElement()).isClickable()) === false);
    return randomNewsArticle;
  }

  async goToAnyNewsArticle() {
    const newsArticle = await this.getAnyNewsArticle();
    const newsArticleTitle = await newsArticle.getTitle();
    (await newsArticle.getRootElement()).click();
    return newsArticleTitle;
  }

    
  }


export default new WebNewsPage();
