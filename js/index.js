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
});
