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
        titleDiv.textContent = item.replace('-', ' ');

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
        });

        // Append the pill to the container
        pillContainer.appendChild(pill);
    });
}

const removreAllFilters =  () => {
    const clearBtn = document.getElementById('clear-all-btn');
    clearBtn.addEventListener('click', () => {
        uniqueCategories.forEach(item => {
            let checkbox = document.getElementById(item);
            checkbox.checked = false;
        })
        uniqueCategories = []
        renderPills('filter-pills', uniqueCategories);
        resetFilters();
    });
}
const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
    let max = Math.max(...filteredData.map(o => o.Price))
    let min = 0
    uniqueCategories = []
    resetFilters();
    filterByRange(min, max);
});
removreAllFilters();