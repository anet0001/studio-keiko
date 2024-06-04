import Component from '../classes/Component';

export default class Cursor extends Component {
  constructor() {
    super({
      element: '.cursor',
    });
  }

  // TODO: Add event listener to window for mouse move
  // TODO: Add event listener to elements with data attributes for hover interactions (both images and links)
  // TODO: Add update method to reinitialize event listeners on page change
  // TODO: Add method to remove event listeners on page change
}
