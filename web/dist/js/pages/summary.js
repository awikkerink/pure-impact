/*
* Author: Abdullah A Almsaeed (Modified by Kevin Willms)
* Date: 4 Jan 2014 (modified on Aug. 5, 2016)
* Description:
*      Data pull for main dashboard index.html
*/

$(function () {
  "use strict";
  var City = getParameterByName("City")
  // if (City == null){ City = geoplugin_city(); console.log(City)}
  if (City == null){ City = "WATERLOO" }
  console.log(City)
  var Province = geoplugin_region()
  if (Province == null){ Province = geoplugin_city(); console.log(Province)}

  $('#heading').text("Where Are The Churches in " + City + "?"); //Take most recent value

  var graphCount = 0;
  var graphTotal = 1;

  //PopulateGraphMonthly(36, 30, 0, false, 2, '/api/churchAttendance?months=36', '', 'churchAttendance', '', 0, 'line', '', 'CB15', function(cb){ graphCount++ })

  PopulatePieGraph('/api/religionBreakdown', 'religionBreakdown', '', 0, 'religion', 'value', 'doughnut', 'CB15', '')
  PopulatePieGraph('/api/religionDenomationBreakdown', 'religionDenomationBreakdown', '', 0, 'denomination', 'value', 'pie', 'CB15', '')

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

  $.get('/api/churchProvince?Province=' + Province, function (res) {
    $('#numChurchProvince').text(numberWithCommas(res[0].count));
  });
  $.get('/api/churchCity?City=' + City, function (res) {
    $('#numChurchCity').text(numberWithCommas(res[0].count));
  });
  $.get('/api/religionBreakdown?City=' + City, function (res) {
    $('#largestFaith').text(res[0].religion + " - " + numberWithCommas(res[0].value));
    $('#smallestFaith').text(res[res.length-1].religion + " - " + numberWithCommas(res[res.length -1].value));
  });
});
