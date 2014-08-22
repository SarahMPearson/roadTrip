'use strict';

exports.init = function(req, res){
  res.render('trips/new');
};

exports.create = function(req, res){
  console.log(req.body);
  //res.render('trips/index');
};


