const querystring = require('querystring');
const path = require('path');
var express = require ('express');
var sql = require('mssql');
var url = require('url');
var fs = require('fs');
var pg = require('pg');

var config = require('./config.js');

var app = express();
var apiRoutes = express.Router();

function querydb(query, config, cbvalues) {
  var conString = "postgres://" + config.user + ":" + config.password + "@" + config.server + ":" + config.port + "/" + config.database;

  var client = new pg.Client(conString);

  // connect to our database
  client.connect(function (err) {
    if (err) throw err;

    // execute a query on our database
    client.query(query, function (err, result) {
      if (err) throw err;
      cbvalues(result.rows);

      client.end(function (err) {
        if (err) throw err;
      });
    });
  });
}

apiRoutes.use('/church',function (req, res, next) {
  var queryData = url.parse(req.url, true).query;
  var query = "SELECT * FROM Church"
  querydb(query, config.church, function(cbvalues) {
    res.status(200).json(cbvalues);
  });
});

apiRoutes.use('/dates',function (req, res, next) {
  var queryData = url.parse(req.url, true).query;
  var query = "SELECT * from dates where date > (select now()::timestamp - cast('" + queryData.days + " days' as interval)) AND days < now() order by date"
  querydb(query, config.church, function(cbvalues) {
    res.status(200).json(cbvalues);
  });
});

apiRoutes.use('/months',function (req, res, next) {
  var queryData = url.parse(req.url, true).query;
  var query = "SELECT month as date from months where month > (select now()::timestamp - cast('" + queryData.months + " months' as interval)) AND month < now() order by month"
  querydb(query, config.church, function(cbvalues) {
    res.status(200).json(cbvalues);
  });
});

/////////////////////////////////////////////////////////

apiRoutes.use('/churchProvince',function (req, res, next) {
  var queryData = url.parse(req.url, true).query;
  var query = "SELECT COUNT(*) as count FROM Church where Province = 'ON'"
  querydb(query, config.church, function(cbvalues) {
    res.status(200).json(cbvalues);
  });
});

apiRoutes.use('/churchCity',function (req, res, next) {
  var queryData = url.parse(req.url, true).query;
  var query = "SELECT COUNT(*) as count FROM Church where City = 'OTTAWA'"
  querydb(query, config.church, function(cbvalues) {
    res.status(200).json(cbvalues);
  });
});

apiRoutes.use('/churchType',function (req, res, next) {
  var queryData = url.parse(req.url, true).query;
  var query = "SELECT COUNT(*) as count FROM Church where City = 'OTTAWA'"
  querydb(query, config.church, function(cbvalues) {
    res.status(200).json(cbvalues);
  });
});

apiRoutes.use('/churchAttendance',function (req, res, next) { ///fake
  var queryData = url.parse(req.url, true).query;
  var query = "SELECT EXTRACT(year from date) || '-' || EXTRACT(month from date) as date, EXTRACT(year from date) as year, EXTRACT(month from date) as month, value \
                FROM churchattendance \
                WHERE date > (select now()::timestamp - cast('" + queryData.months + " months' as interval)) \
                order by EXTRACT(year from date), EXTRACT(month from date)"
  querydb(query, config.church, function(cbvalues) {
    res.status(200).json(cbvalues);
  });
});

apiRoutes.use('/religionBreakdown',function (req, res, next) {
  var queryData = url.parse(req.url, true).query;
  var query = 'SELECT religion, SUM(total) as value FROM "religionByArea" group by religion'
  querydb(query, config.church, function(cbvalues) {
    res.status(200).json(cbvalues);
  });
});

apiRoutes.use('/universityByRegion',function (req, res, next) {
  var queryData = url.parse(req.url, true).query;
  var query = 'SELECT "Region", COUNT(*) as value FROM p2cdata \
                GROUP by "Region"'
  querydb(query, config.church, function(cbvalues) {
    res.status(200).json(cbvalues);
  });
});

apiRoutes.use('/studentsByRegion',function (req, res, next) {
  var queryData = url.parse(req.url, true).query;
  var query = 'SELECT "Region", SUM("Students") as valuee FROM p2cdata \
                GROUP by "Region"'
  querydb(query, config.church, function(cbvalues) {
    res.status(200).json(cbvalues);
  });
});

apiRoutes.use('/studentsByUniversity',function (req, res, next) {
  var queryData = url.parse(req.url, true).query;
  var query = 'SELECT "University", SUM("Students") as value FROM p2cdata \
                where "Students" > 0 \
                GROUP by "University"'
  querydb(query, config.church, function(cbvalues) {
    res.status(200).json(cbvalues);
  });
});

apiRoutes.use('/religionDemographicBreakdown',function (req, res, next) {
  var queryData = url.parse(req.url, true).query;
  var query = "SELECT denomination, SUM(total) as value FROM \"religionByArea\" WHERE religion = 'Christian' group by denomination"
  querydb(query, config.church, function(cbvalues) {
    res.status(200).json(cbvalues);
  });
});

app.use(express.static('./web'));

app.use('/api', apiRoutes);

app.listen(config.port, function(server) {
  console.log('Listening');
});
