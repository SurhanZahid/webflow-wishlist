const getSavedData = () => {
    const lookbookItems = localStorage.getItem('lookbook');
    return lookbookItems ? JSON.parse(lookbookItems) : [];
};

const deleteLookBook = (image, text) => {
    const savedData = getSavedData();
    const indexToDelete = savedData.findIndex(item => item.image === image && item.text === text);
    if (indexToDelete !== -1) {
        savedData.splice(indexToDelete, 1);
        localStorage.setItem('lookbook', JSON.stringify(savedData));
        renderItems();
        handleCounter();
        updateWishlistInput();
        watchWishlistItems();
    } else {
        console.log('Item not found:', { image, text });
    }
};

const handleCloseBtn = () => {
    document.addEventListener('click', event => {
        const clickedElement = event.target.closest('.item');
        if (clickedElement) {
            const image = clickedElement.querySelector('img');
            const textDiv = clickedElement.querySelector('.text');
            console.log('closed btn clicked');
            const src = image.getAttribute('src');
            const text = textDiv.textContent;
            deleteLookBook(src, text);
        }
    });
};

const renderItems = () => {
    const itemsContainer = document.getElementById('lookbook-products');
    const savedData = getSavedData();
    itemsContainer.innerHTML = '';
    savedData.forEach(itemData => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        const closeDiv = document.createElement('div');
        closeDiv.classList.add('close');
        closeDiv.innerHTML = '×';
        const image = document.createElement('img');
        image.src = itemData.image;
        image.alt = 'Image';
        const textDiv = document.createElement('div');
        textDiv.classList.add('text');
        textDiv.textContent = itemData.text;
        itemDiv.appendChild(closeDiv);
        itemDiv.appendChild(image);
        itemDiv.appendChild(textDiv);
        itemsContainer.appendChild(itemDiv);
    });
};

const createCounter = () => {
    const projectTopContainer = document.querySelectorAll('.lab-nav-start');
    const projectMobileTopContainer = document.querySelectorAll('.nav-menu-right');
    const lookbookItems = localStorage.getItem('lookbook');
    const totalItemsSaved = lookbookItems ? JSON.parse(lookbookItems) : [];
    const counterDiv = document.createElement('span');
    counterDiv.className = 'counter';
    const counter2Div = document.createElement('span');
    counter2Div.className = 'counter2';
    const counterSpanMobile = document.createElement('span');
    counterSpanMobile.className = 'counter-mobile';
    if (totalItemsSaved.length > 0) {
        counterDiv.textContent = ' ' + totalItemsSaved.length;
        counter2Div.textContent = ' ' + totalItemsSaved.length;
        counterSpanMobile.textContent = ' ' + totalItemsSaved.length;
    } else {
        counterDiv.style.display = 'none';
        counter2Div.style.display = 'none';
        counterSpanMobile.style.display = 'none';
    }
    projectTopContainer[0].appendChild(counterDiv);
    projectTopContainer[1].appendChild(counter2Div);
    projectMobileTopContainer[1].appendChild(counterSpanMobile);
};

const handleCounter = () => {
    const projectTopContainer = document.querySelectorAll('.counter');
    const project2TopContainer = document.querySelectorAll('.counter2');
    const mobileCounterContainer = document.querySelectorAll('.counter-mobile');
    const lookbookItems = localStorage.getItem('lookbook');
    const totalItemsSaved = lookbookItems ? JSON.parse(lookbookItems) : [];
    if (totalItemsSaved.length > 0) {
        projectTopContainer.forEach(element => {
            element.style.display = 'inline';
            element.textContent = ' ' + totalItemsSaved.length;
        });
        project2TopContainer.forEach(element => {
            element.style.display = 'inline';
            element.textContent = ' ' + totalItemsSaved.length;
        });
        mobileCounterContainer.forEach(element => {
            element.style.display = 'inline';
            element.textContent = ' ' + totalItemsSaved.length;
        });
    } else {
        projectTopContainer.forEach(element => element.style.display = 'none');
        project2TopContainer.forEach(element => element.style.display = 'none');
        mobileCounterContainer.forEach(element => element.style.display = 'none');
    }
};

const renameKey = (obj, oldKey, newKey) => {
    if (obj.hasOwnProperty(oldKey)) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }
};

const renameKeyInArray = (array, oldKey, newKey) => {
    array.forEach(obj => renameKey(obj, oldKey, newKey));
};

const handleInput = () => {
    const lookbookItems = localStorage.getItem('lookbook');
    const formContainer = document.getElementsByClassName('form_btn');
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'wishlist';
    const lookbook = lookbookItems ? JSON.parse(lookbookItems) : [];
    renameKeyInArray(lookbook, 'text', 'name');
    hiddenInput.value = JSON.stringify(lookbook);
    formContainer[0].appendChild(hiddenInput);
};

const updateWishlistInput = () => {
    const lookbookItems = localStorage.getItem('lookbook');
    const wishlistInput = document.getElementsByName("wishlist");
    const lookbook = lookbookItems ? JSON.parse(lookbookItems) : [];
    renameKeyInArray(lookbook, 'text', 'name');
    wishlistInput[0].value = JSON.stringify(lookbook);
};

const handleFormSubmission = () => {
    const wishlistForm = document.getElementById("email-form");
    const submitButton = wishlistForm.querySelector('button[type="submit"]');
    wishlistForm.addEventListener('submit', event => {
        event.preventDefault();
        submitButton.disabled = true;
        const failElement = document.querySelector('.w-form-fail');
        let style = window.getComputedStyle(failElement);
        if (style.display === 'none') {
            localStorage.removeItem('lookbook');
        }
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        wishlistForm.dispatchEvent(submitEvent);
        setTimeout(() => {
            submitButton.disabled = false;
        }, 3000);
    });
};

const watchWishlistItems = () => {
    const lookbookItems = localStorage.getItem('lookbook');
    const items = lookbookItems ? JSON.parse(lookbookItems) : [];
    if (items.length === 0) {
        const formContainer = document.querySelectorAll('.form-block');
        formContainer[4].id = "date-selection-section";
        formContainer[7].id = "wishlist-section";
    }
};

//const savedData = getSavedData();
//renderItems(savedData);
handleCloseBtn();
createCounter();
handleInput();
handleFormSubmission();
watchWishlistItems();
