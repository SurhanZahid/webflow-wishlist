let parameters = new Set([])

const refreshList = () => {
    currentPage = 1;
    renderItems(0, itemsPerPage);
    updatePagination();
}

const handleDropDownFilter = () => {
    const dropdown = document.querySelector('#order-2')
    if (dropdown.value === 'asc') {
        const filterByPriceRange = filterByPrice(data);
        filteredData = filterByPriceRange.sort((a, b) => {
            return parseFloat(a.Price) - parseFloat(b.Price)
        })
        refreshList();
    } else if (dropdown.value === 'desc') {
        const filterByPriceRange = filterByPrice(data);
        filteredData = filterByPriceRange.sort((a, b) => {
            return parseFloat(b.Price) - parseFloat(a.Price)
        })
        refreshList();
    }
    else if (dropdown.value === 'default') {
        filteredData = defaultState;
        refreshList();
    }
    else if (dropdown.value === 'best-seller') {
        filteredData = data.filter(product => product.Name.toLowerCase().includes('best seller'))
        refreshList();
    }
    else {
        filteredData = defaultState
        refreshList();
    }
}

const handleSidebarFilters = (data, parameters) => {
    return data.filter(item => {
        return parameters.some(param => {
            const key = param.key;
            const value = param.value;
            const operator = param.operator || 'includes';

            if (operator === 'equals') {
                return item[key] === value;
            } else {
                return item[key].toLowerCase().includes(value.toLowerCase());
            }
        });
    });
}

const resetFilter = () => {
    let max = Math.max(...filteredData.map(o => o.Price))
    let min = 0
    minPrice = min;
    maxPrice = max;
    filteredData = filterByPrice(defaultState)
    showAppliedFilterDisplay();
    refreshList();
}

const addDropDownEvent = () => {
    document.querySelector('#order-2').addEventListener('change', handleDropDownFilter)
}

document.addEventListener('DOMContentLoaded', () => {
    // addDropDownEvent();
});
