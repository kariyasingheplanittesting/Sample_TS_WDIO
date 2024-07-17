import AppBaseComponent from './baseComponent/AppBaseComponent';

export default class FavouritePlayerComponent extends AppBaseComponent {
  private parentElement: WebdriverIO.Element;

  private androidSelector: String;

  constructor(parentElement: WebdriverIO.Element) {
    super();
    this.parentElement = parentElement;
    this.androidSelector = `new UiSelector().className("${this.androidTextViewClassName}")`;
  }

  async getName() {
    return (await this.parentElement.$(`android=${this.androidSelector}`)).getText();
  }

  async clickPlayer() {
    return (await this.parentElement.$(`android=${this.androidSelector}`)).click();
  }
}
