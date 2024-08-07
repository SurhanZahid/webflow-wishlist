let uniqueCategories = [];
let appliedFiltersWishlist = [];

const renderCheckbox = () => {
    const items = document.querySelectorAll('.w-dyn-item:not(.banner-collection-item), .product-item-container:not(.banner-collection-item)');

    items.forEach(function (item) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        // checkbox.disabled = true;
        const anchorLink = item.querySelector('.product-tab-link');
        const anchorText = anchorLink ? anchorLink.textContent : '';
        checkbox.id = formatStringWithDash(anchorText);
        checkbox.className = 'product-item-checkbox'
        //checkbox.id = anchorText.toLowerCase().replace(/\s/g, '-') + '-checkbox';

        item.insertBefore(checkbox, item.firstChild);

        item.classList.add('product-item-container');
    });
}

const handleCheckboxEvent = (checkbox, category) => {
    if (checkbox.checked) {
        uniqueCategories.unshift(formatStringWithDash(category));
        filterByCategory();
        showAppliedFilterDisplay();
        renderPills('filter-pills', uniqueCategories);
    }
    else {
        const index = uniqueCategories.findIndex(name => name === formatStringWithDash(category));
        uniqueCategories.splice(index, 1);
        appliedFiltersWishlist = []
        showAppliedFilterDisplay();
        if (uniqueCategories.length) {
            filterByCategory();
            renderPills('filter-pills', uniqueCategories);
        } else {
            filteredData = filterByPrice(defaultState);
            refreshList();
            renderPills('filter-pills', uniqueCategories);
        }
    }
}
const showAppliedFilterDisplay = () => {
    if (uniqueCategories.length)
    {
        document.getElementById('applied-filters-container').style.display = 'flex'
    } else {
        document.getElementById('applied-filters-container').style.display = 'none'
    }
}

const formatStringWithDash = (product) => {
    let regexPattern = /[^a-zA-Z0-9]+/g;
    return product.replace(regexPattern, '-').toLowerCase()
}

const filterByCategory = () => {
    uniqueCategories.forEach(category => {
        data.forEach(product => {
            if (product['Product Category'] || product['Brand']) {
                if (product['Product Category'] === formatStringWithDash(category) || product['Brand'] === formatStringWithDash(category)) {
                    appliedFiltersWishlist.unshift(product)
                }
            }
        })
    })
    appliedFiltersWishlist = filterByPrice(appliedFiltersWishlist)
    appliedFiltersWishlist = removeDuplicates(appliedFiltersWishlist);
    filteredData = sortWishlist(appliedFiltersWishlist, 'Price');
    refreshList();
}

const checkboxEventHandler = () => {
    const anchorLinks = document.querySelectorAll('.product-tab-link');
    const checkboxes = document.querySelectorAll('.product-item-checkbox');

    // Loop through each anchor tag
    anchorLinks.forEach(function (anchor) {
        // Replace the href attribute with #
        anchor.href = '#';

        // Add a click event listener to check and uncheck the checkbox
        anchor.addEventListener('click', function () {
            // Get the parent element (w-dyn-item)
            const listItem = anchor.parentElement;

            // Get the checkbox within the parent element
            const checkbox = listItem.querySelector('input[type="checkbox"]');

            // Toggle the checkbox state
            checkbox.checked = !checkbox.checked;
            handleCheckboxEvent(checkbox, anchor.textContent)
        });
    });
    checkboxes.forEach( function (checkbox) {
        checkbox.addEventListener('click', () => {
            handleCheckboxEvent(checkbox, checkbox.id)
        })
    })
}

//renderCheckbox();
checkboxEventHandler();
