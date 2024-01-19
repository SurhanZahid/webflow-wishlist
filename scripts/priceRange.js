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
                const sortByProvidedRange = (a, b) => {
                    const rangeA = Math.abs(a.Price - values[0]) + Math.abs(a.Price - values[1]);
                    const rangeB = Math.abs(b.Price - values[0]) + Math.abs(b.Price - values[1]);
                    return rangeA - rangeB;
                };
                filteredData = filteredData.slice().sort(sortByProvidedRange);
                console.log(filteredData);
                refreshList();
                $('#' + idOfRangeSlider).val(values.join(' - '));
            });
        });
    }, 1000)
}
renderPriceRange()
