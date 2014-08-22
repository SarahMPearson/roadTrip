/* jshint unused:false, camelcase:false */
/* global geocode */

(function(){
  'use strict';

  $(document).ready(function(){
    $('button[type=submit]').click(addTrip);

  }); //ready function

  function addTrip(e){
    var start = $('#start').val(),
        end   = $('#end').val();
    geocode(start, function(start, startLat, startLng){
      geocode(end, function(end, endLat, endLng){
        $('#start').val(start);
        $('#startLat').val(startLat);
        $('#startLng').val(startLng);

        $('#end').val(end);
        $('#endLat').val(endLat);
        $('#endLng').val(endLng);

        $('form').submit();
      }); //geocode end
    }); //geocode start
    e.preventDefault();
  } // add trip
})(); //last bracket

