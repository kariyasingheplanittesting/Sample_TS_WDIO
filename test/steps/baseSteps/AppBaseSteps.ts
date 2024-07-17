import { binding, when, then } from 'cucumber-tsflow';
import AppLandingScreen from 'src/pages/landingPage/AppLandingScreen';
import AppHomeScreen from 'src/pages/homePage/AppHomeScreen';

@binding()
export default class AppBaseSteps {
  @when(/^I am on AO app Home screen$/)
  public async whenIamOnAOAppHomescreen() {
    expect(await AppLandingScreen.goToHomeScreen()).toBe(true);
  }

  @when(/^I navigate to "([^"]*)" screen$/)
  public async navigateToScreen(menuItem: string) {
    await AppHomeScreen.goToScreen(menuItem);
  }

  @then(/^I see "([^"]*)" on home screen$/)
  public async thenICanSeeGivenWidgetOnHomeScreen(widgetLabel: string) {
    expect(await AppHomeScreen.getWidgetText(widgetLabel)).toContain(widgetLabel);
  }

  @when(/^I am back on "([^"]*)" screen$/)
  public async whenIamBackOnGivenScreen(widgetLabel: string) {
    await AppLandingScreen.goBackToHomeScreen();
    expect(await AppHomeScreen.getWidgetText(widgetLabel)).toContain(widgetLabel);
  }

  @when(/^I can see content of the Home screen$/)
  public async canSeeHomeScreenContent() {
    expect(await AppHomeScreen.getWidgetText('Favourite Players')).toContain('Favourite Players');
    expect(await AppHomeScreen.getWidgetText('News feed')).toContain('News feed');
  }

  @when(/^I navigate to "([^"]*)" tab$/)
  public async navigateToTab(tabName: string) {
    await AppHomeScreen.selectSection(tabName);
  }
}
