const url = 'https://raw.githubusercontent.com/SurhanZahid/webflow-wishlist/master/scripts/csvjson.json';
const itemsPerPage = 9; // Adjust the number of items per page as needed

let currentPage = 1;
var data;
var filteredData;
var defaultState;

const getFilterData = () => {
    return filteredData
}

const toggleNoProductFoundVisibility = (style) => {
    const productNotFoundContainer = document.getElementById('product-not-found');
    const productContainer = document.getElementById('random');
    const paigination = document.getElementById('paginationContainer');
    if (style === 'none')
    {
        productContainer.style.display = 'flex'
        paigination.style.display = 'flex'
    }
    else {
        productContainer.style.display = 'none'
        paigination.style.display = 'none'
    }
    productNotFoundContainer.style.display = style

}

function renderItems(startIndex, endIndex) {
    const container = document.querySelector('.product-cms-list');
    container.innerHTML = ''; // Clear previous content

    for (let i = startIndex; i < endIndex; i++) {
        const item = filteredData[i];

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
                                    <div class="product-price">${item.Price}</div>
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

function nextPage() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
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

function handleSearch() {
    const searchInput = document.querySelector('.filter-control');
    const searchTerm = searchInput.value.toLowerCase();

    if(!searchTerm)
    {
        hideSuggestions()
    }

    filteredData = data.filter(item =>
        item.Name.toLowerCase().includes(searchTerm)
    );

    currentPage = 1;
    renderItems(0, itemsPerPage);
    updatePagination();
    generateSuggestions(searchTerm);
}

function addSearchEvent() {
    document.querySelector('.filter-control').addEventListener('input', handleSearch)
    document.querySelector('.filter-control').addEventListener('input', showSuggestions)
}

function generateSuggestions(searchTerm) {
    suggestionsList = data
        .filter(item => item.Name.toLowerCase().includes(searchTerm))
        .map(item => item.Name);
    updateSuggestionsList();
}

function updateSuggestionsList() {
    const suggestionsListContainer = document.getElementById('suggestionsList');
    suggestionsListContainer.innerHTML = '';
    suggestionsListContainer.style.display = 'none';
    suggestionsList.slice(0, 5).forEach(suggestion => {
        const suggestionItem = document.createElement('li');
        suggestionItem.textContent = suggestion;
        suggestionItem.addEventListener('click', () => {
            document.querySelector('.filter-control').value = suggestion;
            handleSearch();
        });
        suggestionsListContainer.appendChild(suggestionItem);
    });
}

function showSuggestions() {
    const suggestionsListContainer = document.getElementById('suggestionsList');
    suggestionsListContainer.style.display = 'block';
}

window.addEventListener('click', function (e) {
    const suggestionsListContainer = document.getElementById('suggestionsList');
    if (!suggestionsListContainer.contains(e.target)) {
        suggestionsListContainer.style.display = 'none';
    }
});

function hideSuggestions() {
    const suggestionsListContainer = document.getElementById('suggestionsList');
    suggestionsListContainer.style.display = 'none';
}
toggleNoProductFoundVisibility('block');
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseData => {
        data = responseData;
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
