/*
* Author: Abdullah A Almsaeed (Modified by Kevin Willms)
* Date: 4 Jan 2014 (modified on Aug. 5, 2016)
* Description:
*      Data pull for main dashboard index.html
*/

$(function () {
  "use strict";

  $('#heading').text("Where Are The Churches in Kitchener?"); //Take most recent value

  var graphCount = 0;
  var graphTotal = 1;

  //PopulateGraphMonthly(36, 30, 0, false, 2, '/api/churchAttendance?months=36', '', 'churchAttendance', '', 0, 'line', '', 'CB15', function(cb){ graphCount++ })

  PopulatePieGraph('/api/religionBreakdown', 'religionBreakdown', '', 0, 'religion', 'value', 'doughnut', 'CB15', '')

  var areGraphsDone = function(){
    if (graphCount == graphTotal){
      $(".chart-legend-item").click(function(){
        updateDataset($(this))
      });
    }
    else {
      setTimeout(areGraphsDone , 250)
    }
  }

  setTimeout(areGraphsDone , 250)

  $.get('/api/churchProvince' + document.location.search, function (res) {
    $('#numChurchProvince').text(numberWithCommas(res[0].count));
  });
  $.get('/api/churchCity' + document.location.search, function (res) {
    $('#numChurchCity').text(numberWithCommas(res[0].count));
  });
   $.get('/api/religionBreakdown' + document.location.search, function (res) {
     console.log(res)
     $('#largestFaith').text(res[0].religion + " - " + numberWithCommas(res[0].value));
     $('#smallestFaith').text(res[res.length-1].religion + " - " + numberWithCommas(res[res.length -1].value));
   });
});
