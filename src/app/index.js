import Lenis from '@studio-freight/lenis';
import { each } from 'lodash';
import gsap from 'gsap';
import CustomEase from 'gsap/dist/CustomEase';

import Home from './pages/home';
import Product from './pages/product';
import Index from './pages/index';
import About from './pages/about';
import Contact from './pages/contact';
import Cart from './pages/cart';

import Navigation from './components/Navigation';
import Logo from './components/Logo';
import Engine from './components/Engine';
import Preloader from './components/Preloader';

import '../styles/main.scss';

gsap.registerPlugin(CustomEase);

class App {
  constructor() {
    this.initLenis();
    this.createContent();
    this.createLogo();
    this.createPages();
    this.createNavigation();
    // this.initEngine();

    this.indexHistory = [];

    this.addLinkListeners();
    this.addEventListeners();
  }

  createContent() {
    this.content = document.querySelector('#content');
    this.template = this.content.getAttribute('data-template');
  }

  createPages() {
    this.pages = new Map();
    this.pages.set('home', new Home({ lenis: this.lenis }));
    this.pages.set('product', new Product({ lenis: this.lenis }));
    this.pages.set('page.index', new Index({ lenis: this.lenis }));
    this.pages.set('page.about', new About({ lenis: this.lenis }));
    this.pages.set('page.contact', new Contact({ lenis: this.lenis }));
    this.pages.set('cart', new Cart({ lenis: this.lenis }));
    this.page = this.pages.get(this.template);
    this.page.create({ sourcePreloader: true });
    this.animateLogo();
  }

  createPreloader() {
    this.preloader = new Preloader();
  }

  animateLogo() {
    switch (this.template) {
      case 'home': {
        this.logo.animate('in').then(() => {
          this.page.show();
        });
        break;
      }

      case 'product': {
        this.logo.animate('fade-in').then(() => {
          this.page.show();
        });
        break;
      }

      case 'page.index': {
        this.logo.animate('fade-in').then(() => {
          this.page.show();
        });
        break;
      }

      case 'page.about': {
        this.logo.animate('fade-in').then(() => {
          this.page.show();
        });
        break;
      }

      case 'page.contact': {
        this.logo.animate('fade-in').then(() => {
          this.page.show();
        });
        break;
      }

      default: {
        this.logo.animate('in').then(() => {
          this.page.show();
        });
        break;
      }
    }
  }

  initEngine() {
    this.engine = new Engine();
  }

  createLogo() {
    this.logo = new Logo();
  }

  createNavigation() {
    const activeHref = window.location.pathname;

    this.navigation = new Navigation({ activeHref });
  }

  initLenis() {
    window.scrollTo(0, 0);
    this.lenis = new Lenis({
      easing: (x) => {
        return -(Math.cos(Math.PI * x) - 1) / 2;
      },
    });

    this.raf = this.raf.bind(this);
    requestAnimationFrame(this.raf);

    this.lenis.stop();
  }

  raf(time) {
    this.lenis.raf(time);
    requestAnimationFrame(this.raf);
  }

  suspendScroll() {
    this.lenis.stop();
  }

  resumeScroll() {
    this.lenis.start();
  }

  addLinkListeners() {
    const disabledLinks = document.querySelectorAll("a[data-type='disabled']");
    const navigationLinks = document.querySelectorAll("a[data-type='navigation']");

    each(disabledLinks, (link) => {
      link.onclick = (event) => {
        event.preventDefault();
      };
    });

    each(navigationLinks, (link, index) => {
      link.onclick = (event) => {
        event.preventDefault();
        const { href } = link;
        const index = parseInt(link.getAttribute('data-index'), 10);
        this.indexHistory.push(index);
        this.onChange({ url: href, index });
      };
    });
  }

  async onChange({ url, index = this.indexHistory[this.indexHistory.length - 1], push = true }) {
    if (url === window.location.href) {
      this.navigation.jiggle();
      return;
    }

    // await this.transition.animateIn();
    // window.scrollTo(0, 0);

    this.page.hide();
    this.page.destroy();

    const request = await window.fetch(url);

    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement('div');
      if (push) {
        window.history.pushState({ index }, '', url);
      }
      div.innerHTML = html;
      const divContent = div.querySelector('#content');
      this.template = divContent.getAttribute('data-template');

      this.animateLogo();
      console.log('nva index', index);
      this.navigation.moveIndicator({ index });

      this.content.setAttribute('data-template', divContent.getAttribute('data-template'));

      this.content.innerHTML = divContent.innerHTML;

      this.page = this.pages.get(this.template);
      this.page.create({ sourcePreloader: false });

      this.page.show();
      // this.transition.animateOut();
      this.addLinkListeners();
    } else {
      console.log(404);
    }
  }

  async onPopState(event) {
    const index = event.state ? event.state.index : 0;
    await this.onChange({ url: window.location.pathname, index, push: false });
  }

  addEventListeners() {
    window.addEventListener('popstate', this.onPopState.bind(this));
  }

  removeEventListeners() {
    window.removeEventListener('popstate', this.onPopState.bind(this));
  }
}

new App();
