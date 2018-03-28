var gpsid="";
var zoom=10;
var colorbase = "https://maps.google.com/mapfiles/ms/icons/"
var colorlist = ["yellow","blue","green","ltblue","orange","pink","purple","red"];
var coorlist = [];
var cntr;
var mapWidth;

function initMap() {
/*
  var url = $.url();
  var endpoint = url.attr('path');
  var params = url.param();
*/

  mapWidth = $("#map").width();

/*
  var gps= url.param('gpsid');
  if (gps!==undefined){
    gpsid = gps;
  }
*/
      
/*
  var url = "https://gpsprovider.com/endpoint.json?token=XXX&clientId=" + gpsid;
  var xhr = $.ajax(url,{dataType: "json"});
  xhr.done(function(data){
*/
 
  /* Variable to mimic data returned from api. */
  var data = { list: [
               {  name : "Generator X600 123456",
                  location : {
                      latitude : 9.2,
                      longitude : -71.1
                  }
               },
               {  name : "Skid Steer 450 654123",
                  location : {
                      latitude : 10.3,
                      longitude : -67.5
                  }
               },
               {  name : "Excavator 250 789456",
                  location : {
                      latitude : 11.0,
                      longitude : -71.2
                  }
               }
              ]
             };
  
  if (data.list.length === 0) {
    $("#title").text("No Machines for this Client ID");
    return;
  }

  for(var i=0; i < data.list.length; i++) {
    coorlist.push([data.list[i].location.latitude, data.list[i].location.longitude] );
  }
  
  cntr = getLatLngCenter(coorlist);

  var m = findmax(cntr,coorlist);
  var z = Math.floor(-((Math.log(m/(.375*mapWidth/600))/Math.log(2))-10));
  zoom = Math.min(17, z);
  zoom = Math.max(5, zoom);

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoom,
    center: {lat: cntr[0], lng: cntr[1]},
    mapTypeId: 'hybrid',
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    maxZoom: 17,
    minZoom: 5
  });
  
  for (var i=0; i <data.list.length; i++) {
    var marker = new google.maps.Marker({
      position: {lat: data.list[i].location.latitude, lng: data.list[i].location.longitude},
      map: map,
      title: data.list[i].name.split(" ").slice(0,-1).join(" "),
      icon: colorbase+colorlist[i%8]+"-dot.png"
    });
    
    marker.infowindow = new google.maps.InfoWindow({
      content: '<div class="machine">' + data.list[i].name.split(" ").slice(0,-1).join(" ") + "</div>" +
        '<div class="serial">' + data.list[i].name.split(" ").slice(-1) + "</div>" +
        '<div class="link"><a href="https://maps.google.com/?q=' + data.list[i].location.latitude + "," + data.list[i].location.longitude + '" target="_blank">' +
        'Open Map in New Tab</a></div>'
    });

    marker.addListener('click', function() {
      this.infowindow.open(map,this);
    });
  }
}

function findmax(cntr, list){
  var max = 0;
  for(var i=0; i <list.length; i++) {
    var m = Math.max(Math.abs(cntr[0]-list[i][0]), Math.abs(cntr[1]-list[i][1]));
    max = Math.max(max, m);
  }
  return max;
}
/*
Code to find center of lat/long group
Found on https://stackoverflow.com/questions/6671183/calculate-the-center-point-of-multiple-latitude-longitude-coordinate-pairs
*/

function rad2degr(rad) { return rad * 180 / Math.PI; }
function degr2rad(degr) { return degr * Math.PI / 180; }

/**
 * @param latLngInDeg array of arrays with latitude and longtitude
 *   pairs in degrees. e.g. [[latitude1, longtitude1], [latitude2
 *   [longtitude2] ...]
 *
 * @return array with the center latitude longtitude pairs in 
 *   degrees.
 */
function getLatLngCenter(latLngInDegr) {
    var LATIDX = 0;
    var LNGIDX = 1;
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i=0; i<latLngInDegr.length; i++) {
        var lat = degr2rad(latLngInDegr[i][LATIDX]);
        var lng = degr2rad(latLngInDegr[i][LNGIDX]);
        // sum of cartesian coordinates
        sumX += Math.cos(lat) * Math.cos(lng);
        sumY += Math.cos(lat) * Math.sin(lng);
        sumZ += Math.sin(lat);
    }

    var avgX = sumX / latLngInDegr.length;
    var avgY = sumY / latLngInDegr.length;
    var avgZ = sumZ / latLngInDegr.length;

    // convert average x, y, z coordinate to latitude and longtitude
    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);

    return ([rad2degr(lat), rad2degr(lng)]);
}
