import { binding, then } from 'cucumber-tsflow';
import VisitPage from 'src/pages/ticketInfo/VisitPage';

@binding()
export default class VisitSteps {

  @then(/^I verify the pricing of "([^"]*)" as "([^"]*)"$/)
  public async thenIVerifyPrice(arena:string, value:string): Promise<void>  {
   
    expect(await VisitPage.checkPrice(arena, value)).toBe(true);
  }

}
