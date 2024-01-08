const refreshList = () => {
    currentPage = 1;
    renderItems(0, itemsPerPage);
    updatePagination();
}

const handleDropDownFilter = () => {
    const dropdown = document.querySelector('#order-2')
    if(dropdown.value === 'asc'){
        filteredData = data.sort((a,b) => {
            return parseFloat(a.Price) - parseFloat(b.Price)
        })
        refreshList();
    } else if (dropdown.value === 'desc') {
        filteredData = data.sort((a,b) => {
            return parseFloat(b.Price) - parseFloat(a.Price)
        })
        refreshList();
    } else {
        filteredData = defaultState
        refreshList();
    }
}

const addDropDownEvent = () => {
    document.querySelector('#order-2').addEventListener('change', handleDropDownFilter)
}

document.addEventListener('DOMContentLoaded', () => {
    addDropDownEvent();
});