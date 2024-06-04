import Component from '../classes/Component';
import gsap from 'gsap';

export default class Logo extends Component {
  constructor() {
    super({
      element: '.logo__container',
      elements: {
        square: '.logo__content .square',
      },
    });
  }

  animate(type, delay) {
    switch (type) {
      case 'fade-in': {
        return new Promise((resolve) => {
          this.timeline = gsap.timeline();

          this.timeline.to(this.elements.get('square'), {
            autoAlpha: 0.1,
            stagger: {
              each: 0.035,
              from: 'random',
              grid: 'auto',
            },
          });

          this.timeline.call((_) => resolve());
        });
      }

      case 'in': {
        return new Promise((resolve) => {
          this.timeline = gsap.timeline({
            defaults: {},
          });

          this.timeline.to(this.elements.get('square'), {
            autoAlpha: 1,
            stagger: {
              each: 0.035,
              from: 'random',
              grid: 'auto',
            },
          });

          this.timeline.call((_) => resolve());
        });
      }

      default:
        return Promise.resolve();
    }
  }

  animateIn() {}

  animateOut() {}
}
