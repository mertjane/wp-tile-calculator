(function ($) {
    $(document).ready(function () {

        $('#squareMeterInput').on('input', function () {
            $('#tilePieceInput').val('');
            $('#decimalWarning').text('');
            calculate();
        });

        $('#tilePieceInput').on('input', function () {
            var isDecimal = $('#tilePieceInput').val().includes('.', ",");
            if (isDecimal) {
                $('#decimalWarning').text('Decimal values are not allowed for quantity.');
            } else {
                $('#decimalWarning').text('');
            }
            $('#squareMeterInput').val('');
            calculate();
        });

        $('#tilePieceInput').on('change', function () {
            calculate();
        });

        $('#tileSize, #squareMeterInput').on('change input', function () {
            calculate();
        });

        function handleTileSizeChange() {
            var selectedSize = $('#tileSize').val();
            var isFreeSample = selectedSize === '100x100';
            $('#disableSquareMeter').prop('checked', isFreeSample);
            $('#squareMeterInput').prop('disabled', isFreeSample);
        }

        function handleSquareMeterDisableChange() {
            var disableSquareMeter = $('#disableSquareMeter').prop('checked');
            $('#squareMeterInput').prop('disabled', disableSquareMeter);

            if (disableSquareMeter) {
                $('button').attr('disabled', 'disabled');
            } else {
                $('button').removeAttr('disabled');
            }
        }

        $('#disableSquareMeter').on('change', handleSquareMeterDisableChange);

        function calculate() {
            if ($('#disableSquareMeter').prop('checked')) {
                $('#result').text('Square meter input is disabled.');
                return;
            }
            var selectedSize = $('#tileSize').val();
            var squareMeterInput = parseFloat($('#squareMeterInput').val());
            var tilePieceInput = parseInt($('#tilePieceInput').val());

            var dimensions = selectedSize.split('x');
            var tileArea = dimensions[0] * dimensions[1] / 1000000;

            $('#result').text('');

            if (!isNaN(squareMeterInput)) {
                var tilesRequired = Math.ceil(squareMeterInput / tileArea);
                $('#tilePieceInput').val(tilesRequired);
            } else if (!isNaN(tilePieceInput)) {
                var squareMeters = tilePieceInput * tileArea;
                $('#squareMeterInput').val(squareMeters.toFixed(3));
            } else {
                $('#result').text('Please enter a valid number.');
            }
        }

        function toggleSquareMeterInput() {
            var disableSquareMeter = $('#disableSquareMeter').prop('checked');
            $('#squareMeterInput').prop('disabled', disableSquareMeter);
        }

        function swapInputs() {
            var squareMeterValue = $('#squareMeterInput').val();
            var tilePieceValue = $('#tilePieceInput').val();

            if (squareMeterValue || tilePieceValue) {
                $('#squareMeterInput').val(tilePieceValue);
                $('#tilePieceInput').val(squareMeterValue);
            } else {
                var $squareMeterInput = $('#squareMeterInput');
                var $tilePieceInput = $('#tilePieceInput');
                var $button = $('button');

                $squareMeterInput.after($tilePieceInput);
                $tilePieceInput.after($button);
            }
        }

    });
})(jQuery);
