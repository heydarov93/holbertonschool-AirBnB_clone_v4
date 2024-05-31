const $ = window.$;

const checkedInputs = function () {
  const inputIds = [];
  const inputNames = [];

  const inputs = $('input:checked');
  const amenityH4 = $('.amenities .subtitle');

  inputs.each((index, input) => {
    inputIds.push(input.dataset.id);
    inputNames.push(input.dataset.name);
  });

  const output = inputNames.join(', ').slice(0, 17);
  let suffix = '';

  if (output.length === 17) {
    suffix = '...';
  }

  amenityH4.text(inputNames.join(', ').slice(0, 17) + suffix);

  if (!inputIds.length) {
    amenityH4.html('&nbsp;');
  }
};

$().ready(function () {
  $(':checkbox').on('click', checkedInputs);

  fetch('http://127.0.0.1:5001/api/v1/status/')
  .then(res => res.json())
  .then(data => {
    if (data.status == 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
