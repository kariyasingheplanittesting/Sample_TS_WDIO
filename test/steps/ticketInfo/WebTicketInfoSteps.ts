
import { binding,then } from 'cucumber-tsflow';
import WebTicketInfo from 'src/pages/visitPage/WebTicketInfo';



@binding()
export default class WebTicketInfoSteps{ 

// @then(/^I see 'Ticket Information' heading is displayed$/)
// public async ticketInforHeadingIsDisplayed() {
//   expect(await WebTicketInfo.isHeadingDisplayed()).toBe(true);
// }

// @then(/^I validate pricing of the "([^"]*)" as "([^"]*)"$/)
//   public async checkTicketValue(ticketingCardName:string,ticketCardValue:string){
//     expect(await WebTicketInfo.getTicketingCardValue(ticketingCardName)).toBe(Number(ticketCardValue))
//   }


// }


// export default class VisitSteps {

  @then(/^I verify the pricing of "([^"]*)" as "([^"]*)"$/)
  public async thenIVerifyPrice(arena:string, value:string): Promise<void>  {
   
    expect(await WebTicketInfo.checkPrice(arena, value)).toBe(true);
  }

 

}

