"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var libraries = {
  angularjs: {
    name: "AngularJS 1.x",
    site: "https://angularjs.org/"
  },
  fontawesome: {
    name: "Font Awesome",
    site: "https://fontawesome.com/"
  },
  jquery: {
    name: "jQuery",
    site: "https://jquery.com/"
  },
  jqueryui: {
    name: "jQuery UI",
    site: "https://jqueryui.com/"
  },
  react: {
    name: "React",
    site: "https://reactjs.org/"
  },
  babel: {
    name: "Babel Compiler",
    site: "https://babeljs.io/"
  },
  bootstrap: {
    name: "Bootstrap",
    site: "https://getbootstrap.com/"
  },
  node: {
    name: "Node.js",
    site: "https://nodejs.org/"
  },
  express: {
    name: "Express",
    site: "https://expressjs.com/"
  },
  mongoose: {
    name: "Mongoose",
    site: "https://mongoosejs.com/"
  },
  d3: {
    name: "D3",
    site: "https://d3js.org/"
  },
  vue: {
    name: "Vue.js",
    site: "https://vuejs.org/"
  },
  axios: {
    name: "axios",
    site: "https://github.com/axios/axios"
  },
  webpack: {
    name: "webpack",
    site: "https://webpack.js.org/"
  }
};
var sampApps = [{
  title: "NHTSA Safety Ratings",
  url: "samples/nhtsa/nhtsa.html",
  source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/nhtsa",
  description: "This application accesses data from the NHTSA 5 Star Safety Ratings REST API and " + "uses AngularJS to display the available data for the vehicle model selected. " + "It also takes advantage of jQueryUI stylized select menus.",
  apiname: "NHTSA NCAP - 5 Star Safety Ratings API",
  apisite: "https://one.nhtsa.gov/webapi/Default.aspx?SafetyRatings/API/5",
  libraries: ['jquery', 'jqueryui', 'angularjs', 'fontawesome']
}, {
  title: "NHTSA Recalls",
  url: "samples/react_nhtsa/react.html",
  source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/react_nhtsa",
  description: "This application uses the React JavaScript library to display data from the NHTSA Recall REST API " + "for the selected model. It also styles the select menus using CSS only.",
  apiname: "NHTSA's Office of Defect Investigation - Recalls API",
  apisite: "https://one.nhtsa.gov/webapi/Default.aspx?Recalls/API/83",
  libraries: ['react', 'babel', 'jquery', 'fontawesome']
}, {
  title: "URL Shortener",
  url: "https://mixed-hail.glitch.me",
  source: "https://glitch.com/edit/#!/mixed-hail",
  newtab: true,
  description: "This application is a simple URL shortener run on the Node.js runtime. " + "The front-end is served by Express and uses jQuery to parse the data returned from a POST request. " + "The back-end uses Express to handle the POST and Mongoose to store the URLs in a MongoDB database. " + "It is hosted on Glitch and will open in a new tab to avoid CORS issues.",
  libraries: ['node', 'express', 'mongoose', 'jquery']
}, {
  title: "RSS to JSON Proxy",
  url: "https://flannel-glade.glitch.me/?rss=http%3A%2F%2Fwww.espn.com%2Fblog%2Ffeed%3Fblog%3Dafcsouth",
  source: "https://glitch.com/edit/#!/flannel-glade",
  newtab: true,
  description: "RSS to JSON backend with CORS proxy",
  libraries: ['node', 'express']
}, {
  title: "ESPN RSS Feed Display",
  url: "samples/vue_rss_espn/index.html",
  source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/vue_rss_espn",
  description: "Display ESPN AFC South RSS Feed",
  libraries: ['vue', 'axios', 'babel', 'webpack']
}, {
  title: "ESPN Podcast Player",
  url: "samples/react_podcast_espn/index.html",
  source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/react_podcast_espn",
  description: "Player for the ESPN Fantasy Focus Football Podcast",
  libraries: ['react', 'axios', 'babel', 'webpack']
}, {
  title: "SVG Bar Chart of GDP",
  url: "samples/d3BarChart/chart.html",
  source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/d3BarChart",
  description: "This application uses the D3 JavaScript library to display a bar chart " + "of quarterly US GDP values. It takes data from a json file and converts it " + "to SVG for display.",
  libraries: ['jquery', 'd3']
}, {
  title: "GPS Static Fleet Map",
  url: "samples/fleetmap/fleetmap.html",
  source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/fleetmap",
  description: "This application takes data from the GPS provider (simulated for this example) & displays it on a map. " + "It uses the Google Static Maps API, because at the time it could be used for free without a key. " + "Because this API provides static images, I had to develop an interface to allow you to zoom " + "& move around the map. I also needed to determine the geographical center " + "and maximum & minimum latitude & longitude to ensure all items would be displayed on the initial map.",
  apiname: "Google Static Maps API",
  apisite: "https://developers.google.com/maps/documentation/static-maps/",
  libraries: ['jquery']
}, {
  title: "GPS JavaScript Fleet Map",
  url: "samples/fleetmapjs/fleetmap.html",
  source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/fleetmapjs",
  description: "An updated version of the Static Fleet Map developed using the Google Maps JavaScript API. " + "Using the JavaScript API allowed me to create a map with clickable location markers to display the " + "relevant data right on the map in an info bubble.",
  apiname: "Google Maps JavaScript API",
  apisite: "https://developers.google.com/maps/documentation/javascript/",
  libraries: []
}, {
  title: "IBM Career Carousel",
  url: "samples/bootstrap_carousel/Carousel.html",
  source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/bootstrap_carousel",
  description: "This application uses the Bootstrap carousel component to display a slideshow of " + "images & descriptions from the different parts of my IBM career.",
  libraries: ['jquery', 'bootstrap']
}];
/* Reder link to API if applicable */

