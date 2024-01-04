const url = 'https://raw.githubusercontent.com/SurhanZahid/webflow-wishlist/master/scripts/csvjson.json';
const itemsPerPage = 5; // Adjust the number of items per page as needed

let currentPage = 1;
let data;

function renderItems(startIndex, endIndex) {
    const container = document.querySelector('.product-cms-list');
    container.innerHTML = ''; // Clear previous content

    for (let i = startIndex; i < endIndex; i++) {
        const item = data[i];

        if (item) {
            const productItem = document.createElement('div');
            productItem.classList.add('product-cms-item', 'w-dyn-item');

            // Customize the content based on your JSON structure
            productItem.innerHTML = `
            <div class="product-container">
                    <div class="product-thumbnail-wrapper"><img alt="${item.Name}"
                            src="${item.Image}"
                            sizes="100vw"
                            srcset="${item.Image}"
                            class="product-thumbnail"></div>
                        <div class="product-description-container">
                            <div class="product-description-wrapper">
                                <p class="product-name">${item.Name}</p>
                                <div class="bookmark"></div>
                            </div>
                            <div class="product-price-wrapper">
                                <div class="product-price">From&nbsp; </div>
                                <div class="product-price"> $</div>
                                <div class="product-price">${item.Price}</div>
                            </div>
                        </div>
                </div>
            `;

            container.appendChild(productItem);
        }
    }

    document.getElementById('currentPage').innerText = currentPage;
}

function nextPage() {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderItems((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        updatePagination();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderItems((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        updatePagination();
    }
}

function updatePagination() {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = ''; // Clear previous pagination buttons

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const prevButton = createPaginationButton('Previous', prevPage);
    paginationContainer.appendChild(prevButton);

    const currentPageSpan = document.createElement('span');
    currentPageSpan.id = 'currentPage';
    currentPageSpan.innerText = currentPage;
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

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseData => {
        data = responseData;
        renderItems(0, itemsPerPage);
        updatePagination();
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
