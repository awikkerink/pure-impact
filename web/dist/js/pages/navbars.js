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
  $("#header").html('<a href="/summary.html" class="logo"> \
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
      <li class="header">GLOBAL DATA</li> \
      <li> \
        <a href="/pages/demographic.html"> \
          <i class="fa fa-user"></i> <span>Demographic Data</span> \
        </a> \
      </li> \
      <li> \
        <a href="/pages/events.html"> \
          <i class="fa fa-asterisk"></i> <span>Events In Your City</span> \
        </a> \
      </li> \
      <li> \
        <a href="/pages/needs.html"> \
          <i class="fa fa-hand-paper-o"></i> <span>Needs In Your City</span> \
        </a> \
      </li> \
      <li> \
        <a href="/pages/churchCollab.html"> \
          <i class="fa fa-compress"></i> <span>Church Collab</span> \
        </a> \
      </li>';

  $("#sidebar").html(sidebar);


  $("#footer").html('<div style="float: left"><strong><a href="https://pureimpact.com">Pure Impact</a>.</strong></div><div style="text-align: right; float: right;"><strong>Connecting Churches and Data</strong></div><div style="clear: both"></div>');

});
