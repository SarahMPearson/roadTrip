'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash'),
    //cp    = require('child_process'),
    fs    = require('fs'),
    path  = require('path');

function Trip(o){
  this._id          = Mongo.ObjectID();
  this.tripName     = o.tripName;
  this.cash         = parseFloat(o.cash);
  this.start        = o.start;
  this.startLat     = parseFloat(o.startLat);
  this.startLng     = parseFloat(o.startLng);
  this.startD       = new Date(o.startD);
  this.end          = o.end;
  this.endLat       = parseFloat(o.endLat);
  this.endLng       = parseFloat(o.endLng);
  this.endD         = new Date(o.endD);
  this.distance     = parseFloat(o.distance);
  this.mpg          = parseInt(o.mpg);
  this.photo        = [];
  this.stops        = o.stops;
  this.stops        = _.compact(this.stops);
  this.gasCost      = parseFloat(o.gasCost);
  this.photo        = o.photo;
  this.events       = o.events;
}

Object.defineProperty(Trip, 'collection', {
  get: function(){return global.mongodb.collection('trips');}
});

Trip.all = function(cb){
  Trip.collection.find().toArray(cb);
};

Trip.create = function(fields, file, cb){
  var trip = new Trip(fields);
  trip.uploadPhoto(file);
  Trip.collection.save(trip, cb);
};

Trip.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Trip.collection.findOne({_id:_id}, function(err, object){
    var trip = changePrototype(object);
    cb(trip);
  });
};

Trip.prototype.uploadPhoto = function(files){
  var baseDir = __dirname + '/../static',
      relDir  = '/img/' + this._id,
      absDir  = baseDir + relDir;

  fs.mkdirSync(absDir);

  this.photo = files.photo.map(function(photo, index){
    if(!photo.size){return;}

    var ext      = path.extname(photo.path),
        name     = index + ext,
        absPath  = absDir + '/' + name,
        relPath  = relDir + '/' + name;

    fs.renameSync(photo.path, absPath);
    return relPath;
  });

  this.photo = _.compact(this.photo);
};

module.exports = Trip;

function changePrototype(object){
  return _.create(Trip.prototype, object);
}
