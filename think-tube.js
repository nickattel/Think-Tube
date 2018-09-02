const endpointUrl = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyDr0_4MezaO99bgCfnzCo6VN5aWmxtFL2U',
    q: `${searchTerm}`,
    maxResults: 5
  }
  $.getJSON(endpointUrl, query, callback);
}

function renderResult(result) {
  return 
  `<div>${result.part}</div>`
}

function displayData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(query, displayData);
  });
}

$(watchSubmit);