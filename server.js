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
      cbvalues(result.rows[0]);

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

app.use(express.static('./web'));

app.use('/api', apiRoutes);

app.listen(config.port);
