import Text from './animations/Text.js';

import '../styles/main.scss';

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
