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
                $('#' + idOfRangeSlider).val(values.join(' - '));
            });
        });
    }, 1000)
}
renderPriceRange()
