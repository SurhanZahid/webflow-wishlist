const handleDropDownFilter = () => {
    const dropdown = document.querySelector('#order-2')
    if(dropdown.value === 'asc'){
        filteredData = data.sort((a,b) => {
            return parseFloat(a.Price) - parseFloat(b.Price)
        })
        renderItems(0, itemsPerPage);
        updatePagination();
    } else if (dropdown.value === 'desc') {
        filteredData = data.sort((a,b) => {
            return parseFloat(b.Price) - parseFloat(a.Price)
        })
        renderItems(0, itemsPerPage);
        updatePagination();
    } else {
        filteredData = defaultState
        renderItems(0, itemsPerPage);
        updatePagination();
    }
}

const addDropDownEvent = () => {
    document.querySelector('#order-2').addEventListener('change', handleDropDownFilter)
}

document.addEventListener('DOMContentLoaded', () => {
    addDropDownEvent();
});