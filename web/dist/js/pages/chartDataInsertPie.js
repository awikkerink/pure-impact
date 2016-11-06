/*function PieupdateDataset(target) {
  label = target[0].outerText
  legendName = target[0].parentNode.parentNode.id
  console.log(window[legendName])
  var exists = false;
  for (var i = 0; i < window[legendName].store.length; i++) {
    if (window[legendName].store[i][0] === label) {
      exists = true;
      window[legendName].data.datasets[0].data.push(window[legendName].store.splice(i, 1)[0][1]);
      window[legendName].data.labels.push(label)
      target.fadeTo("fast", 1);
    }
  }
  if (!exists) {
    for (var i = 0; i < window[legendName].data.datasets[0].data.length; i++) {
      if (window[legendName].data.labels[i] === label) {
        window[legendName].store.push([window[legendName].data.labels.splice(i, 1)[0], window[legendName].data.datasets[0].data.splice(i, 1)[0]]);

        target.fadeTo("fast", 0.33);
        console.log(window[legendName])
      }
    }
  }
  window[legendName].update();
}

function PiehideAll(legendName){
  $("#" + legendName).find("li").each( function() {
    if (this.style.opacity != .33){
      PieupdateDataset($(this))
    }
  });
}

function PieshowAll(legendName){
  $("#" + legendName).find("li").each( function() {
    if (this.style.opacity == .33){
      PieupdateDataset($(this))
    }
  });
}*/

var GetPieGraphData = function(apiRoute, toFixed, split, value, type, palette, cbvalues) {
  $.get(apiRoute, function (res) {
    var Data = new Array;
    var Labels = new Array;

    for (var i = 0; i < res.length; i++) {
      Labels.push(res[i][split]);
      Data.push(res[i][value].toFixed(toFixed));
      if (Data.length == res.length){
        cbvalues(Data, Labels)
      }
    }
  });
}

var PopulatePieGraph = function(apiRoute, chartId, legendId, toFixed, last, split, value, type, palette, unit){
  GetPieGraphData(apiRoute, toFixed, split, value, type, palette, function(cbData, cbLabels) {

    var pieOptions = {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke: true,
      //String - The colour of each segment stroke
      segmentStrokeColor: "#fff",
      //Number - The width of each segment stroke
      segmentStrokeWidth: 2,
      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout: 50, // This is 0 for Pie charts
      //Number - Amount of animation steps
      animationSteps: 100,
      //String - Animation easing effect
      animationEasing: "easeOutBounce",
      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate: true,
      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale: false,
      //Boolean - whether to make the chart responsive to window resizing
      responsive: true,
      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio: true,
      //String - A legend template
      tooltips: {
        callbacks: {
          label : function(tooltipItem, data) { return data.labels[tooltipItem.index] + ": " + data.datasets[0].data[tooltipItem.index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + unit;}
        }
      },
      legend: {
        display: true,
      }
      // legendCallback: function(chart) {
      //   var text = [];
      //   text.push('<ul>');
      //   for (var i=0; i<chart.data.datasets[0].data.length; i++) {
      //       text.push('<li class=\"chart-legend-item\">');
      //       //console.log(chart.data.datasets[i].backgroundColor)
      //       text.push('<span style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '"></span>' + chart.data.labels[i]);
      //
      //       text.push('</li>');
      //   }
      //   text.push('</ul>');
      //   return text.join("");
      // },
    };

    var PLarge = ["rgb(0,95,57)","rgb(0,255,0)","rgb(149,0,58)","rgb(1,0,103)","rgb(213,255,0)","rgb(255,0,86)","rgb(158,0,142)","rgb(14,76,161)","rgb(255,229,2)","rgb(0,0,0)","rgb(255,147,126)","rgb(164,36,0)","rgb(0,21,68)","rgb(145,208,203)","rgb(98,14,0)","rgb(107,104,130)","rgb(0,0,255)","rgb(0,125,181)","rgb(106,130,108)","rgb(0,174,126)","rgb(194,140,159)","rgb(190,153,112)","rgb(0,143,156)","rgb(95,173,78)","rgb(255,0,0)","rgb(255,0,246)","rgb(255,2,157)","rgb(104,61,59)","rgb(255,116,163)","rgb(150,138,232)","rgb(152,255,82)","rgb(167,87,64)","rgb(1,255,254)","rgb(219, 211, 208)","rgb(254,137,0)","rgb(189,198,255)","rgb(1,208,255)","rgb(187,136,0)","rgb(117,68,177)","rgb(165,255,210)","rgb(255,166,254)","rgb(119,77,0)","rgb(122,71,130)","rgb(38,52,0)","rgb(0,71,84)","rgb(67,0,44)","rgb(181,0,255)","rgb(255,177,103)","rgb(255,219,102)","rgb(144,251,146)","rgb(126,45,210)","rgb(189,211,147)","rgb(229,111,254)","rgb(222,255,116)","rgb(0,255,120)","rgb(0,155,255)","rgb(0,100,1)","rgb(0,118,255)","rgb(133,169,0)","rgb(0,185,23)","rgb(120,130,49)","rgb(0,255,198)","rgb(255,110,65)","rgb(232,94,190)"]
    var PColourBlindFriendly15 = ["rgb(255,182,119)","rgb(73,0,146)","rgb(182,109,255)","rgb(109,182,255)","rgb(182,219,255)","rgb(0,0,0)","rgb(146,0,0)","rgb(0,73,73)","rgb(0,146,146)","rgb(255,109,182)","rgb(146,73,0)","rgb(219,209,0)","rgb(36,255,36)","rgb(255,255,109)","rgb(0,109,219)"]
    var PColourBlindFriendly4R = ["rgb(122,1,119)","rgb(197,27,138)","rgb(247,104,161)","rgb(251,180,185)"]
    var PColourBlindFriendly4G = ["rgb(0,104,55)","rgb(49,163,84)","rgb(120,198,121)","rgb(194,230,153)"]
    var PColourBlindFriendly4B = ["rgb(37,52,148)","rgb(44,127,184)","rgb(65,182,196)","rgb(161,218,180)"]
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var RGBArray = PLarge
    if (palette == 'CB15'){
      RGBArray = PColourBlindFriendly15
    }
    else if (palette == 'CB4R'){
      RGBArray = PColourBlindFriendly4R
    }
    else if (palette == 'CB4G'){
      RGBArray = PColourBlindFriendly4G
    }
    else if (palette == 'CB4B'){
      RGBArray = PColourBlindFriendly4B
    }

    var PieChartCanvas = $("#" + chartId).get(0).getContext("2d");


    var PieChartData = {
      type: type,
      data: {
        labels: cbLabels,
        datasets: [{
          data: cbData,
          backgroundColor : RGBArray,
          hoverBackgroundColor : RGBArray
        }]
      },
      options: pieOptions
    };

    window[legendId] = new Chart(PieChartCanvas, PieChartData);

    // if (cbData.length > 1){
    //   document.getElementById(legendId).innerHTML = window[legendId].generateLegend();
    //   //window[legendId].store = new Array();
    // }
    // else {
    //   window[legendId].generateLegend();
    // }

/*
    if (last){
      PiedefineLegendClickAction()
    }
    */
 });
}
/*
var PiedefineLegendClickAction = function () {
 $(".piechart-legend-item").click(function(){
   PieupdateDataset($(this))
 });
}
*/
