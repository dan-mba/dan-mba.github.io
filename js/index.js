$(function() {
  /*
      Nav Bar click handler
  */
  
  $("#topnav a").on("click", function () {
    $("#topnav div").removeClass("active");
    $("div.main div").removeClass("active");
    $(this).parent().addClass("active");
    $($(this).data("id")).addClass("active");
  });
  
  /*
      Code & Samples click handlers
  */
  
  $("#code a.sample").on("click", function () {
    $("#code").removeClass("active");
    $("#samples").addClass("active");
    $("#sampback").addClass("active");
  });
  
  $("#sampback a").on("click", function () {
    $("#samples").removeClass("active");
    $("#sampback").removeClass("active");
    $("#code").addClass("active");
  });
  
  /*
      Setup Experience tab accordions
  */
  
  $("#experience .jobdesc").accordion({
    active: false,
    collapsible: true,
    heightStyle: "content"
  });
  
  if(window.location.hash) {
    $("#topnav div").removeClass("active");
    $("div.main div").removeClass("active");
    $("#topnav a[href='" + window.location.hash + "']").parent().addClass("active");
    $(window.location.hash).addClass("active");
  }
  
  $("#contact a:only-child").parent().css("text-align","center"); 
});
