import TicketCard from 'src/component/ticketInfoComponent/ticketCardComponent';
import WebBasePage from '../basePage/WebBasePage';


class VisitPage extends WebBasePage {
  private parentElement: WebdriverIO.Element;
  
  async isPageLoaded() {
    return browser.waitUntil(
      async () => (await $('.field field--name-field-paragraphs field--type-entity-reference-revisions field--label-hidden field__item').isDisplayed()) === true
    );
  }

  async checkPrice(arena:string, value:string) {

   const ticketprice = await new TicketCard(await $$('.ticketing-component__item')).getPrice(arena);
   let answer=false;

    if(ticketprice===Number(value)){
      answer=true
    }else{
      throw new Error(`The ticket price of "${arena}" is not "${value}" as expected, it was "${ticketprice}".`);
    }

    return answer
    
   
    };

  }

export default new VisitPage();
