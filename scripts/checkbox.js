const uniqueCategories = [];
let filterTest = [];

const renderCheckbox = () => {
    var items = document.querySelectorAll('.w-dyn-item');

    items.forEach(function (item) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        var anchorLink = item.querySelector('.product-tab-link');
        var anchorText = anchorLink ? anchorLink.textContent : '';

        checkbox.id = anchorText.toLowerCase().replace(/\s/g, '-') + '-checkbox';

        item.insertBefore(checkbox, item.firstChild);

        item.classList.add('product-item-container');
    });
}

const levenshteinDistance = (s, t) => {
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
        arr[i] = [i];
        for (let j = 1; j <= s.length; j++) {
            arr[i][j] =
                i === 0
                    ? j
                    : Math.min(
                        arr[i - 1][j] + 1,
                        arr[i][j - 1] + 1,
                        arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
                    );
        }
    }
    return arr[t.length][s.length];
};

const isSimilar = (str1, str2) => {
    console.log(str1, str2);
    if(str1)
    {
        const distance = levenshteinDistance(str1, str2);
        return distance <= 5;
    }
}
const formatStringWithDash = (product) => {
    const string = product.split(' ')
    if (string.length > 1) {
        return (string[0] + '-' + string[1]).toLowerCase()
    } else {
        return product.toLowerCase()
    }

}

const filterByCategory = () => {
    uniqueCategories.forEach(category => {
        data.forEach(product => {
            if (product['Product Category'] || product['Brand']) {
                if (product['Product Category'] === category) {
                    filterTest.unshift(product)
                }
            }
        })
    })
    filteredData = filterTest;
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

            // Toggle the checkbox state
            checkbox.checked = !checkbox.checked;
            if (checkbox.checked) {
                uniqueCategories.push(anchor.textContent);
                filterByCategory();
            } else {
                const index = uniqueCategories.findIndex(category => category === anchor.textContent);
                uniqueCategories.splice(index, 1);
                filterTest = []
                if (uniqueCategories.length) {
                    filterByCategory();
                } else {
                    resetFilter();
                }
            }
        });
    });
}

renderCheckbox();
checkboxEventHandler();
