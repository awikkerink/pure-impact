$(function () {
  "use strict";

  $('#heading').text("Search");
  apiGetRequest('/api/search/text' + document.location.search , function (res) {

    var table = document.getElementById("churchSearchResult");
    var tb = document.createElement('tbody');
    for (var i = 0; i < res.length; i++) {
      var tr = tb.appendChild (document.createElement('tr'));
      //populate row data
      var Instance = tr.appendChild( document.createElement('td') );
      var Orgs = tr.appendChild( document.createElement('td') );
      var DataCenter = tr.appendChild( document.createElement('td') );
      var Client = tr.appendChild( document.createElement('td') );

      tr.cells[0].innerHTML = '<a href="/pages/instance.html?instance=' + res[i]['Instance'] + '"><b>' + res[i]['Instance'] + '</b>'

      var OrgArray = res[i]['Orgs'].split(',');
      for (var j = 0; j < OrgArray.length; j++) {
        var mod = j % 6;
        var colour = "blue";
        if (mod == 0) colour = "blue";
        else if (mod == 1) colour = "green";
        else if (mod == 2) colour = "yellow";
        else if (mod == 3) colour = "orange";
        else if (mod == 4) colour = "red";
        else if (mod == 5) colour = "purple";
        tr.cells[1].innerHTML += '<span class="badge bg-' + colour + '"><a style="color:white" href="/pages/org.html?instance=' + res[i]['Instance'] +  '&org='+ OrgArray[j] + '">'+ OrgArray[j] + '</span>'
      }

      tr.cells[2].innerHTML = '<b>' + res[i]['Datacenter'] + '</b>'
      //tr.cells[3].innerHTML = '<a href="/pages/client.html?client=' + res[i]['ClientName'] + '"><b>' + res[i]['ClientName'] + '</b>'
      var ClientArray = res[i]['Clients'].split(',');
      for (var j = 0; j < ClientArray.length; j++) {
        var mod = j % 6;
        var colour = "blue";
        if (mod == 0) colour = "blue";
        else if (mod == 1) colour = "green";
        else if (mod == 2) colour = "yellow";
        else if (mod == 3) colour = "orange";
        else if (mod == 4) colour = "red";
        else if (mod == 5) colour = "purple";
        if (ClientArray[j] != ''){
          tr.cells[3].innerHTML += '<span class="badge bg-' + colour + '"><a style="color:white" href="/pages/client.html?client=' + ClientArray[j] + '">'+ ClientArray[j] + '</span>'
        }
      }
      table.appendChild(tb);
    }
  });

});
