import TicketCardComponent from 'src/component/ticketInfoComponent/TicketCardCompent';
import WebBasePage from '../basePage/WebBasePage';



class WebTicketInformationPage extends WebBasePage {
    async isTicketInfoPageLoaded(){
        return browser.waitUntil(
           
            async () => (await $('//article[@about="/ticket-info"]').isDisplayed()) === true
        );
    }

    // async isHeadingDisplayed() {
    //     return (await $(`//h1[@class='component-hero-type-1__heading']`)).isExisting();

    //   }

    // async getTicketingCardName(ticketingCardName:string){
    //     return (await $(`//article[@class="ticketing-card"]//h3[contains(text(),${ticketingCardName}]`)).getText()
    // }

    // async getTicketingCardValue(ticketingCardName:string){
    //     return Number ((await $(`//article[@class='ticketing-card']//h3[contains(text(),'${ticketingCardName}')]/following::footer[1]/div/p/span`).getText()).replace(',', '').replace('$', ''))
    // }

    async checkPrice(arena:string, value:string) {

        const ticketprice = await new TicketCardComponent(await $$('.ticketing-component__item')).getPrice(arena);
        let answer=false;
     
         if(ticketprice===Number(value)){
           answer=true
         }else{
           throw new Error(`The ticket price of "${arena}" is not "${value}" as expected, it was "${ticketprice}".`);
         }
     
         return answer
         
        
         };
     
       }


  
  export default new WebTicketInformationPage();