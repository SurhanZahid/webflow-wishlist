const renderPriceRange = () => {
    setTimeout(() => {
        $(function () {
            let idOfRangeSlider = 'slider-range';
            let max = Math.max(...filteredData.map(o => o.Price))
            let min = Math.min(...filteredData.map(o => o.Price))
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
                // Filter items within the min and max range
                const filteredArray = filteredData.filter(item => item.Price >= values[0] && item.Price <= values[1]);

                // Custom comparator function to sort by price
                const sortByPrice = (a, b) => a.Price - b.Price;

                // Sorting by price after filtering
                filteredData = filteredArray.slice().sort(sortByPrice);
                refreshList();
                $('#' + idOfRangeSlider).val(values.join(' - '));
            });
        });
    }, 1000)
}
renderPriceRange()
