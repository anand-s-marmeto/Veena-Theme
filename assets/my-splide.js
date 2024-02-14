class MySplide extends HTMLElement {
  constructor() {
    super();
    this.element = this.querySelector(".splide");
    this.options = JSON.parse(this.querySelector("script").textContent);
    this.initializeSlider();
    console.log(this.options);
  }

  initializeSlider() {
    var splide = new Splide(this.element,this.options);
    splide.mount();
  }
}

customElements.define("my-splide", MySplide);
