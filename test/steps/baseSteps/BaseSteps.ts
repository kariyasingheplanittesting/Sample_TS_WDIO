import ObjectContainer from 'src/pages/ObjectContainer';

export default class BaseSteps {
  protected container: ObjectContainer;

  protected isAndroid: boolean;

  constructor() {
    // Container initialized as Webdriver doesnt do it.
    this.container = new ObjectContainer();
  }
}
