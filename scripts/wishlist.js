const deleteItemFromLocalStorage = (image, text, container) => {
    const savedData = getSavedData();

    // Find the index of the item to be deleted
    const indexToDelete = savedData.findIndex(item => item.image === image && item.text === text);

    if (indexToDelete !== -1) {
        // Remove the item from the array
        savedData.splice(indexToDelete, 1);

        // Save the updated array back to local storage
        localStorage.setItem('lookbook', JSON.stringify(savedData));
        container.classList.toggle('not-selected');
        handleCounter();
        console.log('Item deleted:', { image, text });

    } else {
        console.log('Item not found:', { image, text });
    }
}

const saveToLocalStorage = (image, text, container) => {
    // Retrieve existing data from local storage or initialize an empty array
    const lookbookItems = localStorage.getItem('lookbook');
    const existingData = lookbookItems ? JSON.parse(lookbookItems) : [];
    const bookmarkDiv = container.querySelector('.bookmark');
    const bookmarkCheckedDiv = container.querySelector('.bookmark-selected');

    // Check for duplicates based on image and text
    const isDuplicate = existingData.some(item => item.image === image && item.text === text);
    // If it's not a duplicate, add the new data
    if (!isDuplicate) {
        //container.classList.toggle('selected')
        bookmarkDiv.classList.toggle('bookmark-selected')
        const priceContainer = container.querySelectorAll('.product-price');
        const price = priceContainer[2].innerText
        existingData.push({ image, text, price });
        handleCounter();
        // Save the updated array back to local storage
        localStorage.setItem('lookbook', JSON.stringify(existingData));
    } else {
        //container.classList.toggle('selected');
        bookmarkCheckedDiv.className = 'bookmark'
        deleteItemFromLocalStorage(image, text, container)
        handleCounter();
        console.log('This image and text combination is already in the array.');
    }
}

const handleOnClick = () => {
    document.addEventListener('click', function (event) {
        const clickedElement = event.target.closest('.product-container');

        if (clickedElement) {
            const image = clickedElement.querySelector('img');
            const textDiv = clickedElement.querySelector('.product-name');

            const src = image.getAttribute('src');
            const text = textDiv.textContent;
            saveToLocalStorage(src, text, clickedElement);
            handleCounter();
        }
    });
}

const updateItemBorders = () => {
    const itemsContainer = document.getElementsByClassName('product-cms-item w-dyn-item');
    const savedData = getSavedData();
    for (let parent of itemsContainer) {
        const items = parent.querySelectorAll('.product-container');
        items.forEach(item => {
            const image = item.querySelector('img');
            const textDiv = item.querySelector('.product-name');
            const src = image.getAttribute('src');
            const text = textDiv.textContent;
            const bookmark = item.querySelectorAll('.product-description-wrapper');
            const bookmarkDiv = document.createElement('div');
            bookmarkDiv.className = 'bookmark';
            bookmark[0].appendChild(bookmarkDiv);
            if (isItemInLocalStorage(src, text)) {
                bookmarkDiv.className = 'bookmark-selected'
            }
        });
    }
}

const isItemInLocalStorage = (image, text) => {
    const savedData = getSavedData();
    return savedData.some(item => item.image === image && item.text === text);
}

const getSavedData = () => {
    const lookbookItems = localStorage.getItem('lookbook');
    const savedData = lookbookItems ? JSON.parse(lookbookItems) : [];
    return savedData;
}

const createCounter = () => {
    const projectTopContainer = document.querySelectorAll('.lab-nav-start')
    const projectMobileTopContainer = document.querySelectorAll('.nav-menu-right')
    const lookbookItems = localStorage.getItem('lookbook');
    const totalItemsSaved = lookbookItems ? JSON.parse(lookbookItems) : [];

    const counterDiv = document.createElement('span')
    counterDiv.className = 'counter';
    const counter2Div = document.createElement('span')
    counter2Div.className = 'counter2';
    const counterSpanMobile = document.createElement('span')
    counterSpanMobile.className = 'counter-mobile';
    if (totalItemsSaved.length > 0) {
        counterDiv.textContent = ' ' + totalItemsSaved.length
        counter2Div.textContent = ' ' + totalItemsSaved.length
        counterSpanMobile.textContent = ' ' + totalItemsSaved.length
    } else {
        counterDiv.style.display = 'none';
        counter2Div.style.display = 'none';
        counterSpanMobile.style.display = 'none';
    }
    projectTopContainer[0].appendChild(counterDiv);
    projectTopContainer[1].appendChild(counter2Div);
    projectMobileTopContainer[1].appendChild(counterSpanMobile);
}

const handleCounter = () => {
    const setTextContent = (container, text) => {
        container.forEach(element => {
            element.textContent = text;
        });
    };

    const projectTopContainer = document.querySelectorAll('.counter');
    const project2TopContainer = document.querySelectorAll('.counter2');
    const projectMobileTopContainer = document.querySelectorAll('.counter-mobile');
    const lookbookItems = localStorage.getItem('lookbook');
    const totalItemsSaved = lookbookItems ? JSON.parse(lookbookItems) : [];

    const textContent = totalItemsSaved.length > 0 ? ` ${totalItemsSaved.length}` : '0';

    if (totalItemsSaved.length > 0) {
        projectTopContainer.forEach(element => element.style.display = 'inline');
        project2TopContainer.forEach(element => element.style.display = 'inline');
        projectMobileTopContainer.forEach(element => element.style.display = 'inline');
    } else {
        projectTopContainer.forEach(element => element.style.display = 'none');
        project2TopContainer.forEach(element => element.style.display = 'none');
        projectMobileTopContainer.forEach(element => element.style.display = 'none');
    }

    setTextContent(projectTopContainer, textContent);
    setTextContent(project2TopContainer, textContent);
    setTextContent(projectMobileTopContainer, textContent);
}

window.addEventListener('load', () => {
    handleOnClick();
    createCounter();
});
