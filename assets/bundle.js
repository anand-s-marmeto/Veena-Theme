let items = [];
document
  .querySelector(".product-bundler___button")
  .addEventListener("click", () => {
    let productItems = [];
    document.querySelectorAll('input[type="checkbox"]').forEach((item) => {
      if (item.checked) {
        productItems.push({
          id: item.dataset.productId,
          quantity: 1,
        });
      }
    });
    console.log(productItems);

    if (productItems.length > 0) {
      const cart =
        document.querySelector("cart-notification") ||
        document.querySelector("cart-drawer");
      console.log(cart);

      let formData = {
        items: productItems,
        sections: cart.getSectionsToRender().map((section) => section.id),
      };
      console.log(formData);

      fetch(window.Shopify.routes.root + "cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          cart.renderContents(res);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
