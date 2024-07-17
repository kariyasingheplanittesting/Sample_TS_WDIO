import { scrollDownUntil } from "src/utils/ScrollFind";


export default class VideoComponent {

  private numberOfScrollClick=3;

  private scrollRightbutton = 'div.ee-components-circledarrow[aria-label="scroll right"][data-type="right"]';
    
  public async clickVideo(title:string,section:string,play:string) {

    const iframeSelector = `[title='${section}']`;
    const iframeElement = await $(iframeSelector);
  


    if (iframeElement==null){
        throw new Error(`This Section "${section}" does not exits.`);
    }

    if(play!=="0"){
      this.numberOfScrollClick=Number(play);
    }

    await browser.switchToFrame(iframeElement);

      
      
      let answer = false
      for(let index=0; index<this.numberOfScrollClick && !answer; index +=1){
        const videoList = await $$(`div.ee-components-view-row div.ee-components-thumbnail-strip-cell`);

        for (const video of videoList) {
          const videoNameElement = await video.$('div.ee-components-video-info-name');
          const videoName = await videoNameElement.getText();
          
          if (videoName.trim().toLowerCase() === title.trim().toLowerCase()) {
              answer=true;
              if (!(await video.isDisplayed())) {
                await scrollDownUntil(async () => ((await video.isDisplayed()) ? true : null));
              }
              video.click();
              // if(await(await $('[data-application-id="AO Match Highlights"][autoplay="autoplay"]')).isDisplayed()===false){
              //   throw new Error(`The video "${title}" is not displayed`);
              // }
              break;
          }
        
          if (answer===false){
            (await $(this.scrollRightbutton)).click();
            (await $(this.scrollRightbutton)).click();

          }
    
        }
      }

        if (answer===false) {
        throw new Error(`The video "${title}" does not exist.`);
        }
        return answer;
        
    }
    
}
  
  