import Component from '../classes/Component';

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        blocks: '.preloader__block',
      },
    });

    this.length = 0;
  }

  onAssetLoaded(image) {
    this.onLoaded();
  }

  onLoaded() {}

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
