import Text from './animations/Text.js';

class App {
  constructor() {
    console.log('Starting My Application');
    this.initTextAnimation();
  }

  initTextAnimation() {
    this.text = new Text();
  }
}

new App();
