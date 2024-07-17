import WebBasePage from '../basePage/WebBasePage';

class WebAOLiveRadioPage extends WebBasePage {
  private titleSelector = '.component-hero-type-1__heading';

  async isPageLoaded(): Promise<Boolean> {
    return (await $(this.titleSelector)).isExisting();
  }

  async getPageTitle(): Promise<string> {
    return (await $(this.titleSelector)).getText();
  }

  async getHeading(sectionName: string): Promise<boolean> {

    const allFeedTitles = await $$('//div[@class="ao-layout__col"]/div/div/h3');

    let feedTitle: WebdriverIO.Element;
    // Iterate through each element to find the first one that contains the round text
    await Promise.all(allFeedTitles.map(async (title) => {
      const text = await title.getText();
      if (text.includes(sectionName)) {
        feedTitle = title;
      }
    }));

    if (!feedTitle) {
      // Handle the case when the feedTitle is not found
      throw new Error(`Feed title with "${sectionName}" not found.`);
    }

    // Wait until the filtered feedTitle element is displayed in the viewport
    await feedTitle.waitForDisplayed();

    // Verify that the HTML of the feedTitle contains the round value
    const feedTitleHTML = await feedTitle.getText();
    if (!feedTitleHTML.includes(sectionName)) {
      // Handle the case when the feedTitle HTML does not contain the round value
      throw new Error(`Feed title HTML "${feedTitleHTML}" does not include "${sectionName}".`);
    }
     else {
      return true;
    }

  }

  }
  
export default new WebAOLiveRadioPage();
