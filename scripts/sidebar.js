// Initial visibility state
let isCategoriesVisible = true;
let isBrandVisible = true;
let isPriceRangeVisible = true;
let isRelevanceVisible = true;
// Elements selection
const categoryList = document.getElementById('categories-list');
const brandList = document.getElementById('brand-list');
const priceRangeContainer = document.getElementById('price-range-container');
const relevanceContainer = document.getElementById('relevance-container')
const categoryDropdown = document.getElementById('category-header');
const brandDropdown = document.getElementById('brand-header');
const priceRangeDropdown = document.getElementById('price-header');
const relevanceDropdown = document.getElementById('relevance-header')
const categoryIcon = document.getElementById('category-side-icon');
const brandIcon = document.getElementById('brand-side-icon');
const priceIcon = document.getElementById('price-side-icon');
const releveanceIcon = document.getElementById('relevance-side-icon');

const toggleSideIcon = (element, isVisible) => {
    element.src = isVisible ? 'https://assets-global.website-files.com/65297b8483de877bf51c6220/65c3ebe8b6eb5f7598a2f79e_chevron-down.svg' : 'https://uploads-ssl.webflow.com/65297b8483de877bf51c6220/65c400003f45e9c93811ac7f_chevron-up.svg'
}


// Function to toggle visibility
const toggleVisibility = (element, isVisible) => {
    element.style.display = isVisible ? 'none' : 'block';
}

// Hide dropdowns by default
categoryList.style.display = 'none';
brandList.style.display = 'none';
priceRangeContainer.style.display = 'none';
relevanceContainer.style.display = 'none';
// Event listeners for category dropdowns
categoryDropdown.addEventListener('click', () => {
    isCategoriesVisible = !isCategoriesVisible;
    toggleVisibility(categoryList, isCategoriesVisible);
    toggleSideIcon(categoryIcon, isCategoriesVisible);
});

// Event listeners for brand dropdown
brandDropdown.addEventListener('click', () => {
    isBrandVisible = !isBrandVisible;
    toggleVisibility(brandList, isBrandVisible);
    toggleSideIcon(brandIcon, isBrandVisible);
});
priceRangeDropdown.addEventListener('click', () => {
    isPriceRangeVisible = !isPriceRangeVisible;
    toggleVisibility(priceRangeContainer, isPriceRangeVisible);
    toggleSideIcon(priceIcon, isPriceRangeVisible);
})

relevanceDropdown.addEventListener('click', () => {
    isPriceRangeVisible = !isPriceRangeVisible;
    toggleVisibility(relevanceContainer, isRelevanceVisible);
    toggleSideIcon(releveanceIcon, isRelevanceVisible);
})