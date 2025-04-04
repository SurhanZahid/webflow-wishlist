const renderFilterItems = (startIndex, endIndex) => {
    const container = document.querySelector('.product-cms-list');
    container.innerHTML = '';


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

const refreshFilterList = () => {
    currentPage = 1;
    renderFilterItems(0, itemsPerPage);
    updatePagination();
}


const resetFilters = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false
    })
    resetFilter();
}

const renderPills = (container, items) => {
    const pillContainer = document.getElementById(container);

    // Clear previous content
    pillContainer.innerHTML = '';

    // Render each item as a pill
    items.forEach(item => {
        const pill = document.createElement('div');
        pill.className = 'pill';

        // Create title div
        const titleDiv = document.createElement('div');
        titleDiv.className = 'title';
        titleDiv.textContent = item.replace(/-/g, ' ');

        // Create image container div
        const imageContainerDiv = document.createElement('div');
        imageContainerDiv.className = 'image-container';

        // Create image tag
        const imageTag = document.createElement('img');
        imageTag.className = 'image';
        imageTag.src = 'https://uploads-ssl.webflow.com/65297b8483de877bf51c6220/65bc204631a6765dd92c31ae_Group%202228.png';

        imageContainerDiv.appendChild(imageTag);

        pill.appendChild(titleDiv);
        pill.appendChild(imageContainerDiv);

        pill.addEventListener('click', () => {
            const clickedTitle = item;

            uniqueCategories = uniqueCategories.filter(item => item !== clickedTitle);

            renderPills('filter-pills', uniqueCategories);
            const checkbox = document.getElementById(item);
            checkbox.checked = false;
            showAppliedFilterDisplay();
            if (uniqueCategories.length) {
                filterByCategory();
            } else {
                resetFilter();
            }
        });

        // Append the pill to the container
        pillContainer.appendChild(pill);
    });
}

const removeAllFilters =  () => {
    const clearBtn = document.getElementById('clear-all-btn');
    clearBtn.addEventListener( 'click', () => {
        uniqueCategories.forEach(item => {
            let checkbox = document.getElementById(item);
            checkbox.checked = false;
        })
        uniqueCategories = [];
        order = '';
        sortByAsc.checked = false;
        sortByDesc.checked = false;
        renderPills('filter-pills', uniqueCategories);
        resetFilters();
        showAppliedFilterDisplay();
        refreshList();
    });
}

const sectionClearFilter = (name) => {
    const categories = document.querySelectorAll(`#${name}`);
    if (!categories.length) return;
    let filteredArray = filterByPrice(data);
    categories[0].childNodes.forEach(item => {
        const name = item.childNodes[0].id
        const index = uniqueCategories.findIndex(x => x === name)
        let checkbox = document.getElementById(name);
        checkbox.checked = false;
        if(uniqueCategories.length === 0)
        {
            resetFilters();
            return;
        }
        if(index !== -1)
        {
            uniqueCategories.splice(index, 1)
        }
        if (uniqueCategories.length) {
            filteredArray = filteredArray.filter(item => uniqueCategories.includes(item['Brand'] || item['Product Category']))
        }

        filteredData = filteredArray
        renderPills('filter-pills', uniqueCategories);
        currentPage = 1;
        renderItems(0, itemsPerPage);
        updatePagination();
    })
}

const resetBtn = document.getElementById('reset-btn');
const resetCategoryBtn = document.getElementById('reset-category-btn');
const resetBrandBtn = document.getElementById('reset-brand-btn');

const sortByAsc = document.getElementById('asc');
const sortByDesc = document.getElementById('desc');

resetBtn.addEventListener('click', () => {
    let max = Math.max(...filteredData.map(o => o.Price))
    let min = 0;
    filterByRange(min, max);

    sortByAsc.checked = false;
    sortByDesc.checked = false;
    order = '';
    let filteredArray = filterByPrice(filteredData);
    filteredData = filteredArray;
    refreshList();
});

resetCategoryBtn.addEventListener('click', () => {
    sectionClearFilter('category-list')
})

resetBrandBtn.addEventListener('click', () => {
    sectionClearFilter('brands-list')
})


removeAllFilters();

setTimeout(() => {
    const filterByPriceRange = filterByPrice(data);

    sortByAsc.addEventListener('click', () => {
        order = 'ascending';
        filteredData = sortWishlist(filteredData, 'Price');
        refreshFilterList();
    });

    sortByDesc.addEventListener('click', () => {
        order = 'descending';
        filteredData = sortWishlist(filteredData, 'Price');
        refreshFilterList();
    });

}, 3000)
const searchBarInput = document.getElementById('field');

searchBarInput.addEventListener('input', function() {
    const maxLength = 22;
    if (searchBarInput.value.length > maxLength) {
        searchBarInput.value = searchBarInput.value.slice(0, maxLength); // Truncate the input value
    }
});
