var getSearchText = ( function() {
	var urlQueryParams = document.location.search.split( '&' );

	for( var i =0; i < urlQueryParams; i++ ) {
		var queryParam = urlQueryParams[i];
		if( queryParam.startsWith( 'text=' ) ) {
			return queryParam.split( '=' )[1];
		}
	}
} );

$(function () {
  "use strict";

  $('#heading').text("Search");
  $.get('/api/search' + document.location.search, function (res) {

    var table = document.getElementById("churchSearchResult");
    var tb = document.createElement('tbody');

    res.data.forEach( function( church ) {
      var tr = tb.appendChild (document.createElement('tr'));

      var name = tr.appendChild( document.createElement('td') );
      var city = tr.appendChild( document.createElement('td') );
      var province = tr.appendChild( document.createElement('td') );

      name.innerHTML = church.name;
      city.innerHTML = church.city;
      province.innerHTML = church.province;
    } );

    table.appendChild(tb);

    var searchTerm = '';
    var urlQueryParams = document.location.search.split( '&' );
	for( var i =0; i < urlQueryParams.length; i++ ) {
		var queryParam = urlQueryParams[i];
		if( queryParam.startsWith( 'text=' ) || queryParam.startsWith( '?text=' ) ) {
			searchTerm =  queryParam.split( '=' )[1];
			break;
		}
	}

    var footerHtml = '';
    var page = parseInt( res.page, 10 );
    if( page > 0 ) {
      footerHtml += '<a href="/search.html?page=' + ( page - 1 ) + '&text=' + searchTerm + '">prev</a>';
    }
    if( res.more === true ) {
      footerHtml += '<a class="right" href="/search.html?page=' + ( page + 1 ) + '&text=' + searchTerm + '">next</a>';
    }

    document.getElementById( 'tableFooter' ).innerHTML = footerHtml;

  });

});


