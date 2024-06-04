import Matter from 'matter-js';
import Component from '../classes/Component';
import { each } from 'lodash';

export default class Engine extends Component {
  constructor() {
    super({
      element: document.body,
      elements: {
        blocks: '.logo__content .square',
        toggle: '#header h1',
      },
    });
    this.Engine = Matter.Engine;
    this.Render = Matter.Render;
    this.Runner = Matter.Runner;
    this.Bodies = Matter.Bodies;
    this.Events = Matter.Events;
    this.Composite = Matter.Composite;

    this.addEventListeners = this.addEventListeners.bind(this);
    this.initEngine();
    this.addEventListeners();
  }

  initEngine() {
    this.engine = this.Engine.create();

    this.engine.gravity.y = 0.16;

    this.render = this.Render.create({
      element: document.body,
      engine: this.engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframeBackground: 'transparent',
        wireframes: false,
      },
    });

    this.initScene();

    this.Render.run(this.render);

    this.runner = this.Runner.create();
  }

  initScene() {
    const boxes = Array.from(this.elements.get('blocks')).map((block) => {
      const rect = block.getBoundingClientRect();
      const box = this.Bodies.rectangle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        rect.width,
        rect.height,
        {
          render: {
            fillStyle: '#5BDC40',
          },
          restitution: 0.6,
          friction: 0,
          frictionAir: 0.01,
        }
      );
      return box;
    });

    this.ground = this.Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 1, {
      isStatic: true,
      restitution: 1,
    });

    this.ceiling = this.Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 1, {
      isStatic: true,
      restitution: 2,
    });

    this.leftWall = this.Bodies.rectangle(0, window.innerHeight / 2, 1, window.innerHeight, {
      isStatic: true,
      restitution: 1,
    });

    this.rightWall = this.Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 1, window.innerHeight, {
      isStatic: true,
      restitution: 1,
    });

    this.Composite.add(this.engine.world, [...boxes, this.ground, this.leftWall, this.rightWall, this.ceiling]);
  }

  handleResize() {
    this.render.canvas.width = window.innerWidth;
    this.render.canvas.height = window.innerHeight;
    this.render.options.width = window.innerWidth;
    this.render.options.height = window.innerHeight;

    this.Composite.clear(this.engine.world, false);

    this.initScene();
  }

  animate({ type }) {
    switch (type) {
      case 'fade-out': {
        let opacity = 1;
        const fadeOut = setInterval(() => {
          if (opacity <= 0) {
            clearInterval(fadeOut);
          } else {
            opacity -= 0.01;
            this.render.canvas.style.opacity = opacity;
          }
        }, 10);
        break;
      }
    }
  }

  handleClick() {
    this.Runner.run(this.runner, this.engine);
  }

  addEventListeners() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.elements.get('toggle').addEventListener('click', this.handleClick.bind(this));
  }

  removeEventListeners() {
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.elements.get('toggle').removeEventListener('click', this.handleClick.bind(this));
  }

  destroy() {
    this.Runner.stop(this.runner);
    this.Composite.clear(this.engine.world, false);
    this.Render.stop(this.render);
    this.render.canvas.remove();
    this.removeEventListeners();
  }
}
