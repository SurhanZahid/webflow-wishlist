const url = 'https://raw.githubusercontent.com/SurhanZahid/webflow-wishlist/master/scripts/csvjson.json';
const itemsPerPage = 60; // Adjust the number of items per page as needed

let currentPage = 1;
let data;
let filteredData;
let defaultState;
let order = '';


const getFilterData = () => {
    return filteredData
}

const toggleNoProductFoundVisibility = (style) => {
    const productNotFoundContainer = document.getElementById('product-not-found');
    const productContainer = document.getElementById('random');
    const paigination = document.getElementById('paginationContainer');
    if (style === 'none') {
        productContainer.style.display = 'flex'
        paigination.style.display = 'flex'
        productNotFoundContainer.style.display = 'none'
    }
    else {
        productContainer.style.display = 'none'
        paigination.style.display = 'none'
        productNotFoundContainer.style.display = 'block'
    }

}

function renderItems(startIndex, endIndex) {
    const container = document.querySelector('.product-cms-list');
    container.innerHTML = '';
    let sortedProducts;
    if (order === 'descending') {
        sortedProducts = filteredData.sort((a, b) => {
            return b["Price"] - a["Price"];
        });
    } else if (order === 'ascending') {
        sortedProducts = filteredData.sort((a, b) => {
            return a["Price"] - b["Price"];
        });
    } else {
        // Default sorting if order is not specified
        sortedProducts = filteredData.sort((a, b) => {
            return new Date(b["Created On"]) - new Date(a["Created On"]);
        });
    }
    for (let i = startIndex; i < endIndex; i++) {
        const item = sortedProducts[i];

        if (item) {
            const productItem = document.createElement('div');
            productItem.classList.add('product-cms-item', 'w-dyn-item');

            // Customize the content based on your JSON structure
            productItem.innerHTML = `
                    <div class="product-container">
                        <div class="product-thumbnail-wrapper"><img alt="${item.Name}"
                                src="${item.Image}"
                                sizes="100vw"
                                width="50"
                                srcset="${item.Image}"
                                class="product-thumbnail"></div>
                            <div class="product-description-container">
                                <div class="product-description-wrapper">
                                    <p class="product-name">${item.Name}</p>
                                </div>
                                <div class="product-price-wrapper">
                                    <div class="product-price">From&nbsp; </div>
                                    <div class="product-price"> $</div>
                                    <div class="product-price tooltip">${item.Price} (MSRP)
                                        <span class="tooltip-text">Manufacture Suggested Retail Price</span>
                                    </div>
                                </div>
                            </div>
                    </div>
                    `;

            container.appendChild(productItem);
        }
    }
    updateItemBorders()
    document.getElementById('currentPage').innerText = currentPage;
}

function scrollToFiltersContainer() {
    const filtersContainer = document.getElementById("applied-filters-container");
    if (filtersContainer) {
        filtersContainer.scrollIntoView({ behavior: "smooth" });
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderItems((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        updatePagination();
        scrollToFiltersContainer(); // Scroll up to the applied-filters-container
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderItems((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        updatePagination();
        scrollToFiltersContainer(); // Scroll up to the applied-filters-container
    }
}


function updatePagination() {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = ''; // Clear previous pagination buttons

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const prevButton = createPaginationButton('Previous', prevPage);
    paginationContainer.appendChild(prevButton);

    const currentPageSpan = document.createElement('span');
    currentPageSpan.id = 'currentPage';
    currentPageSpan.innerText = currentPage + '/' + totalPages;
    paginationContainer.appendChild(currentPageSpan);

    const nextButton = createPaginationButton('Next', nextPage);
    paginationContainer.appendChild(nextButton);
}

function createPaginationButton(text, clickHandler) {
    const button = document.createElement('button');
    button.innerText = text;
    button.addEventListener('click', clickHandler);
    return button;
}

toggleNoProductFoundVisibility('block');

function filterByCollection(wishlists) {
    const currentUrl = document.URL.split('/')
    const collectionFilter = wishlists.filter(wishlist => wishlist['Product Collection'] === currentUrl[currentUrl.length - 1] || wishlist['Product Category'] === currentUrl[currentUrl.length - 1])
    if (!collectionFilter.length)
    {
        return wishlists
    }
    return collectionFilter
}

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseData => {
        data = filterByCollection(responseData);
        filteredData = data;
        defaultState = [...data];
        addSearchEvent();
        renderItems(0, itemsPerPage);
        updatePagination();
        toggleNoProductFoundVisibility('none');
    })
    .catch(error => {
        toggleNoProductFoundVisibility('none');
        console.error('Fetch error:', error);
    });
