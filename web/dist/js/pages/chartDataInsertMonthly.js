function updateDataset(target) {
  label = target[0].outerText
  legendName = target[0].parentNode.parentNode.id
  var exists = false;
  for (var i = 0; i < window[legendName].store.length; i++) {
    if (window[legendName].store[i][0] === label) {
      exists = true;
      window[legendName].data.datasets.push(window[legendName].store.splice(i, 1)[0][1]);
      target.fadeTo("fast", 1);
    }
  }
  if (!exists) {
    for (var i = 0; i < window[legendName].data.datasets.length; i++) {
      if (window[legendName].data.datasets[i].label === label) {
        window[legendName].store.push([label, window[legendName].data.datasets.splice(i, 1)[0]]);
        target.fadeTo("fast", 0.33);
      }
    }
  }
  window[legendName].update();
}

function hideAll(legendName){
  $("#" + legendName).find("li").each( function() {
    if (this.style.opacity != .33){
      updateDataset($(this))
    }
  });
}

function showAll(legendName){
  $("#" + legendName).find("li").each( function() {
    if (this.style.opacity == .33){
      updateDataset($(this))
    }
  });
}

var GetGraphData = function(months, todayLessXDays, ifBlank, apiRoute, split, toFixed, type, palette, cbvalues, dateLabels) {
  var dateLabels = []
  var getDate = function (dateLabelList) {
    var currentDate = new Date()
    var dateLessXDays = new Date()
    dateLessXDays.setDate(dateLessXDays.getDate()-todayLessXDays);
    var monthDiff = currentDate.getMonth() - dateLessXDays.getMonth()
    if (monthDiff < 0){
      monthDiff = 1
    }
    $.get('/api/months?months=' + months, function (res) {
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      for (var i = 0; i < res.length - monthDiff; i++){
        var date = res[i].date
        var dateformatted = monthNames[parseInt(date.split('-')[1]) - 1] + " " + date.split('-')[0]
        dateLabels.push(dateformatted)
        if (res.length - monthDiff - 1 == i){
          dateLabelList(dateLabels)
        }
      }
    });
  };

  $.get(apiRoute, function (res) {
    getDate(function(dateLabelList) {
      var DataGroup = new Array;
      var PLarge = ["rgb(0,95,57)","rgb(0,255,0)","rgb(149,0,58)","rgb(1,0,103)","rgb(213,255,0)","rgb(255,0,86)","rgb(158,0,142)","rgb(14,76,161)","rgb(255,229,2)","rgb(0,0,0)","rgb(255,147,126)","rgb(164,36,0)","rgb(0,21,68)","rgb(145,208,203)","rgb(98,14,0)","rgb(107,104,130)","rgb(0,0,255)","rgb(0,125,181)","rgb(106,130,108)","rgb(0,174,126)","rgb(194,140,159)","rgb(190,153,112)","rgb(0,143,156)","rgb(95,173,78)","rgb(255,0,0)","rgb(255,0,246)","rgb(255,2,157)","rgb(104,61,59)","rgb(255,116,163)","rgb(150,138,232)","rgb(152,255,82)","rgb(167,87,64)","rgb(1,255,254)","rgb(219, 211, 208)","rgb(254,137,0)","rgb(189,198,255)","rgb(1,208,255)","rgb(187,136,0)","rgb(117,68,177)","rgb(165,255,210)","rgb(255,166,254)","rgb(119,77,0)","rgb(122,71,130)","rgb(38,52,0)","rgb(0,71,84)","rgb(67,0,44)","rgb(181,0,255)","rgb(255,177,103)","rgb(255,219,102)","rgb(144,251,146)","rgb(126,45,210)","rgb(189,211,147)","rgb(229,111,254)","rgb(222,255,116)","rgb(0,255,120)","rgb(0,155,255)","rgb(0,100,1)","rgb(0,118,255)","rgb(133,169,0)","rgb(0,185,23)","rgb(120,130,49)","rgb(0,255,198)","rgb(255,110,65)","rgb(232,94,190)"]
      var PLargeA = ["rgba(0,95,57,0)","rgba(0,255,0,0)","rgba(149,0,58,0)","rgba(1,0,103,0)","rgba(213,255,0,0)","rgba(255,0,86,0)","rgba(158,0,142,0)","rgba(14,76,161,0)","rgba(255,229,2,0)","rgba(0,0,0,0)","rgba(255,147,126,0)","rgba(164,36,0,0)","rgba(0,21,68,0)","rgba(145,208,203,0)","rgba(98,14,0,0)","rgba(107,104,130,0)","rgba(0,0,255,0)","rgba(0,125,181,0)","rgba(106,130,108,0)","rgba(0,174,126,0)","rgba(194,140,159,0)","rgba(190,153,112,0)","rgba(0,143,156,0)","rgba(95,173,78,0)","rgba(255,0,0,0)","rgba(255,0,246,0)","rgba(255,2,157,0)","rgba(104,61,59,0)","rgba(255,116,163,0)","rgba(150,138,232,0)","rgba(152,255,82,0)","rgba(167,87,64,0)","rgba(1,255,254,0)","rgba(219, 211, 208,0)","rgba(254,137,0,0)","rgba(189,198,255,0)","rgba(1,208,255,0)","rgba(187,136,0,0)","rgba(117,68,177,0)","rgba(165,255,210,0)","rgba(255,166,254,0)","rgba(119,77,0,0)","rgba(122,71,130,0)","rgba(38,52,0,0)","rgba(0,71,84,0)","rgba(67,0,44,0)","rgba(181,0,255,0)","rgba(255,177,103,0)","rgba(255,219,102,0)","rgba(144,251,146,0)","rgba(126,45,210,0)","rgba(189,211,147,0)","rgba(229,111,254,0)","rgba(222,255,116,0)","rgba(0,255,120,0)","rgba(0,155,255,0)","rgba(0,100,1,0)","rgba(0,118,255,0)","rgba(133,169,0,0)","rgba(0,185,23,0)","rgba(120,130,49,0)","rgba(0,255,198,0)","rgba(255,110,65,0)","rgba(232,94,190)"]
      var PColourBlindFriendly15 = ["rgb(255,182,119)","rgb(73,0,146)","rgb(182,109,255)","rgb(109,182,255)","rgb(182,219,255)","rgb(0,0,0)","rgb(146,0,0)","rgb(0,73,73)","rgb(0,146,146)","rgb(255,109,182)","rgb(146,73,0)","rgb(219,209,0)","rgb(36,255,36)","rgb(255,255,109)","rgb(0,109,219)"]
      var PColourBlindFriendly15A = ["rgba(255,182,119,0)","rgba(73,0,146,0)","rgba(182,109,255,0)","rgba(109,182,255,0)","rgba(182,219,255,0)","rgba(0,0,0,0)","rgba(146,0,0,0)","rgba(0,73,73,0)","rgba(0,146,146,0)","rgba(255,109,182,0)","rgba(146,73,0,0)","rgba(219,209,0,0)","rgba(36,255,36,0)","rgba(255,255,109,0)","rgba(0,109,219,0)"]
      var PColourBlindFriendly4R = ["rgb(122,1,119)","rgb(197,27,138)","rgb(247,104,161)","rgb(251,180,185)"]
      var PColourBlindFriendly4RA = ["rgba(122,1,119,0)","rgba(197,27,138,0)","rgba(247,104,161,0)","rgba(251,180,185,0)"]
      var PColourBlindFriendly4G = ["rgb(0,104,55)","rgb(49,163,84)","rgb(120,198,121)","rgb(194,230,153)"]
      var PColourBlindFriendly4GA = ["rgba(0,104,55,0)","rgba(49,163,84,0)","rgba(120,198,121,0)","rgba(194,230,153,0)"]
      var PColourBlindFriendly4B = ["rgb(37,52,148)","rgb(44,127,184)","rgb(65,182,196)","rgb(161,218,180)"]
      var PColourBlindFriendly4BA = ["rgba(37,52,148,0)","rgba(44,127,184,0)","rgba(65,182,196,0)","rgba(161,218,180,0)"]
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var RGBArray = PLarge
      var RGBAArray = PLargeA
      if (palette == 'CB15'){
        RGBArray = PColourBlindFriendly15
        RGBAArray = PColourBlindFriendly15A
      }
      else if (palette == 'CB4R'){
        RGBArray = PColourBlindFriendly4R
        RGBAArray = PColourBlindFriendly4RA
      }
      else if (palette == 'CB4G'){
        RGBArray = PColourBlindFriendly4G
        RGBAArray = PColourBlindFriendly4GA
      }
      else if (palette == 'CB4B'){
        RGBArray = PColourBlindFriendly4B
        RGBAArray = PColourBlindFriendly4BA
      }
      var Groups = new Array;
      var DateIndex = 0;
      var DataSet = new Array;
      var RGBIndex = 0;

      var d = new Date()
      d.setDate(d.getDate()-todayLessXDays);
      var enddate = monthNames[d.getMonth()] + " " + d.getFullYear()
      for (var i = 0; i < res.length; i++) {
        var Group = res[i][split]
        if (i == 0){ Groups.push(Group)}
        if (Groups.indexOf(Group) == -1){
          while (dateLabelList[DateIndex - 1] != enddate){
            if (DateIndex > 100){ break;}
            if (typeof DataSet[DateIndex] === 'undefined'){
              DataSet[DateIndex] = ifBlank
            }
            DateIndex++;
          }
          //When group value of next line is different than all previous lines (aka. Previous Locs data is done), push data.
          if (type == 'bar'){
            DataGroup.push({
              label: res[i-1][split],
              backgroundColor: RGBArray[RGBIndex], // NOTE The lack of "A" in "RGB" Array.
              borderColor: RGBArray[RGBIndex],
              data: DataSet
            });
          }
          else {
            DataGroup.push({
              label: res[i-1][split],
              backgroundColor: RGBAArray[RGBIndex], // NOTE The "A" in "RGBA" Array.
              borderColor: RGBArray[RGBIndex],
              data: DataSet
            });
          }
          TotalCost = []
          DataSet = []
          RGBIndex++;
          if (RGBIndex == RGBArray.length){
            RGBIndex = 0
          }
          Groups.push(Group)
          DateIndex = 0;
        }

        var date = res[i]['date']
        var datesplit = date.split('-')
        var year = datesplit[0]
        var month = monthNames[datesplit[1] - 1]
        if (month.substring(0,1) == 0){
          month = month.substring(1,2)
        }

        var dateformatted = month + " " + year
        if (dateLabelList[DateIndex] != dateformatted ) {
          if (DateIndex > 100){ break;}
          if (typeof DataSet[DateIndex] === 'undefined'){
            DataSet[DateIndex] = ifBlank
          }
          DateIndex++
          i--
          continue;
        } else {
          if (res[i].value == null){
            DataSet[DateIndex] = ifBlank
          }
          else {
            if (res[i].value == null){
              DataSet[DateIndex] = ifBlank
            }
            else {
              DataSet[DateIndex] = parseFloat(res[i].value).toFixed(toFixed)
            }
          }
        }
        if (i == res.length -1){
          while (dateLabelList[DateIndex] != enddate){
            if (DateIndex > 100){ break;}
            if (typeof DataSet[DateIndex] === 'undefined'){
              DataSet[DateIndex] = ifBlank
            }
            DateIndex++;
          }
          if (typeof DataSet[DateIndex] === 'undefined'){
            DataSet[DateIndex] = ifBlank
          }
          else {
            if (res[i].value == null){
              DataSet[DateIndex] = ifBlank
            }
            else {
              DataSet[DateIndex] = parseFloat(res[i].value).toFixed(toFixed)
            }
          }
          if (type == 'bar'){
            DataGroup.push({
              label: res[i-1][split],
              backgroundColor: RGBArray[RGBIndex], // NOTE The lack of "A" in "RGB" Array.
              borderColor: RGBArray[RGBIndex],
              data: DataSet
            });
          }
          else {
            DataGroup.push({
              label: res[i-1][split],
              backgroundColor: RGBAArray[RGBIndex], // NOTE The "A" in "RGBA" Array.
              borderColor: RGBArray[RGBIndex],
              data: DataSet
            });
          }
          //Return all results when at the end
          cbvalues(DataGroup, dateLabels)
        }
        DateIndex++;
      }
    });
  });
}

