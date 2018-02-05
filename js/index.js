$(function() {
  $("#topnav a").on("click", function () {
    $("#topnav div").removeClass("active");
    $("div.main div").removeClass("active");
    $(this).addClass("active");
    $($(this).data("id")).addClass("active");
  });
});
