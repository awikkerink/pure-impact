/*
* Author: Abdullah A Almsaeed (Modified by Kevin Willms)
* Date: 4 Jan 2014 (modified on Aug. 5, 2016)
* Description:
*      Data pull for main dashboard index.html
*/

$(function () {
  "use strict";

  $('#heading').text("Where Are The Churches?"); //Take most recent value

  var graphCount = 0;
  var graphTotal = 0;

  //PopulateGraphDaily(365, 1, true, 2, '/api/churchAttendance', '', 'churchAttendance', '', 0, 'line', '', 'CB15', function(cb){ graphCount++ })
  //PopulateGraphDaily(365, 1, true, 2, '/api/stats/logins/bydc?days=366', 'LocationName', 'COLOvsAWS', 'COLOvsAWSLegend', 0, 'line', '', 'CB15', function(cb){ graphCount++ })
  PopulateGraphMonthly(36, 30, 0, false, 2, '/api/churchAttendance?months=36', '', 'churchAttendance', '', 0, 'line', '', 'CB15', function(cb){ graphCount++ })

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
  // $.get('/api/churchType' + document.location.search, function (res) {
  //   $('#numChurchLeast').text(numberWithCommas(res[0].count));
  //   $('#numChurchMost').text(numberWithCommas(res[res.length -1].count));
  // });


  //-----------------
  //- SPARKLINE BAR -
  //-----------------
  // $.get('/api/churchProvince' , function (res) {
  //   /* jVector Maps
  //   * ------------
  //   * Create a world map with markers
  //   */
  //   var dcs = [
  //     {latLng: [43.60, -81.53], name: 'Cogeco', style: {fill: 'rgba(160,208,224,0.5)', r:5}, value: numberWithCommas(loginbydcXdays['Cogeco'])},
  //     {latLng: [43.64, -77.41], name: 'Bell', style: {fill: 'rgba(160,208,224,0.5)', r:5}, value: numberWithCommas(loginbydcXdays['Bell'])},
  //     {latLng: [-33.91, 151.19], name: 'Sydney', style: {fill: 'rgba(160,208,224,0.5)', r:5}, value: numberWithCommas(loginbydcXdays['Sydney'])},
  //     {latLng: [53.35, -6.26], name: 'AWS - EMEA', style: {fill: 'rgba(0,166,90,0.5)', r:5}, value: numberWithCommas(loginbydcXdays['AWS - EMEA'])},
  //     {latLng: [1.34, 103.83], name: 'AWS - Singapore', style: {fill: 'rgba(0,166,90,0.5)', r:5}, value: numberWithCommas(loginbydcXdays['AWS - Singapore'])},
  //     {latLng: [38.89, -77.42], name: 'AWS - US2', style: {fill: 'rgba(0,166,90,0.5)', r:5}, value: numberWithCommas(loginbydcXdays['AWS - US2'])},
  //   ];
  //
  //   $('#world-map-markers').vectorMap({
  //     map: 'world_mill_en',
  //     normalizeFunction: 'polynomial',
  //     hoverOpacity: 0.7,
  //     hoverColor: false,
  //     backgroundColor: 'transparent',
  //     regionStyle: {
  //       initial: {
  //         fill: 'rgba(210, 214, 222, 1)',
  //         "fill-opacity": 1,
  //         stroke: 'none',
  //         "stroke-width": 0,
  //         "stroke-opacity": 1
  //       },
  //       hover: {
  //         "fill-opacity": 0.7,
  //         cursor: 'pointer'
  //       },
  //       selected: {
  //         fill: 'yellow'
  //       },
  //       selectedHover: {}
  //     },
  //     markerStyle: {
  //       initial: {
  //         fill: '#00a65a',
  //         stroke: '#111'
  //       }
  //     },
  //     markers: dcs.map(function(h){ return {name: h.name+' - '+ h.value, latLng: h.latLng, style: h.style, r: h.r} })
  //   });
  // });
});
