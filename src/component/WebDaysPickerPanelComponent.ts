export default class WebDaysPickerPanelComponent {
  private parentElement: WebdriverIO.Element;

  constructor(parentElement: WebdriverIO.Element) {
    this.parentElement = parentElement;
  }

  async getDay() {
    // getText() by itself retrieves both the day of the week and date so we must
    // split by \n
    return (await this.parentElement.getText()).split('\n')[0];
  }

  async getDate() {
    return this.parentElement.$('.day-list__date').getText();
  }

  async isButtonActive() {
    return this.parentElement.$('.days-lists__link--active').isExisting();
  }

  async getDayElement() {
    return this.parentElement;
  }
}
