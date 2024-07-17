import { binding, when } from 'cucumber-tsflow';
import AppMatchScheduleScreen from 'src/pages/matchSchedulePage/AppMatchScheduleScreen';

@binding()
export default class AppMatchScheduleSteps {
  @when(/^I select "([^"]*)" from Days Picker$/)
  public async selectDayFromDaysPicker(day: string) {
    await AppMatchScheduleScreen.selectDay(day);
  }
}
