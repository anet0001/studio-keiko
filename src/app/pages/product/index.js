import Page from '../../classes/Page';
import { each, map } from 'lodash';
import ProductInfo from '../../components/ProductInfo';

export default class Product extends Page {
  constructor({ lenis }) {
    super({
      id: 'product',
      element: '.product__container',
      elements: {},
    });

    this.lenis = lenis;
    this.productInfo;
  }

  show() {
    this.lenis.start();
  }

  create({ sourcePreloader }) {
    super.create();
    this.sourcePreloader = sourcePreloader;
    this.addEventListeners();

    this.productInfo = new ProductInfo({ lenis: this.lenis });
  }

  createAnimations() {}

  addEventListeners() {}

  removeEventListeners() {}

  destroy() {
    super.destroy();
    this.productInfo.destroy();
  }
}
