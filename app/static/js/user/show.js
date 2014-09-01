/* global google:true */

(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    //var pos = getPosition();
    initMap(0, 0, 2);
    //addMarker(pos.lat, pos.lng, pos.name);
  });

 /* function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP});
  }*/

 /* function getPosition(){
    var $treasure = $('#trip'),
        name      = $treasure.attr('data-name'),
        lat       = $treasure.attr('data-lat'),
        lng       = $treasure.attr('data-lng'),
        pos       = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};

    return pos;
  }*/

  function initMap(lat, lng, zoom){
    var styles = [{'featureType':'landscape','stylers':[{'hue':'#F1FF00'},{'saturation':-27.4},{'lightness':9.4},{'gamma':1}]},{'featureType':'road.highway','stylers':[{'hue':'#0099FF'},{'saturation':-20},{'lightness':36.4},{'gamma':1}]},{'featureType':'road.arterial','stylers':[{'hue':'#00FF4F'},{'saturation':0},{'lightness':0},{'gamma':1}]},{'featureType':'road.local','stylers':[{'hue':'#FFB300'},{'saturation':-38},{'lightness':11.2},{'gamma':1}]},{'featureType':'water','stylers':[{'hue':'#00B6FF'},{'saturation':4.2},{'lightness':-63.4},{'gamma':1}]},{'featureType':'poi','stylers':[{'hue':'#9FFF00'},{'saturation':0},{'lightness':0},{'gamma':1}]}],
    mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles:styles};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

})();

