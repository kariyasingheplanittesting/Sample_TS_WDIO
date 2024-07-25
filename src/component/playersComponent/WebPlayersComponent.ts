export default class WebPlayersComponent {
    private parentElement: WebdriverIO.Element;

    
    constructor(parentElement: WebdriverIO.Element) {
        this.parentElement = parentElement;
      }

    public async getPlayerName(){
      return (await this.parentElement.$(`p`)).getText();
    }

}