/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Trip      = require('../../app/models/trip'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'template-test';

describe('Trip', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new trip object', function(){
      var o = {tripName: 'New York 2014', cash: '100', start: 'Denver', startLat:'41.65', startLng: '-71.87', startD: '8/23/2014', end: 'New York', endLat: '36.45', endLng: '-80.65', endD: '9/6/2014', mpg: '36', gasCost: '3.10'},
          t = new Trip(o);
      expect(t).to.be.instanceof(Trip);
      expect(t.tripName).to.equal('New York 2014');
      expect(t.cash).to.equal(100);
      expect(t.start).to.equal('Denver'),
      expect(t.startLat).to.equal(41.65);
      expect(t.startLng).to.equal(-71.87);
      expect(t.startD).to.be.instanceof(Date);
      expect(t.end).to.equal('New York');
      expect(t.endLat).to.equal(36.45);
      expect(t.endLng).to.equal(-80.65);
      expect(t.endD).to.be.instanceof(Date);
      expect(t.mpg).to.equal(36);
      expect(t.gasCost).to.equal(3.10);
    });
  });

  describe('.all', function(){
    it('should get all trips', function(done){
      Trip.all(function(err, trips){
        expect(trips).to.have.length(2);
        done();
      });
    });
  });
  describe('.create', function(){
    it('should create a new trip', function(done){
      var o = {tripName: 'New York 2014', cash: '100', start: 'Denver', startLat:'41.65', startLng: '-71.87', startD: '8/23/2014', end: 'New York', endLat: '36.45', endLng: '-80.65', endD: '9/6/2014', mpg: '36', gasCost: '3.10'};
      Trip.create(o, function(err, trip){
        expect(trip._id).to.be.instanceof(Mongo.ObjectID);
        expect(trip.tripName).to.equal('New York 2014');
        expect(trip.cash).to.equal(100);
        expect(trip.start).to.equal('Denver'),
        expect(trip.startLat).to.equal(41.65);
        expect(trip.startLng).to.equal(-71.87);
        expect(trip.startD).to.be.instanceof(Date);
        expect(trip.end).to.equal('New York');
        expect(trip.endLat).to.equal(36.45);
        expect(trip.endLng).to.equal(-80.65);
        expect(trip.endD).to.be.instanceof(Date);
        expect(trip.mpg).to.equal(36);
        expect(trip.gasCost).to.equal(3.10);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find one trip by its id', function(done){
      Trip.findById('000000000000000000000001', function(trip){
        expect(trip).to.be.instanceof(Trip);
        expect(trip.tripName).to.equal('Nashville');
        done();
      });
    });
  });

}); //last bracket

