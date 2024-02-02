let uniqueCategories = [];
let filterTest = [];

const renderCheckbox = () => {
    var items = document.querySelectorAll('.w-dyn-item');

    items.forEach(function (item) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.disabled = true;

        var anchorLink = item.querySelector('.product-tab-link');
        var anchorText = anchorLink ? anchorLink.textContent : '';

        checkbox.id = anchorText.toLowerCase().replace(/\s/g, '-') + '-checkbox';

        item.insertBefore(checkbox, item.firstChild);

        item.classList.add('product-item-container');
    });
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
                    filterTest.unshift(product)
                }
            }
        })
    })
    filterTest = filterByPrice(filterTest)
    filteredData = removeDuplicates(filterTest);
    refreshList();
}

const checkboxEventHandler = () => {
    var anchorLinks = document.querySelectorAll('.product-tab-link');
    // Loop through each anchor tag
    anchorLinks.forEach(function (anchor) {
        // Replace the href attribute with #
        anchor.href = '#';

        // Add a click event listener to check and uncheck the checkbox
        anchor.addEventListener('click', function () {
            // Get the parent element (w-dyn-item)
            var listItem = anchor.parentElement;

            // Get the checkbox within the parent element
            var checkbox = listItem.querySelector('input[type="checkbox"]');
            checkbox.id = formatStringWithDash(anchor.textContent)
            // Toggle the checkbox state
            checkbox.checked = !checkbox.checked;
            if (checkbox.checked) {
                uniqueCategories.push(formatStringWithDash(anchor.textContent));
                filterByCategory();
                renderPills('filter-pills', uniqueCategories);
            } else {
                const index = uniqueCategories.findIndex(category => category === formatStringWithDash(anchor.textContent));
                uniqueCategories.splice(index, 1);
                filterTest = []
                if (uniqueCategories.length) {
                    filterByCategory();
                    renderPills('filter-pills', uniqueCategories);
                } else {
                    filteredData = filterByPrice(defaultState);
                    refreshList();
                    renderPills('filter-pills', uniqueCategories);
                }
            }
        });
    });
}

renderCheckbox();
checkboxEventHandler();
