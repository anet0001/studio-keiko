import Text from './animations/Text.js';

import '../styles/main.scss';

class App {
  constructor() {
    console.log('Starting My Application');

    this.createContent();
    this.createPages();

    console.log(this.template)
  }

  createContent() {
    this.content = document.querySelector("#content");
		this.template = this.content.getAttribute("data-template");
  }

  createPages() {}
}



new App();
