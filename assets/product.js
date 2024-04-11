// Variant selection with options
class ProductCard extends HTMLElement {
  constructor() {
    super();

    this.productHandle = this.dataset.productHandle;
    this.sectionId = this.dataset.sectionId;

    this.variantData = JSON.parse(this.querySelector("script").textContent);
    this.addEventListener("change", this.onOptionChange);
  }

  onOptionChange() {
    // Creates an array containing the value of the input elements that are checked.
    this.selectedOptions = Array.from(
      this.querySelectorAll('input[type="radio"]:checked'),
      (input) => input.value
    );
    this.currentVariant = this.variantData.find(
      (item) =>
        JSON.stringify(item.options) == JSON.stringify(this.selectedOptions)
    );
    // this.selectedId = this.querySelector('input[name="swatch-value"]').value;
    // console.log(this.selectedId);
    this.getUpdatedCard();
  }

  getUpdatedCard() {
    console.log(this.currentVariant.id);
    // const url = `${this.productHandle}?variant=${this.currentVariant.id}&section_id=${this.sectionId}`;
    const url = `/products/${this.productHandle}?view=card&variant=${this.currentVariant.id}`;
    console.log(this.productHandle);
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, "text/html");
        console.log(html);
        // this.innerHTML = html.querySelector(
        //   `[data-product-handle="${this.productHandle}"]`
        // ).innerHTML;

        this.innerHTML = html.querySelector("product-card").innerHTML;
      });
  }
}

customElements.define("product-card", ProductCard);