var PopulateGraphMonthly = function(months, todayLessXDays, ifBlank, ticksAt0, lineThinkness, apiRoute, split, chartId, legendId, toFixed, type, stacked, palette, cb){
  GetGraphData(months, todayLessXDays, ifBlank, apiRoute, split, toFixed, type, palette, function(cbvalues, dateLabels) {
    var scalesOptions = "{}"
    if (stacked == 'stacked'){
      stacked = true
    }
    else {
      stacked = false
    }
    // This will get the first returned node in the jQuery collection.

    var ChartOptions = {
      //Boolean - Add options for scales
      scales: {
        xAxes: [{
          stacked: stacked,
          ticks: {
                    beginAtZero:ticksAt0
                }
        }],
        yAxes: [{
          ticks: {
                    beginAtZero:ticksAt0
                }
        }]
      },
      //Boolean - If we should show the scale at all
      showScale: true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: true,
      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.02)",
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,
      //Boolean - Whether to show a dot for each point
      pointDot: true,
      capBezierPoints: true,
      legend: {
        display: false,
      },
      legendCallback: function(chart) {
                var text = [];
                text.push('<ul>');
                for (var i=0; i<chart.data.datasets.length; i++) {
                    text.push('<li class=\"chart-legend-item\">');
                    text.push('<span style="background-color:' + chart.data.datasets[i].borderColor + '"></span>' + chart.data.datasets[i].label);

                    text.push('</li>');
                }
                text.push('</ul>');
                return text.join("");
            },
      tension: 0.0,
      //Number - Radius of each point dot in pixels
      pointDotRadius: 1,
      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 0,
      //Boolean - Whether to show a stroke for datasets
      datasetStroke: true,
      //Number - Pixel width of dataset stroke
      elements: {
        line : {
          tension: 0.15,
          borderWidth: lineThinkness
        },
        point : {
          radius : 1,
          hitRadius: 200 / months
        }
      },
      tooltips: {
        mode: 'label',
        callbacks: {
          label: function(tooltipItem, data) {
            var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || "Value";
            var label = tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return datasetLabel + ' : ' + label;
          }
        }
      },
      scaleLabel: function(label){return label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");},
      //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio: true,
      //Boolean - whether to make the chart responsive to window resizing
      responsive: true
    };

    var ChartCanvas = $("#" + chartId).get(0).getContext("2d");

    var ChartData = {
      type: type,
      data: {
        labels: dateLabels,
        datasets: cbvalues
      },
      options: ChartOptions
    };
    window[legendId] = new Chart(ChartCanvas, ChartData);

    if (cbvalues.length > 1){
      document.getElementById(legendId).innerHTML = window[legendId].generateLegend();
      window[legendId].store = new Array();
    }
    else {
      window[legendId].generateLegend();
    }
    cb()
  });
}
