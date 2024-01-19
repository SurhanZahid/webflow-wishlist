const renderPriceRange = () => {
    refreshList();
    $(function () {
        //THIS IS FOR THE RANGE SLIDER.
        //Sorry for yelling...
        let idOfRangeSlider = 'slider-range';
        console.log(max, min);
        $('#' + idOfRangeSlider).css('display', 'none');
        $("<div></div>").insertAfter('#' + idOfRangeSlider);

        var range = $('#' + idOfRangeSlider).next()[0];

        noUiSlider.create(range, {
            connect: true,
            start: [5, 68],
            range: {
                'min': 2,
                'max': 200
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
}
renderPriceRange()
