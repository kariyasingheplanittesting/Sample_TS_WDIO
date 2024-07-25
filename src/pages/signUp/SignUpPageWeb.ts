import WebBasePage from '../basePage/WebBasePage';

class SignUpPageWeb extends WebBasePage {
  public async setEmail(email: string) {
    const emailInput = await $(`//input[@id='email']`);
    await emailInput.scrollIntoView();
    await emailInput.setValue(email);
  }

  public async getEmail() {
    const inputField = await $(`//input[@id='email']`);
    return inputField.getValue();
  }

  async selectCountry(country: string) {
    return (await $(`//select[@id='country']`)).selectByVisibleText(country);
  }

  async getCountry() {
    return (await $(`//select[@id='country']`)).getValue();
  }

  public async consentCheckBox() {
    await $(`//input[@id='edit-privacy']`).click();
  }

  async clickSubmit() {
    const submitButton = await $(`//button[@id="subscribe"]`);
    browser.waitUntil(async () => submitButton.isClickable());
    await submitButton.click();
  }

  async verifyMessage() {
    const success = await $('//div[@class="success-message"]');
    await browser.waitUntil(async () =>
      (await success.getText()).includes('Thank you for subscribing to the AO Newsletter.')
    );
  }
}
export default new SignUpPageWeb();
