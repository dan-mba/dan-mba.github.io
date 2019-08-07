/* Global endpoint for NHTSA Safety API */
var endpoint = 'https://one.nhtsa.gov/webapi/api/SafetyRatings';
var dataType = '?format=json';
var $selects;
var $iframe;
var parentHeight;
var repReg;

$(function() {
  repReg = new RegExp('/&/g');
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
  var years = '<option value="">Year:</option>';
  
  for (var i=0; i < data.Count; i++) {
    years +='<option value="'+data.Results[i].ModelYear+'">'+data.Results[i].ModelYear+'</option>';
  }
  $("#mdlyr").html(years);
  $("#mdlyr").change(pickMdlYear);
  $("#nhtsa").show(200);
  $("select").blur();
}

/* Make API call to get make data */
function pickMdlYear() {
  /* Reset chained select boxes */
  $("#vehmodel").html('<option value="">Model:</option>');
  $("#vehdesc").html('<option value="">Vehicle Description:</option>');
  $("#vehmodel,#vehdesc,#vehmake").off();
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
  var makes = '<option value="">Make:</option>';
  for (var i=0; i < data.Count; i++) {
    makes += '<option value="'+data.Results[i].Make.replace(repReg, "_")+'" class="jsadd">'+data.Results[i].Make+'</option>';
  }
  $("#vehmake").html(makes);
  $("#vehmake,#vehmodel,#vehdesc").prop('selectedIndex',0);
  $("#vehmake").change(pickVehMake);
  $("select").blur();
}

/* Make API call to get model data */
function pickVehMake(){
  /* Reset chained select boxes */
  $("#vehdesc").html('<option value="">Vehicle Description:</option>');
  $("#vehmodel,#vehdesc").off();
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
  var models = '<option value="">Model:</option>';
  
  for (var i=0; i < data.Count; i++) {
    if (data.Results[i].Model.indexOf('/') !== -1) continue;
    models += '<option value="'+data.Results[i].Model.replace(repReg, "_")+'" class="jsadd">'+data.Results[i].Model+'</option>';
  }
  $("#vehmodel").html(models);
  $("#vehmodel,#vehdesc").prop('selectedIndex',0);
  $("#vehmodel").change(pickVehModel);
  $("select").blur();
}

/* Make API call for vehicle descriptions */
function pickVehModel(){
  /* Reset chained selection boxes */
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
  var desc = '<option value="">Vehicle Description:</option>';
  
  for (var i=0; i < data.Count; i++) {
    desc += '<option value="'+data.Results[i].VehicleId+'" class="jsadd">'+data.Results[i].VehicleDescription+'</option>';
  }
  $("#vehdesc").html(desc);
  $("#vehdesc").prop('selectedIndex',0);
  $("#vehdesc").change(getVehInfo);
  $("select").blur();
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
    
    outscope.complaints = results.ComplaintsCount;
    outscope.recalls = results.RecallsCount;
    outscope.investigations = results.InvestigationCount;
    
    if(results.FrontCrashDriversideRating ==="Not Rated") {
      $("#crashRatings").css("display","none");
      return;
    }
    $("#crashRatings").css("display","");
    if (results.FrontCrashPicture) {
      outscope.frontCrashPic = results.FrontCrashPicture;
    } else {
      outscope.frontCrashPic = "";
      $("#frcrashpic").attr("src","");
    }
    outscope.frontCrashRating = makeStars(results.OverallFrontCrashRating);
    outscope.driverSideRating = makeStars(results.FrontCrashDriversideRating);
    outscope.passengerSideRating = makeStars(results.FrontCrashPassengersideRating);
    
    if (results.SideCrashPicture) {
      outscope.sideCrashPic = results.SideCrashPicture;
    } else {
      outscope.sideCrashPic = "";
      $("#sidecrashpic").attr("src","");
    }
    outscope.sideCrashRating = makeStars(results.OverallSideCrashRating);
    outscope.sideDriverSideRating = makeStars(results.SideCrashDriversideRating);
    outscope.sidePassengerSideRating = makeStars(results.SideCrashPassengersideRating);
    
    if (results.SidePolePicture) {
      outscope.sidePoleCrashPic = results.SidePolePicture;
    } else {
      outscope.sidePoleCrashPic = "";
      $("#sidepolecrashpic").attr("src","");
    }
    outscope.sidePoleCrashRating = makeStars(results.SidePoleCrashRating);
  });

  to(function() {
    $("#outdata").show();
    $("select").blur();
  }, 100, false);
}
