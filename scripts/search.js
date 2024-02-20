
function handleSearch() {
    const searchInput = document.querySelector('.filter-control');
    const searchTerm = searchInput.value.toLowerCase();

    if (!searchTerm) {
        hideSuggestions()
    }

    let filteredArray = filterByPrice(data).filter(item =>
        item.Name.toLowerCase().includes(searchTerm)
    );

    if (uniqueCategories.length) {
        filteredArray = filteredArray.filter(item => uniqueCategories.includes(item['Brand'] || item['Product Category']))
    }

    filteredData = filteredArray

    if (filteredData.length) {
        toggleNoProductFoundVisibility('none')
    } else {
        toggleNoProductFoundVisibility('block')
    }

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

    let filteredArray = filterByPrice(data)
        .filter(item => item.Name.toLowerCase().includes(searchTerm))
        .map(item => item.Name);

    if (uniqueCategories.length) {
        filteredArray = filteredArray.filter(item => uniqueCategories.includes(item['Brand'] || item['Product Category']))
    }

    suggestionsList = filteredArray;
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
    if (suggestionsList.length) {
        suggestionsListContainer.style.display = 'block';
    } else {
        suggestionsListContainer.style.display = 'none';
    }
}

function hideSuggestions() {
    const suggestionsListContainer = document.getElementById('suggestionsList');
    suggestionsListContainer.style.display = 'none';
}

function searchTerm () {
    const searchTerm = document.getElementById('search-text')
    const searchResultsCount = document.getElementById('search-text-results')
    searchTerm.style.display = 'none'
    searchResultsCount.style.display = 'none'
    document.getElementById('field').addEventListener('input', function (evt) {
        const searchTerm = document.getElementById('search-text')
        if(this.value.length)
        {
            searchTerm.style.display = 'block'
            searchResultsCount.style.display = 'block'
            searchTerm.innerHTML = `Showing all results for <strong>“${this.value}”</strong>`
            searchResultsCount.innerText = `${filteredData.length} results`
        } else {
            searchTerm.style.display = 'none'
            searchResultsCount.style.display = 'none'
        }
    });
}

const suggestionsListContainer = document.getElementById('suggestionsList');
suggestionsListContainer.style.display = 'none';

window.addEventListener('click', function (e) {
    const suggestionsListContainer = document.getElementById('suggestionsList');
    if (!suggestionsListContainer.contains(e.target)) {
        suggestionsListContainer.style.display = 'none';
    }
});

searchTerm()