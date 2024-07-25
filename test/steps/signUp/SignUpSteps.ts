import { binding, then } from 'cucumber-tsflow';
import SignUpPageWeb from 'src/pages/signUp/SignUpPageWeb';

@binding()
export default class SignupSteps {
  @then(/^I enter the email as "([^"]*)"$/)
  public async thenIEnterEmail(email: string) {
    await SignUpPageWeb.setEmail(email);
    const inputEmail = await SignUpPageWeb.getEmail();
    expect(inputEmail).toBe(email);
  }

  @then(/^I select country from the dropdown as "([^"]*)"$/)
  public async thenISelectCountry(country: string) {
    await SignUpPageWeb.selectCountry(country);
    const selectedCountry = await SignUpPageWeb.getCountry();
    expect(selectedCountry).toBe(country);
  }

  @then(/^I select the consent checkbox$/)
  public async iSelectConsent() {
    await SignUpPageWeb.consentCheckBox();
  }

  @then(/^I click on submit button$/)
  public async iClickSubmit() {
    await SignUpPageWeb.clickSubmit();
  }

  @then(/^I can see subscription successful message$/)
  public async seeMessage() {
    await SignUpPageWeb.verifyMessage();
  }
}
