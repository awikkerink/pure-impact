function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getParameterByName(name, url) { // This is for getting a queryString item by simply providing the name (URL is automatically populated)
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function() {
  $("#header").html('<a href="/index.html" class="logo"> \
      <span class="logo-mini"><b>Pure Impact</b></span> \
      <span class="logo-lg">Pure<b>Impact</b></span> \
    </a> \
    <nav class="navbar navbar-static-top"> \
      <a href="" class="sidebar-toggle" data-toggle="offcanvas" role="button"> \
        <span class="sr-only">Toggle navigation</span> \
      </a> \
      <h4 style="text-align: center; color: white" id="heading"></h4> \
    </nav>');

  var sidebar = '<form action="/search.html" method="get" class="sidebar-form"> \
      <div class="input-group"> \
        <input type="text" id="searchValue" name="client" class="form-control" placeholder="Search..."> \
            <span class="input-group-btn"> \
              <button type="submit" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i> \
              </button> \
            </span> \
      </div> \
    </form> \
    <ul class="sidebar-menu"> \
      <li class="header">MAIN NAVIGATION</li> \
      <li> \
        <a href="/index.html"> \
          <i class="fa fa-home"></i> <span>Attendance</span> \
        </a> \
      </li> \
      <li> \
        <a href="/pages/hallOfFame.html"> \
          <i class="fa fa-dashboard"></i> <span>Giving</span> \
        </a> \
      </li> \
      <li> \
        <a href="/pages/calculator.html"> \
          <i class="fa fa-calculator"></i> <span>Demographic</span> \
        </a> \
      </li> \
      <li> \
        <a href="/pages/calculator.html"> \
          <i class="fa fa-calculator"></i> <span>Events</span> \
        </a> \
      </li> \
      <li> \
        <a href="/pages/calculator.html"> \
          <i class="fa fa-calculator"></i> <span>Needs</span> \
        </a> \
      </li>';

  $("#sidebar").html(sidebar);


  $("#footer").html('<div style="float: left"><strong><a href="https://pureimpact.com">Pure Impact</a>.</strong></div><div style="text-align: right; float: right;"><strong>Connecting Churches and Data</strong></div><div style="clear: both"></div>');

});
