
'use strict';
var Trip     = require('../models/trip'),
    moment   = require('moment'),
    mp       = require('multiparty');

exports.init = function(req, res){
  res.render('trips/new');
};

/* exports.create = function(req, res){ // old .create function before adding photo
  Trip.create(req.body, function(){
    console.log(req.body);
    res.redirect('/trips');
  });
}; */

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    console.log('THIS IS FIELDS', fields);
    console.log('THIS IS FILES', files);
    Trip.create(fields, files, function(){
      res.redirect('/trips');
    });
  });
};

exports.index = function(req, res){
  Trip.all(function(err, trips){
    res.render('trips/index', {trips:trips, moment:moment});
  });
};

exports.show = function(req, res){
  Trip.findById(req.params.id, function(trip){
    console.log('CONSOLE REQ PARAMS IS', req.params.id);
    res.render('trips/show', {trip:trip});
  });
};


