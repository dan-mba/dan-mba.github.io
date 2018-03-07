/* Global endpoint for NHTSA Safety API */
var endpoint = 'https://one.nhtsa.gov/webapi/api/SafetyRatings';
var dataType = '?format=json';

$(function() {
  $("#outdata").hide();
  $("#mdlyr").selectmenu({width:80, style: 'dropdown'});
  $("#vehmake").selectmenu({width:230});
  $("#vehmodel").selectmenu({width:320});
  $("#vehdesc").selectmenu({width:320});
  nhtsaStart();
});

/* Make API call to get model year data */
function nhtsaStart(){
  var queryparms = '';
  var xhr = $.ajax({ url: endpoint+queryparms+dataType,
                     dataType: 'jsonp'
                  });
  xhr.done(fillModelYear);
}

/* Generate option values for model years */
function fillModelYear(data) {
  for (var i=0; i < data.Count; i++) {
    $('#mdlyr').append('<option value="'+data.Results[i].ModelYear+'">'+data.Results[i].ModelYear+'</option>');
  }
  $("#mdlyr").on("selectmenuchange", pickMdlYear);
}

/* Make API call to get make data */
function pickMdlYear() {
  /* Reset chained select boxes */
  $(".nhtsa1 option").remove('.jsadd');
  $(".nhtsa1").off();
  $("#outdata").hide();
  
  if ($("#mdlyr").val() === ''){
    return;
  }
  var queryparms = '/modelyear/' + $("#mdlyr").val();
  var xhr = $.ajax({ url: endpoint+queryparms+dataType,
                     dataType: 'jsonp'
                  });
  xhr.done(fillVehMake);   
}

/* Generate option values for makes */
function fillVehMake(data) {
  for (var i=0; i < data.Count; i++) {
    $('#vehmake').append('<option value="'+data.Results[i].Make+'" class="jsadd">'+data.Results[i].Make+'</option>');
  }
  $("select.nhtsa1").selectmenu("refresh");
  $("#vehmake").on("selectmenuchange", pickVehMake);
}

/* Make API call to get model data */
function pickVehMake(){
  /* Reset chained select boxes */
  $(".nhtsa2 option").remove('.jsadd');
  $(".nhtsa2").off();
  $("#outdata").hide();
  
  if ($("#vehmake").val() === ''){
    return;
  }
  var queryparms = '/modelyear/'+ $("#mdlyr").val() + '/make/' + $("#vehmake").val();
  var xhr = $.ajax({ url: endpoint+queryparms+dataType,
                     dataType: 'jsonp'
                  });
  xhr.done(fillVehModel);
}

/* Generate option values for models */
function fillVehModel(data) {
  for (var i=0; i < data.Count; i++) {
    if (data.Results[i].Model.indexOf('/') !== -1) continue;
    $('#vehmodel').append('<option value="'+data.Results[i].Model+'" class="jsadd">'+data.Results[i].Model+'</option>');
  }
  $("select.nhtsa2").selectmenu('refresh');
  $("#vehmodel").on("selectmenuchange", pickVehModel);
}

/* Make API call for vehicle descriptions */
function pickVehModel(){
  /* Reset chained selection boxes */
  $("#vehdesc option").remove('.jsadd');
  $("#vehdesc").off();
  $("#outdata").hide();
  
  if ($("#vehmodel").val() === ''){
    return;
  }
  var queryparms = '/modelyear/' + $("#mdlyr").val() + '/make/' + $("#vehmake").val() + 
                   '/model/' + $("#vehmodel").val();
  var xhr = $.ajax({ url: endpoint+queryparms+dataType,
                     dataType: 'jsonp'
                  });
  xhr.done(fillVehDesc);  
}

/* Generate option values for vehicle descriptions */
function fillVehDesc(data) {
  for (var i=0; i < data.Count; i++) {
    $('#vehdesc').append('<option value="'+data.Results[i].VehicleId+'" class="jsadd">'+data.Results[i].VehicleDescription+'</option>');
  }
  $("#vehdesc").selectmenu('refresh');
  $("#vehdesc").on("selectmenuchange", getVehInfo);
}

