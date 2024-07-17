import WebBasePage from '../basePage/WebBasePage';


class WebEventStatsPage extends  WebBasePage {

 

 

    async isEventStatsPageLoaded() {

      return browser.waitUntil(async () => (await $('//h1[@class="component-hero-type-1__heading"]')).isDisplayed());

 

    }

 

 

async selectDropDown(section:string) {

   const selectDrop=await $(`//select[@class="filter-dropdown__select"]`);

  await selectDrop.selectByAttribute('value',section);

}

 

async SectionNameisDisplayed(section:string) {

 

return browser.waitUntil(async () => (await $(`//h3[text()="${section}"]`)).isDisplayed());

 

 

}

 

async getScore(type:string)

{

  const element = await $(`//h3[contains(text(),"${type}’s leader – ")]//following-sibling::div[1]`);

  return element.getText();

 

}

 

async playerTypeisDisplayed(type:string){

  const element = await $(`//h3[contains(text(),"${type}’s leader – ")]//following-sibling::div[2]`);

  return element.getText();

 

}

 

async playerNameisDisplayed(player:string) {

 

 const element = await $(`//td[strong[@class="event-stat-table__name" and text()="${player}"]]/strong[@class="event-stat-table__name"]

 `);

return element.isDisplayed();

 

}

 

async ScoreisDisplayed(player:string){

 

   

   

   const ScoreDisplay =await $(`//strong[@class="event-stat-table__name" and text()="${player}"]/ancestor::td/following-sibling::td[3]`);

  return ScoreDisplay.getText();

  // return browser.waitUntil(async () => (await $(`//td[strong[@class="event-stat-table__name" and text()="${player}]"]]/following-sibling::td[3]/text()]`)).isDisplayed());

 

 

 

}

 

 

}

export default new WebEventStatsPage();

 

 