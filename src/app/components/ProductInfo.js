import Component from '../classes/Component';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

CustomEase.create('custom', 'M0,0 C0.45,0 0.55,1 1,1');

export default class ProductInfo extends Component {
  constructor({ lenis }) {
    super({
      element: '.product__info',
      elements: {
        toggle: '.product__info-toggle',
      },
    });

    this.isInCart = false;
    this.lenis = lenis;
    this.maxProgress = 0.075;

    this.lenis.on('scroll', (scroll) => {
      const progress = Math.min(Math.abs(scroll.velocity) * 0.005, this.maxProgress);

      if (!this.isInCart) {
        console.log(progress);
        this.timeline.progress(progress);
      }
    });
  }

  create() {
    super.create();

    this.timeline = gsap.timeline({
      paused: true,
      onComplete: () => {
        this.isInCart = true;
      },
      onReverseComplete: () => {
        this.isInCart = false;
      },
      defaults: {
        ease: 'custom',
      },
    });

    this.timeline
      .to('.product__info .block--1', {
        rotateX: -180,
        transformOrigin: 'bottom',
      })
      .set('.product__info .block--1', {
        '--pseudo': 2,
        yPercent: 100,
        rotateX: 0,
      })
      .to('.product__info .block--1', {
        transformOrigin: '50% 100%',
        rotateX: -180,
      })
      .to(
        '.product__info .block--2',
        {
          transformOrigin: '50% 100%',
          rotateX: -180,
        },
        '-=0.5'
      )
      .set('.product__info .block--1', {
        rotateX: 0,
        yPercent: 200,
      })
      .set('.product__info .block--2', {
        '--pseudo': 2,
        yPercent: 100,
        rotateX: 0,
      })
      .to('.product__info .block--1', {
        transformOrigin: '50% 100%',
        rotateX: -180,
      })
      .to(
        '.product__info .block--2',
        {
          transformOrigin: '50% 100%',
          rotateX: -180,
        },
        '<'
      )
      .to(
        '.product__info .block--3',
        {
          transformOrigin: '50% 100%',
          rotateX: -180,
        },
        '-=0.5'
      )
      .set('.product__info .block--1', {
        rotateX: 0,
        yPercent: 300,
      })
      .set('.product__info .block--2', {
        yPercent: 200,
        rotateX: 0,
      })
      .set('.product__info .block--3', {
        '--pseudo': 2,
        yPercent: 100,
        rotateX: 0,
      });

    if (this.isInCart) {
      this.timeline.progress(1);
    }
  }

  toggle() {
    if (this.isInCart) {
      this.timeline.reverse();
    } else {
      this.timeline.play();
    }

    this.isInCart = !this.isInCart;
  }

  addEventListeners() {
    this.elements.get('toggle').addEventListener('click', this.toggle.bind(this));
  }

  removeEventListeners() {
    this.elements.get('toggle').removeEventListener('click', this.toggle.bind(this));
  }

  destroy() {
    super.destroy();
  }
}
