var gpsid="";
var zoom=10;
var mapbase = "https://maps.google.com/maps/api/staticmap?size=600x600&maptype=hybrid&scale=2&key=SECRET_KEY";
var colorlist = ["0xff0000",  "0xff8000", "0xffff00", "0x00ff00", "0x00ffff", "0x0000ff", "0x7f00ff", "0xff00ff", "0xffffff", "0x009900"];
var coorlist = [];
var cntr;
var viewportWidth;
var sizeDelimiter = " ";

$(window).on("load", function(){
  var url = $.url();
  var endpoint = url.attr('path');
  var params = url.param();

  viewportWidth = $(window).width();
  if (viewportWidth < 550) {
    sizeDelimiter = "\n";
    $("#gpsrslt th").addClass("small");
  }
  $("#zoom").hide();
/*
  var gps= url.param('gpsid');
  if (gps!==undefined){
    gpsid = gps;
  }
*/
      
  getgps();
  $("#zoomin").click(zoomin);
  $("#zoomout").click(zoomout);
  $("#movelt").click(movelt);
  $("#movert").click(movert);
  $("#moveup").click(moveup);
  $("#movedn").click(movedn);
});

function getgps(){
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
  
  var out = "<tr class='data'>";
  if (data.list.length === 0) {
    out += "<td colspan='7'>No Machines for this Client Id</td>";
    out += "</tr>";
    $("#gpsrslt").append(out);
    return;
  }

  var map = mapbase;
  for(var i=0; i < data.list.length; i++) {
    out += "<td>" + String.fromCharCode(65+i) + "</td>";
    out += "<td>" + data.list[i].name.split(" ").join(sizeDelimiter) + "</td>";
    out += "<td><a href='https://maps.google.com/?q=" + data.list[i].location.latitude + "," + data.list[i].location.longitude + "' target='_blank'>" +
            data.list[i].location.latitude + "," + sizeDelimiter + data.list[i].location.longitude +"</a></td>";
    coorlist.push([data.list[i].location.latitude, data.list[i].location.longitude] );
 
    map += "&markers=color:"+ colorlist[i%colorlist.length]+"|label:" +  String.fromCharCode(65+i) +"|" + data.list[i].location.latitude + "," + data.list[i].location.longitude;
    out += "</tr>";
    $("#gpsrslt").append(out);
    out = "<tr>";
  }
  
  cntr = getLatLngCenter(coorlist);

  var m = findmax(cntr,coorlist);
  var z = Math.floor(-((Math.log(m/.375)/Math.log(2))-10));
  zoom = Math.min(17, z);
  zoom = Math.max(5, zoom);
  $("#gpsmap").attr("src",map+"&zoom="+zoom+"&center="+cntr[0]+","+cntr[1]);
  $("#zoom").show();
}

function zoomin(){
  $("#zoom button").blur();
  var urlarr = $("#gpsmap").attr("src").split('&');
  urlarr.pop();
  urlarr.pop();
  if (zoom > 17) return;
  zoom++;
  $("#gpsmap").attr("src",urlarr.join('&')+"&zoom="+zoom+"&center="+cntr[0]+","+cntr[1]);
}

function zoomout(){
  $("#zoom button").blur();
  var urlarr = $("#gpsmap").attr("src").split('&');
  urlarr.pop();
  urlarr.pop();
  if (zoom < 5) return;
  zoom--;
  $("#gpsmap").attr("src",urlarr.join('&')+"&zoom="+zoom+"&center="+cntr[0]+","+cntr[1]);
}

function moveup(){
  $("#zoom button").blur();
  var urlarr = $("#gpsmap").attr("src").split('&');
  urlarr.pop();
  urlarr.pop();
  var m = .2*Math.pow(2,10-zoom);
  cntr[0] += m;
  $("#gpsmap").attr("src",urlarr.join('&')+"&zoom="+zoom+"&center="+cntr[0]+","+cntr[1]);
}

function movedn(){
  $("#zoom button").blur();
  var urlarr = $("#gpsmap").attr("src").split('&');
  urlarr.pop();
  urlarr.pop();
  var m = .2*Math.pow(2,10-zoom);
  cntr[0] -= m;
  $("#gpsmap").attr("src",urlarr.join('&')+"&zoom="+zoom+"&center="+cntr[0]+","+cntr[1]);
}

function movelt(){
  $("#zoom button").blur();
  var urlarr = $("#gpsmap").attr("src").split('&');
  urlarr.pop();
  urlarr.pop();
  var m = .2*Math.pow(2,10-zoom);
  cntr[1] -= m;
  $("#gpsmap").attr("src",urlarr.join('&')+"&zoom="+zoom+"&center="+cntr[0]+","+cntr[1]);
}

function movert(){
  $("#zoom button").blur();
  var urlarr = $("#gpsmap").attr("src").split('&');
  urlarr.pop();
  urlarr.pop();
  var m = .2*Math.pow(2,10-zoom);
  cntr[1] += m;
  $("#gpsmap").attr("src",urlarr.join('&')+"&zoom="+zoom+"&center="+cntr[0]+","+cntr[1]);
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
