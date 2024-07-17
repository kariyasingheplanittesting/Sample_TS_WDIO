import BaseComponent from './BaseComponent';

export default abstract class AppBaseComponent extends BaseComponent {
  protected isAndroid: boolean;

  protected androidTextViewClassName = 'android.widget.TextView';

  constructor() {
    super();
    this.isAndroid = browser.isAndroid;
  }
}
