$(function() {
  $("#topnav a").on("click", function () {
    $("#topnav div").removeClass("active");
    $("div.main div").removeClass("active");
    $(this).parent().addClass("active");
    $($(this).data("id")).addClass("active");
  });
  
  $("#fourblocks .jobdesc").accordion({
    active: false,
    collapsible: true,
    heightStyle: "content"
  });
  
  if(window.location.hash) {
    $("#topnav div").removeClass("active");
    $("div.main div").removeClass("active");
    $("nav a[href='" + window.location.hash + "']").addClass("active");
    console.log("nav a[href='" + window.location.hash + "']");
    $(window.location.hash).addClass("active");    
  }
});
