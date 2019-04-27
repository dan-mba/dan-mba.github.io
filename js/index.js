var isIE = 0;

$(function() {
  if ($.isNumeric(window.document.documentMode)) isIE = 1;
  
  /*
      Nav Bar Click Handler
  */
  $("#topnav a").on("click", function () {
    $("#topnav div").removeClass("active");
    $("div.main div").removeClass("active");
    /* Lazy Load Map Image */
    $($(this).data("id")).find("img[data-source]").each(function() {
      $(this).attr("src",$(this).data("source"));
    });

    $(this).parent().addClass("active");
    $($(this).data("id")).addClass("active");
    $("#sampback").removeClass("active");
    $("#samples iframe").off();
    $("#samples iframe").attr('src','');
    
    /* Google Analytics */
    var pagename = $(this).data("id").slice(1);
    if (pagename == "home") pagename = "";
    ga('set', 'page', pagename);
    ga('send','pageview')
  });
  
  /*
      Samples click handler
  */
  $("#sampback a").on("click", function () {
    $("#samples").removeClass("active");
    $("#sampback").removeClass("active");
    $("#code").addClass("active");
    $("#topnav").show();
    $("#samples iframe").off();
    $("#samples iframe").attr('src','');
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
    /* Lazy Load Images */
    $(window.location.hash).find("img[data-source]").each(function() {
      $(this).attr("src",$(this).data("source"));
    });

    $("#topnav a[href='" + window.location.hash + "']").parent().addClass("active");
    $(window.location.hash).addClass("active");
    
    /* Google Analytics */
    var pagename = window.location.hash.slice(1);
    if (pagename == "home") pagename = "";
    ga('set', 'page', pagename);
    ga('send','pageview');
  }
  
  $("#samples iframe").iFrameResize(
    {
      heightCalculationMethod: 'documentElementScroll',
      warningTimeout: 0,
      bodyMargin: '0',
      bodyPadding: '0'
  });

  $(window).one('touchstart', function() {
    $("#code button").addClass('touch');
  });
});
