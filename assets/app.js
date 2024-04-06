class App {
  constructor() {
    console.log('Made With Love - ACTTA Studio');
    this.addEventListeners();
  }

  addEventListeners() {
    const links = document.querySelectorAll('a');

    links.forEach((link) => {
      link.onclick = (event) => {
        event.preventDefault();
        console.log(event);
      };
    });
  }
}

new App();
