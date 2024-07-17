export default class TicketCard {

  private parentElementArray;

  private readonly ticket_card_Selector = '.ticketing-component__item';

  constructor(parentElement) {
    this.parentElementArray = parentElement;
  }


  public async getACard(arena: string) {
    const cardList = await this.parentElementArray;
    let answer=null;
    for (const card of cardList) {
      const cardNameElement = await card.$('.ticketing-card h3');
      const cardName = await cardNameElement.getText();
      
      if (cardName.trim().toLowerCase() === arena.toLowerCase()) {
        answer=card;
        break;
      }

    }
    if (answer===null) {
    throw new Error(`The arena "${arena}" does not exist.`);
    }
    return answer;
  }


  public async getPrice(arena: string) {

    const price = (await this.getACard(arena)).$('.ticketing-card__price-wrapper p span').getText();
    const answer = Number(await price);
    if (Number.isNaN(answer)) {
      throw new Error(`The amount is not a valid number "${price}".`);

    }

    return answer;

  };

}
