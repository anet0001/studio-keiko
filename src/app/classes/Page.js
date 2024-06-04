import { each, map } from 'lodash';

export default class Page {
  constructor({ id, element, elements }) {
    this.id = id;
    this.selector = element;
    this.selectorChildren = {
      ...elements,
      // asyncImages: "[data-src]",
    };
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = new Map();

    each(this.selectorChildren, (selector, key) => {
      if (selector instanceof window.HTMLElement || selector instanceof window.NodeList) {
        this.elements.set(key, selector);
      } else if (Array.isArray(selector)) {
        this.elements.set(key, selector);
      } else {
        this.elements.set(key, document.querySelectorAll(selector));

        if (this.elements.get(key).length === 0) {
          this.elements.set(key, null);
        } else if (this.elements.get(key).length === 1) {
          this.elements.set(key, document.querySelector(selector));
        }
      }
    });

    // this.loadImages();
  }

  // loadImages() {
  // 	if (this.elements.get("asyncImages") instanceof window.HTMLImageElement) {
  // 		return new AsyncLoad({ element: this.elements.get("asyncImages") });
  // 	} else {
  // 		this.preloaders = map(this.elements.get("asyncImages"), (element) => {
  // 			return new AsyncLoad({ element });
  // 		});
  // 	}
  // }

  show() {}

  hide() {}

  destroy() {}
}
