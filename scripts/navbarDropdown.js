document.addEventListener("DOMContentLoaded", function () {
    const wishlistBlock = document.querySelector(".wishlist-block");

    if (!wishlistBlock) return; // Prevent errors if element is missing

    // Create dropdown menu dynamically
    const wishlistDropdown = document.createElement("div");
    wishlistDropdown.classList.add("wishlist-dropdown");
    wishlistDropdown.innerHTML = `
    <div class="favorites-header px-5">
      <h3 id="wishlist-title">Favorites (0 items)</h3>
      <img class="cursor-pointer close-dropdown" src="https://www.gemnote.com/images/common/cross.svg">
    </div>
    <div class="favorites-empty px-5">
      <h2>You have no favorites yet.</h2>
      <p>Add your favorite items to the wishlist!</p>
      <div style="display:flex; justify-content: center;">
        <a href="https://www.gemnote.com/lookbook" class="btn-start">explore our lookbook</a>
      </div>
    </div>
    <div class="favorites-list px-5" style="display: none;">
      <ul id="wishlist-items"></ul>
    </div>
    <div class="favorites-footer">
      <a href="https://www.gemnote.com/start-a-project" class="merchendise-cta-button">start a project</a>
    </div>
  `;

    // Append dropdown after wishlist block
    wishlistBlock.parentNode.appendChild(wishlistDropdown);
    wishlistDropdown.style.display = "none";

    // Toggle dropdown visibility on click
    wishlistBlock.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent event bubbling
        wishlistDropdown.style.display = wishlistDropdown.style.display === "block" ? "none" : "block";
        updateWishlistUI();
    });

    // Close dropdown when clicking the close button
    document.querySelector(".close-dropdown").addEventListener("click", function () {
        wishlistDropdown.style.display = "none";
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!wishlistBlock.contains(event.target) && !wishlistDropdown.contains(event.target)) {
            wishlistDropdown.style.display = "none";
        }
    });

    // Function to update wishlist UI
    function updateWishlistUI() {
        const wishlistCookie = getCookie("lookbook");
        const wishlistItems = wishlistCookie ? JSON.parse(decodeURIComponent(wishlistCookie)) : [];
        const wishlistCounter = document.getElementById("wishlist-counter");
        const wishlistTitle = document.getElementById("wishlist-title");
        const wishlistList = document.getElementById("wishlist-items");
        const favoritesEmpty = document.querySelector(".favorites-empty");
        const favoritesList = document.querySelector(".favorites-list");
        const favoritesFooter = document.querySelector(".favorites-footer");

        // Update counter
        wishlistCounter.textContent = wishlistItems.length;
        wishlistTitle.textContent = `Favorites (${wishlistItems.length} item${wishlistItems.length !== 1 ? "s" : ""})`;

        // Toggle empty state or list
        if (wishlistItems.length === 0) {
            favoritesEmpty.style.display = "flex";
            favoritesList.style.display = "none";
            favoritesFooter.style.display = "none";
        } else {
            favoritesEmpty.style.display = "none";
            favoritesList.style.display = "block";
            favoritesFooter.style.display = "block";

            // Populate wishlist items
            wishlistList.innerHTML = wishlistItems
                .map(
                    (item, index) => `
            <li class="favorite-item px-5" data-index="${index}">
              <div class="list-container gap-4 justify-evenly mt-7">
                <div class="image-wrapper">
                  <img class="object-cover image-container" src="${item.image}" alt="${item.text}">
                </div>
                <div class="flex flex-col justify-evenly lg:gap-[3px] gap-[2px]">
                  <h3 class="font-editorial item-heading">${item.text}</h3>
                  <p class="font-inter item-price">From $${item.price.toFixed(2)}</p>
                  <p class="font-inter remove-button cursor-pointer" data-index="${index}">remove</p>
                </div>
              </div>
            </li>
          `
                )
                .join("");

        }

        // Add event listeners to remove buttons
        document.querySelectorAll(".remove-button").forEach((btn) => {
            btn.addEventListener("click", function () {
                event.stopPropagation();
                removeFromWishlist(parseInt(this.dataset.index, 10));
                updateButtonStyles()
            });
        });
    }

    // Function to remove an item from wishlist
    function removeFromWishlist(index) {
        const wishlistCookie = getCookie("lookbook");
        let wishlistItems = wishlistCookie ? JSON.parse(decodeURIComponent(wishlistCookie)) : [];

        if (wishlistItems[index]) {
            wishlistItems.splice(index, 1);
            setCookie("lookbook", JSON.stringify(wishlistItems), 7);
            updateWishlistCounter();
            updateWishlistUI();
        }
    }

    // Update UI on page load
    updateWishlistUI();
});