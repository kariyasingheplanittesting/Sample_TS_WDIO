import AppBaseScreen from '../basePage/AppBaseScreen';

class AppNewsArticleScreen extends AppBaseScreen {
  async isNewsDetailsScreen(
    authorName: string,
    title: string,
    publishedDate: string
  ): Promise<Boolean> {
    const androidNewsAuthorNameSelector = `new UiSelector().text("${authorName}").className("android.view.View")`;
    const androidNewsTitleSelector = `new UiSelector().text("${title}").className("${this.androidTextViewClassName}")`;
    const androidNewsPublishedDateSelector = `new UiSelector().text("${publishedDate}").className("android.view.View")`;
    const iosNewsAuthorNameSelector = `**/XCUIElementTypeStaticText[\`label contains "${authorName}"\`]`;
    const iosNewsTitleSelector = `**/XCUIElementTypeStaticText[\`label contains "${title}"\`]`;
    const iosNewsPublishedDateSelector = `**/XCUIElementTypeStaticText[\`label contains "${publishedDate}"\`]`;
    let isNewsDetailPageDisplayed = false;

    await browser.waitUntil(async () => {
      const isSubMenuTitleExist = this.isAndroid
        ? await $(`android=${androidNewsAuthorNameSelector}`).isExisting()
        : await $(`-ios class chain:${iosNewsAuthorNameSelector}`).isExisting();
      return isSubMenuTitleExist === true;
    });

    if (this.isAndroid) {
      isNewsDetailPageDisplayed =
        (await $(`android=${androidNewsAuthorNameSelector}`).isDisplayed()) &&
        (await $(`android=${androidNewsTitleSelector}`).isDisplayed()) &&
        (await $(`android=${androidNewsPublishedDateSelector}`).isDisplayed());
    } else {
      isNewsDetailPageDisplayed =
        (await $(`-ios class chain:${iosNewsAuthorNameSelector}`).isDisplayed()) &&
        (await $(`-ios class chain:${iosNewsTitleSelector}`).isDisplayed()) &&
        (await $(`-ios class chain:${iosNewsPublishedDateSelector}`).isDisplayed());
    }
    return isNewsDetailPageDisplayed;
  }
}

export default new AppNewsArticleScreen();
