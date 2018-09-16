const endpointUrl = 'https://www.googleapis.com/youtube/v3/search';

const resultLayout = `<div><a class='videoLink' href=''><img class='thumbnail' src=""></a></div><div><a class='channelLink' href=''></a></div>`;

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyDr0_4MezaO99bgCfnzCo6VN5aWmxtFL2U',
    q: searchTerm,
    maxResults: 5,
    pageToken: ''
  }
  $.getJSON(endpointUrl, query, callback);
}

function renderResult(result) {
  const layout = $(resultLayout);
  const videoUrl = `https://www.youtube.com/watch?v=${result.id.videoId}`;
  const channelUrl = `https://www.youtube.com/channel/${result.snippet.channelId}`;
  layout.find('.thumbnail').attr('src', result.snippet.thumbnails.medium.url);
  layout.find('.videoLink').attr('href', videoUrl);
  layout.find('.channelLink').html(channelUrl).attr('href', channelUrl);
  return layout;
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