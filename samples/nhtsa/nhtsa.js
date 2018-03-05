/* Global endpoint for NHTSA Safety API */
var endpoint = 'https://www.nhtsa.gov/webapi/api/SafetyRatings';
var dataType = '?format=json';

$(function() {
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
  $("#mdlyr").change(pickMdlYear);
}

/* Make API call to get make data */
function pickMdlYear() {
  /* Reset chained select boxes */
  $(".nhtsa1 option").remove('.jsadd');
  $(".nhtsa1").off();
  
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
  $("#vehmake").change(pickVehMake);
}

/* Make API call to get model data */
function pickVehMake(){
  /* Reset chained select boxes */
  $(".nhtsa2 option").remove('.jsadd');
  $(".nhtsa2").off();
  
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
  $("#vehmodel").change(pickVehModel);
}

/* Make API call for vehicle descriptions */
function pickVehModel(){
  /* Reset chained selection boxes */
  $("#vehdesc option").remove('.jsadd');
  $("#vehdesc").off();
  
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
  $("#vehdesc").change(getVehInfo);
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
