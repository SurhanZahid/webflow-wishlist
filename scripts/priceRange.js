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

const renderPriceRange = () => {
    setTimeout(() => {
        $(function () {
            let idOfRangeSlider = 'slider-range';
            let max = Math.max(...filteredData.map(o => o.Price))
            let min = 0
            $('#' + idOfRangeSlider).css('display', 'none');
            $("<div></div>").insertAfter('#' + idOfRangeSlider);

            var range = $('#' + idOfRangeSlider).next()[0];

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
                const filteredArray = data.filter(item => item.Price >= values[0] && item.Price <= values[1]);
                const sortByPrice = (a, b) => a.Price - b.Price;
                if(uniqueCategories) {
                    filteredArray = filteredArray.filter(item => uniqueCategories.includes(item['Brand'] || item['Product Category']))
                }
                // Sorting by price after filtering
                filteredData = filteredArray.slice().sort(sortByPrice);
                refreshList();
                $('#' + idOfRangeSlider).val(values.join(' - '));
            });
        });
    }, 1000)
}
renderPriceRange()
