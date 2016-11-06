$(function () {
  "use strict";

  $('#heading').text("Search");
  $.get('/api/search' + document.location.search , function (res) {

    var table = document.getElementById("churchSearchResult");
    var tb = document.createElement('tbody');

    for( var i = 0; i < res.length && i < 100; i++ ) {
      var church = res[i];

      var tr = tb.appendChild (document.createElement('tr'));

      var name = tr.appendChild( document.createElement('td') );
      var city = tr.appendChild( document.createElement('td') );
      var province = tr.appendChild( document.createElement('td') );

      name.innerHTML = church.name;
      city.innerHTML = church.city;
      province.innerHTML = church.province;
    }
    if( res.length >= 100 ) {
      var tr = tb.appendChild (document.createElement('tr'));
      var cell = tr.appendChild( document.createElement('td'));
      tr.appendChild( document.createElement('td'));
      tr.appendChild( document.createElement('td'));
      cell.innerHTML = 'More results exist. Please narrow your search term if what you want to find something that has not been displayed';
    }

    table.appendChild(tb);

  });

});
