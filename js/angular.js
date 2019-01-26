var app = angular.module('ResumeApp', ['ngSanitize']);
var libraries = {
  angularjs : {
    name: "AngularJS 1.x",
    site: "//angularjs.org/"
  },
  fontawesome : {
    name: "Font Awesome",
    site: "//fontawesome.com/"
  },
  jquery : {
    name: "jQuery",
    site: "//jquery.com/"
  },
  jqueryui : {
    name: "jQuery UI",
    site: "//jqueryui.com/"
  },
  react: {
    name: "React",
    site: "//reactjs.org/"
  },
  babel: {
    name: "Babel Compiler",
    site: "//babeljs.io/"
  },
  bootstrap: {
    name: "Bootstrap",
    site: "//getbootstrap.com/"
  },
  node: {
    name: "Node.js",
    site: "//nodejs.org/"
  },
  express: {
    name: "Express",
    site: "//expressjs.com/"
  },
  mongoose: {
    name: "Mongoose",
    site: "//mongoosejs.com/"
  },
  d3: {
    name: "D3",
    site: "//d3js.org/"
  }
};

app.controller('MainController',
['$scope', function($scope) {
  $scope.apps = [
    {
      title: "GPS Static Fleet Map",
      url: "samples/fleetmap/fleetmap.html",
      source: "//github.com/dan-mba/dan-mba.github.io/tree/master/samples/fleetmap",
      description: "This application takes data from the GPS provider (simulated for this example) & displays it on a map. " +
                  "It uses the Google Static Maps API, because at the time it could be used for free without a key. " +
                  "Because this API provides static images, I had to develop an interface to allow you to zoom " +
                  "& move around the map. I also needed to determine the geographical center " +
                  "and maximum & minimum latitude & longitude " +
                  "to ensure all items would be displayed on the initial map.",
      apiname: "Google Static Maps API",
      apisite: "//developers.google.com/maps/documentation/static-maps/",
      libraries: ['jquery']
    },
    {
      title: "GPS JavaScript Fleet Map",
      url: "samples/fleetmapjs/fleetmap.html",
      source: "//github.com/dan-mba/dan-mba.github.io/tree/master/samples/fleetmapjs",
      description: "An updated version of the Static Fleet Map developed using the Google Maps JavaScript API. " +
                   "Using the JavaScript API allowed me to create a map with clickable location markers to display the " +
                   "relevant data right on the map in an info bubble.",
      apiname: "Google Maps JavaScript API",
      apisite: "//developers.google.com/maps/documentation/javascript/",
      libraries: []
    },
    {
      title: "NHTSA Safety Ratings",
      url: "samples/nhtsa/nhtsa.html",
      source: "//github.com/dan-mba/dan-mba.github.io/tree/master/samples/nhtsa",
      description: "This application accesses data from the NHTSA 5 Star Safety Ratings REST API and " +
                  "uses AngularJS to display the available data for the vehicle model selected. " +
                  "It also takes advantage of jQueryUI stylized select menus.",
      apiname: "NHTSA NCAP - 5 Star Safety Ratings API",
      apisite: "https://one.nhtsa.gov/webapi/Default.aspx?SafetyRatings/API/5",
      libraries: ['jquery','jqueryui','angularjs','fontawesome']
    },
    {
      title: "NHTSA Recalls",
      url: "samples/react_nhtsa/react.html",
      source: "//github.com/dan-mba/dan-mba.github.io/tree/master/samples/react_nhtsa",
      description: "This application uses the React JavaScript library to display data from " +
                  "the NHTSA Recall REST API for the selected model. " +
                  "It also styles the select menus using CSS only.",
      apiname: "NHTSA's Office of Defect Investigation - Recalls API",
      apisite: "https://one.nhtsa.gov/webapi/Default.aspx?Recalls/API/83",
      libraries: ['react','babel','jquery','fontawesome']
    },
    {
      title: "IBM Career Carousel",
      url: "samples/bootstrap_carousel/Carousel.html",
      source: "//github.com/dan-mba/dan-mba.github.io/tree/master/samples/bootstrap_carousel",
      description: "This application uses the Bootstrap carousel component to display a slideshow of " +
                  "images & descriptions from the different parts of my IBM career.",
      libraries: ['jquery', 'bootstrap']
    },
    {
      title: "SVG Bar Chart of GDP",
      url: "samples/d3BarChart/chart.html",
      source: "//github.com/dan-mba/dan-mba.github.io/tree/master/samples/d3BarChart",
      description: "This application uses the D3 JavaScript library to display a bar chart " +
                  "of quarterly US GDP values. It takes data from a json file and converts it " +
                  "to SVG for display.",
      libraries: ['jquery','d3']
    },
    {
      title: "URL Shortener",
      url: "https://mixed-hail.glitch.me",
      source: "https://glitch.com/edit/#!/mixed-hail",
      newtab: true,
      description: "This application is a simple URL shortener run on the Node.js runtime. " +
                  "The front-end is served by Express and uses jQuery to parse the data returned from a POST request. " +
                  "The back-end uses Express to handle the POST and Mongoose to store the URLs in a MongoDB database. " +
                  "It is hosted on Glitch and will open in a new tab to avoid CORS issues.",
      libraries: ['node','express','mongoose','jquery']
    }
  ];
}]);

app.directive('codeSample', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'js/codeSample.html',
    link: function(scope, element, attrs) {
      scope.showCode = function (url, isSource) {
        /* IE will not display in iframes correctly, so I open apps in a new tab */
        /* The same codes is used to open source links to fix a stuck focus when using anchor links */
        if((isIE != 0) || isSource) {
          $("#code button").blur();
          var win = window.open(url,"_blank");
          if (win) win.focus();
         }
        else {
          $("#code").removeClass("active");
          $("#samples").addClass("active");
          $("#sampback").addClass("active");
          $("#topnav").hide();
          $("#samples iframe").on("load", function() {
            var fHeight = $("#samples iframe").contents().find("html").height();
            console.log(fHeight);
            $("#samples iframe").height(Math.max(Math.ceil(fHeight)+2, $(window).height()-75));
            $("#samples").css({visibility: "visible", opacity: 0.0}).animate({opacity: 1.0},"fast"); 
          });
          $("#samples").css("visibility","hidden");
          $("#samples iframe").attr('src',url);
        }
      };
            
      if (scope.info.apiname) {
        scope.info.description += "<div class='api'>API: <a href='" + scope.info.apisite + "' target='_blank' rel='noopener'>" + 
          scope.info.apiname + "</a></div>";
      }
      
      if (scope.info.libraries.length) {
        if(scope.info.apiname){
          scope.info.description += "<div>";
        } else {
          scope.info.description += "<div class='api'>";
        }
        if (scope.info.libraries.length > 1) {
          scope.info.description += "Libraries: ";
        } else {
          scope.info.description += "Library: ";
        }
        for(var i=0; i < scope.info.libraries.length; i++) {
          if(i>0) scope.info.description += ", ";
          scope.info.description += "<a href='" + libraries[scope.info.libraries[i]].site + "' target='_blank' rel='noopener'>" +
            libraries[scope.info.libraries[i]].name + "</a>";
        }
        scope.info.description += "</div>";
      }
    }
  };
});
