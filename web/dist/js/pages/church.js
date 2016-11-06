/*
* Author: Abdullah A Almsaeed (Modified by Kevin Willms)
* Date: 4 Jan 2014 (modified on Aug. 5, 2016)
* Description:
*      Data pull for main dashboard index.html
*/

$(function () {
  "use strict";
  var Church = getParameterByName(name)
  if (Church == null){ Church = "Joyfully Abundant Community Church"}
  $('#heading').text(Church); //Take most recent value


  var graphCount = 0;
  var graphTotal = 1;

  PopulateGraphMonthly(36, 30, 0, false, 2, '/api/churchAttendance?months=36', '', 'churchAttendance', '', 0, 'line', '', 'CB15', function(cb){ graphCount++ })

  //PopulatePieGraph('/api/religionBreakdown', 'religionBreakdown', '', 0, 'religion', 'value', 'doughnut', 'CB15', '')

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

  $.get('/api/churchAttendance?months=36', function (res) {
    $('#attendanceLastWeek').text(numberWithCommas(res[res.length - 1].value));
  });

  $.get('/api/churchAttendanceAverage?months=36', function (res) {
    $('#attendanceAverage').text(parseFloat(numberWithCommas(res[0].value), 0));
  });

  $.get('/api/religionBreakdown', function (res) {
    $('#givingLastWeek').text("$" + numberWithCommas(res[0].value) + ".45");
    $('#givingAverage').text("$" + numberWithCommas(res[res.length -2].value) + ".22");
  });
});
