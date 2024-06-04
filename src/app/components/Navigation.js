import { each } from 'lodash';
import gsap from 'gsap';
import Component from '../classes/Component';

export default class Navigation extends Component {
  constructor({ activeHref }) {
    super({
      element: '#header nav',
      elements: {
        indicator: '#header nav .indicator',
        links: '#header nav a',
      },
    });

    this.activeHref = activeHref;
  }

  create() {
    super.create();
    this.setActiveLink();
    this.setIndicator();
    this.calculateMaxDistance();
  }

  setActiveLink() {
    const links = this.elements.get('links');
    const activePath = window.location.pathname;

    each(links, (link) => {
      const linkPath = link.getAttribute('href');

      console.log(linkPath, activePath);

      if (linkPath === activePath) {
        link.classList.add('active');
      }
    });
  }

  calculateMaxDistance() {
    const firstLink = this.elements.get('links')[0].getBoundingClientRect();
    const lastLink = this.elements.get('links')[this.elements.get('links').length - 1].getBoundingClientRect();
    this.maxDistance = Math.abs(lastLink.top - firstLink.top);
  }

  setIndicator() {
    const activeLink = document.querySelector('#header nav a.active');
    const indicator = this.elements.get('indicator');

    if (activeLink && indicator) {
      const activeLinkRect = activeLink.getBoundingClientRect();
      const indicatorRect = indicator.getBoundingClientRect();

      const style = window.getComputedStyle(activeLink, '::before');
      const pseudoElementLeft = activeLinkRect.left + parseFloat(style.left);
      const pseudoElementTop = activeLinkRect.top + activeLinkRect.height / 2;

      indicator.style.left = `${pseudoElementLeft - indicatorRect.width / 2}px`;
      indicator.style.top = `${pseudoElementTop - indicatorRect.height / 2}px`;
    }
  }

  moveIndicator({ index }) {
    const links = this.elements.get('links');

    if (!links || index < 0 || index >= links.length) {
      console.error('Invalid index or links array');
      return;
    }

    const target = links[index];

    if (!target) {
      console.error(`No link found at index ${index}`);
      return;
    }

    if (target.classList.contains('active')) {
      return;
    }

    each(this.elements.get('links'), (otherLink) => {
      otherLink.classList.remove('active');
    });

    target.classList.add('active');

    const indicator = this.elements.get('indicator');

    const targetLinkRect = target.getBoundingClientRect();
    const indicatorRect = indicator.getBoundingClientRect();

    const style = window.getComputedStyle(target, '::before');
    const pseudoElementLeft = targetLinkRect.left + parseFloat(style.left);
    const pseudoElementTop = targetLinkRect.top + targetLinkRect.height / 2;

    let indicatorCurrentPosition = {
      x: parseFloat(indicator.style.left),
      y: parseFloat(indicator.style.top),
    };

    let targetPosition = {
      x: pseudoElementLeft - indicatorRect.width / 2,
      y: pseudoElementTop - indicatorRect.height / 2,
    };

    let radiusX = this.maxDistance / 2;
    let radiusY = this.maxDistance / 2;

    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    let sweepFlag = 0;

    if (indicatorCurrentPosition.y > targetPosition.y) {
      sweepFlag = 1;
    } else {
      sweepFlag = 0;
    }

    let largeArcFlag = 0;

    p.setAttribute(
      'd',
      `M${indicatorCurrentPosition.x},${indicatorCurrentPosition.y} A${radiusX},${radiusY} 0 ${largeArcFlag},${sweepFlag} ${targetPosition.x},${targetPosition.y}`
    );

    var len = p.getTotalLength();

    var progress = 0;
    var speed = 0.05;

    function animate() {
      progress += speed;

      if (progress > 1) progress = 1;

      var pt = p.getPointAtLength(progress * len);

      indicator.style.left = `${pt.x}px`;
      indicator.style.top = `${pt.y}px`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  }

  jiggle() {
    const indicator = this.elements.get('indicator');
    gsap.to(indicator, {
      duration: 0.1,
      x: '+=1.25',
      repeat: 5,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }

  addEventListeners() {
    window.addEventListener('resize', () => this.onResize());
  }

  removeEventListeners() {
    window.removeEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.setIndicator();
    this.calculateMaxDistance();
  }
}