var Api =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Api, _React$Component);

  function Api(props) {
    _classCallCheck(this, Api);

    return _possibleConstructorReturn(this, _getPrototypeOf(Api).call(this, props));
  }

  _createClass(Api, [{
    key: "render",
    value: function render() {
      if (!this.props.name) return null;
      return React.createElement("div", {
        className: "api"
      }, "API: ", ' ', React.createElement("a", {
        href: this.props.site,
        target: "_blank",
        rel: "noopener"
      }, this.props.name));
    }
  }]);

  return Api;
}(React.Component);
/* Render links to libraries */


var Library =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Library, _React$Component2);

  function Library(props) {
    _classCallCheck(this, Library);

    return _possibleConstructorReturn(this, _getPrototypeOf(Library).call(this, props));
  }

  _createClass(Library, [{
    key: "render",
    value: function render() {
      if (!this.props.libs.length) return null;
      var links = this.props.libs.map(function (lib, index) {
        return React.createElement("a", {
          href: libraries[lib].site,
          target: "_blank",
          rel: "noopener",
          key: index
        }, libraries[lib].name);
      }).reduce(function (p, c) {
        return [p, ', ', c];
      });
      return React.createElement("div", {
        className: this.props.api ? '' : 'api'
      }, this.props.libs.length > 1 ? 'Libraries: ' : 'Library: ', links);
    }
  }]);

  return Library;
}(React.Component);
/* Render array of sample apps */


var Samples =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(Samples, _React$Component3);

  function Samples(props) {
    _classCallCheck(this, Samples);

    return _possibleConstructorReturn(this, _getPrototypeOf(Samples).call(this, props));
  }

  _createClass(Samples, [{
    key: "showCode",
    value: function showCode(url, isSource) {
      if (isIE != 0 || isSource) {
        $("#code button").blur();
        var win = window.open(url, "_blank");
        win.focus();
      } else {
        $("#code").removeClass("active");
        $("#samples").addClass("active");
        $("#sampback").addClass("active");
        $("#topnav").hide();
        $("#samples iframe").attr('src', url);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var output = [];
      output = this.props.samp.map(function (samp, index) {
        return React.createElement("div", {
          className: "sample",
          key: index
        }, React.createElement("fieldset", null, React.createElement("legend", null, samp.title), React.createElement("div", {
          className: "pClass"
        }, samp.description, React.createElement(Api, {
          name: samp.apiname,
          site: samp.apisite
        }), React.createElement(Library, {
          libs: samp.libraries,
          api: samp.apiname
        })), React.createElement("button", {
          className: "ui-button ui-widget ui-corner-all",
          onClick: _this.showCode.bind(_this, samp.url, samp.newtab)
        }, "App"), React.createElement("button", {
          className: "ui-button ui-widget ui-corner-all source",
          onClick: _this.showCode.bind(_this, samp.source, true)
        }, "Source Code"), React.createElement("div", {
          className: "clear"
        })));
      });
      return React.createElement("div", null, output);
    }
  }]);

  return Samples;
}(React.Component);

ReactDOM.render(React.createElement(Samples, {
  samp: sampApps
}), document.getElementById('code'));