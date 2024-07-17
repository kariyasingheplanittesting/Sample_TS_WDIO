import WebBasePage from '../basePage/WebBasePage';

class WebNewsArticlePage extends WebBasePage {
  async isPageLoaded(): Promise<Boolean> {
    return (await $('#block-ausopen-official-content')).isExisting();
  }

  async getArticleTitle(): Promise<string> {
    return (await $('.article-title h1')).getText();
  }
}

export default new WebNewsArticlePage();
