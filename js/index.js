$(function() {
  /*
      Nav Bar Click Handler
  */
  $("#topnav a").on("click", function () {
    $("#topnav div").removeClass("active");
    $("div.main div").removeClass("active");
    $(this).parent().addClass("active");
    $($(this).data("id")).addClass("active");
    $("div.main").scrollTop(0);
  });
  
  $("#experience .jobdesc").accordion({
    active: false,
    collapsible: true,
    heightStyle: "content"
  });
  
  if(window.location.hash) {
    $("#topnav div").removeClass("active");
    $("div.main div").removeClass("active");
    $("nav a[href='" + window.location.hash + "']").parent().addClass("active");
    $(window.location.hash).addClass("active");    
  }
  
  $("#contact a:only-child").parent().css("text-align","center"); 
  $("div.main").scrollTop(0);
});