/* Convert integers 0-5 into star icons */
function makeStars(rating){
  if (isNaN(rating)) {
    return rating;
  }
  var fullStar = ['<i class="fas fa-star"></i>',
                  '<i class="fas fa-star"></i>',
                  '<i class="fas fa-star"></i>',
                  '<i class="fas fa-star"></i>',
                  '<i class="fas fa-star"></i>'];
  var emptyStar = ['<i class="far fa-star"></i>',
                   '<i class="far fa-star"></i>',
                   '<i class="far fastar"></i>',
                   '<i class="far fastar"></i>',
                   '<i class="far fastar"></i>'];
  
  return fullStar.splice(0,rating).concat(emptyStar.splice(0,5-rating)).join('');
}

/* Make API call to get vehicle information */
function getVehInfo(){
//  $("#outdata").html('');
  if ($("#vehdesc").val() === ''){
    return;
  }
  var queryparms = '/vehicleid/' + $("#vehdesc").val();
  var dataType = '?format=json';
  
  var xhr = $.ajax({ url: endpoint+queryparms+dataType,
                     dataType: 'jsonp'
                  });
  xhr.done(showVehInfo);  
}

/* Display vehicle information */
function showVehInfo(data) {
  var results = data.Results[0];
  var outstr = '';
  
  outscope.$apply(function() {
    outscope.description = results.VehicleDescription;
    if (results.VehiclePicture) {
      outscope.picture = results.VehiclePicture;
    } else {
      outscope.picture = "";
      $("#vehpic").attr("src","");
    }
    outscope.overallRating = makeStars(results.OverallRating);
    outscope.rolloverRating = makeStars(results.RolloverRating);
    outscope.rolloverPossibility = results.RolloverPossibility;
    
    for (var x in results) {
      if(x.indexOf('NHTSA') === 0) {
        outstr += '<div>' + x.match(/[A-Z][a-z]+/g).join(" ") + ': ' + results[x] + '</div>';
      }
    }
    outscope.nhtsaVars = outstr;
    outstr='';
  });

  $("#outdata").show(200);
  
  /*
  outstr =  '<div class="block1 span10"><h4>' + results.VehicleDescription + '</h4>';
  if (results.VehiclePicture)
    outstr += '<img class="pull-right" src="' + results.VehiclePicture + '">';
  outstr += '<div>Overall Rating: ' + makeStars(results.OverallRating) + '</div>';
  outstr += '<div>Rollover Rating: ' + makeStars(results.RolloverRating) + '</div>';
  outstr += '<div>Rollover Possibility: ' + results.RolloverPossibility + '</div>';
  for (var x in results) {
    if(x.indexOf('NHTSA') === 0) {
      outstr += '<div>' + x.match(/[A-Z][a-z]+/g).join(" ") + ': ' + results[x] + '</div>';
    }
  }
  outstr += '<div>Complaints Count: ' + results.ComplaintsCount + '</div>';
  outstr += '<div>Recalls Count: ' + results.RecallsCount + '</div>';
  outstr += '<div>Investigation Count: ' + results.InvestigationCount + '</div>';
  outstr += '</div>'
    
  $("#outdata").append(outstr);
    
  outstr = '<ul class="thumbnails"><li class="span4"><div class="thumbnail">';
  if (results.FrontCrashPicture)
    outstr += '<img src="' + results.FrontCrashPicture + '">';
  outstr += '<div>Front Crash Rating: ' + makeStars(results.OverallFrontCrashRating) + '</div>';
  outstr += '<div>Driver Side Rating: ' + makeStars(results.FrontCrashDriversideRating) + '</div>';
  outstr += '<div>Passenger Side Rating: ' + makeStars(results.FrontCrashPassengersideRating) + '</div>';
  outstr += '</div></li>';
      
  outstr += '<li class="span4"><div class="thumbnail">';
  if (results.SideCrashPicture)
    outstr += '<img src="' + results.SideCrashPicture + '">';
  outstr += '<div>Side Crash Rating: ' + makeStars(results.OverallSideCrashRating) + '</div>';
  outstr += '<div>Driver Side Rating: ' + makeStars(results.SideCrashDriversideRating) + '</div>';
  outstr += '<div>Passenger Side Rating: ' + makeStars(results.SideCrashPassengersideRating) + '</div>';
  outstr += '</div></li>';
    
  outstr += '<li class="span4"><div class="thumbnail">';
  if (results.SidePolePicture)
    outstr += '<img src="' + results.SidePolePicture + '">';
  outstr += '<div>Side Pole Crash Rating: ' + makeStars(results.OverallSideCrashRating) + '</div>';
  outstr += '</div></li></ul>';

  $("#outdata").append(outstr);
  */
}
