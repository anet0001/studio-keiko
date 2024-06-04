import Page from '../../classes/Page';
import { each, map } from 'lodash';

export default class About extends Page {
  constructor({ lenis }) {
    super({
      id: 'page.about',
      element: '.about__container',
      elements: {},
    });

    this.lenis = lenis;
  }

  show() {
    this.lenis.start();
  }

  create({ sourcePreloader }) {
    super.create();
    this.sourcePreloader = sourcePreloader;
    this.addEventListeners();
  }

  createAnimations() {}

  addEventListeners() {}

  removeEventListeners() {}

  destroy() {
    super.destroy();
  }
}
