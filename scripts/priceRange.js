let maxPrice;
let minPrice;


const setPriceRange = () => {
    const min = document.getElementById('price-min-range')
    const max = document.getElementById('price-max-range')
    min.textContent = `$${minPrice}`
    max.textContent = `$${maxPrice}`
}

const filterByRange = (min, max) => {
    let idOfRangeSlider = 'slider-range';
    const range = $('#' + idOfRangeSlider).next()[0];
    // Filter items within the min and max range
    const filteredArray = filteredData.filter(item => item.Price >= min && item.Price <= max);

    // Custom comparator function to sort by price
    const sortByPrice = (a, b) => a.Price - b.Price;

    // Sorting by price after filtering
    filteredData = filteredArray.slice().sort(sortByPrice);
    range.noUiSlider.reset();
    refreshList();
}


const filterByPrice = (wishlist) => {
    let filteredArray = wishlist.filter(item => item.Price >= minPrice && item.Price <= maxPrice);
    const sortByPrice = (a, b) => a.Price - b.Price;
    if (uniqueCategories.length) {
        filteredArray = filteredArray.filter(item => uniqueCategories.includes(item['Brand'] || item['Product Category']))
    }

    return filteredArray.slice().sort(sortByPrice);
}

const renderPriceRange = () => {
    setTimeout(() => {
        $(function () {
            let idOfRangeSlider = 'slider-range';
            let max = Math.max(...filteredData.map(o => o.Price))
            let min = 0
            $('#' + idOfRangeSlider).css('display', 'none');
            $("<div></div>").insertAfter('#' + idOfRangeSlider);

            var range = $('#' + idOfRangeSlider).next()[0];
            minPrice = min;
            maxPrice = max;

            noUiSlider.create(range, {
                connect: true,
                start: [min, max],
                range: {
                    'min': min,
                    'max': max
                },
                step: 10,
                tooltips: [
                    wNumb({ decimals: 2, prefix: '$' }),
                    wNumb({ decimals: 2, prefix: '$' }),
                ],
            });
            range.noUiSlider.on('update', function (values) {
                minPrice = values[0];
                maxPrice = values[1];
                setPriceRange()
                filteredData = filterByPrice(data);
                refreshList();
                $('#' + idOfRangeSlider).val(values.join(' - '));
            });
        });
    }, 2000)
}
renderPriceRange()
