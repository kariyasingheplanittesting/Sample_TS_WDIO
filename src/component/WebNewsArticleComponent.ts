export default class WebNewsArticleCompoenent {
  private parentElement: WebdriverIO.Element;

  constructor(parentElement: WebdriverIO.Element) {
    this.parentElement = parentElement;
  }

  public async getTitle() {
    return (await this.parentElement.$('.single-article__title')).getText();
  }

  public async getDescription() {
    return (await this.parentElement.$('.news-listing__byline')).getText();
  }

  public async getTimeStamp() {
    return (await this.parentElement.$('.news-listing__timestamp')).getText();
  }

  public async getRootElement() {
    return this.parentElement;
  }
}
