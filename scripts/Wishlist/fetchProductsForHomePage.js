const fetchAndRenderProducts = async () => {
    const endpoint = "https://merchos.gemnote.com/api/v1/products/?is_active=&has_variants=&can_be_customized=&min_price=&max_price=&brand_slug=&category_slug=home&collection_slug=";

    try {
        const res = await fetch(endpoint);
        const data = await res.json();

        const productsRoot = document.getElementById("products-root");
        const wrapper = document.createElement("div");
        wrapper.className = "home-product-wrap";

        const listWrapper = document.createElement("div");
        listWrapper.className = "home-product-list-wrapper w-dyn-list";

        const list = document.createElement("div");
        list.className = "homeproduct-list w-dyn-items w-row";

        data.results.forEach(product => {
            const item = document.createElement("div");
            item.className = "home-product-item w-dyn-item w-col w-col-3";
            item.setAttribute("role", "listitem");

            item.innerHTML = `
          <img src="${product.image_url}" loading="lazy" alt="${product.name}" class="product-img">
          <div class="price-wrap-block">
            <div class="price-wrap">
              <div class="price-block">from $</div>
              <div class="price-block">${product.msrp}</div>
              <div class="price-block">USD</div>
            </div>
            <div class="unit-text">Min. 15 units</div>
          </div>
          <h2 class="product-heading">${product.name}</h2>
          <a href="#" class="add-button w-button">add to favorites</a>
        `;

            list.appendChild(item);
        });

        listWrapper.appendChild(list);
        wrapper.appendChild(listWrapper);
        productsRoot.appendChild(wrapper);
    } catch (err) {
        console.error("Failed to fetch products:", err);
    }
}

fetchAndRenderProducts();

const productItems = document.querySelectorAll('.home-product-item, .product-item');

if (productItems.length > 0) {
    productItems.forEach((item) => {
        item.addEventListener('click', () => {
            const productName = item.querySelector('.product-heading').textContent;
            const priceBlocks = item.querySelectorAll('.price-block');
            const productPrice = parseFloat(priceBlocks[1].textContent.trim());
            const productImage = item.querySelector('.product-img').getAttribute('src');

            const product = {
                Name: productName,
                Price: productPrice,
                Image: productImage,
            };

            saveToWishlist(product);
            updateButtonStyles();
        });
    });
} else {
    console.log('No product items found.');
}