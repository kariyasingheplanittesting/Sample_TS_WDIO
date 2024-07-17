import { binding,then } from 'cucumber-tsflow';
import VideoComponent from 'src/component/videoComponent/VideoComponent';

@binding()
export default class AOMatchHighlightsStep{

    @then(/^I click on video "([^"]*)" under "([^"]*)" click on the arrow "([^"]*)" times$/)
    public async thenIClickonVideoAndOpen(title:string,section:string,play:string){
        expect(await new VideoComponent().clickVideo(title,section,play)).toBe(true)
    }

    // @then(/^I click on video "([^"]*)" under "([^"]*)"$/)
    // public async thenIClickonVideo(title:string,section:string,play){
    //     expect(await new VideoComponent().clickVideo(title,section,play)).toBe(true)
    // }


}
