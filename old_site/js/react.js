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

var LIBRARIES = {
  angularjs: {
    name: "AngularJS 1.x",
    site: "https://angularjs.org/"
  },
  axios: {
    name: "axios",
    site: "https://github.com/axios/axios"
  },
  babel: {
    name: "Babel",
    site: "https://babeljs.io/"
  },
  bootstrap: {
    name: "Bootstrap",
    site: "https://getbootstrap.com/"
  },
  d3: {
    name: "D3",
    site: "https://d3js.org/"
  },
  express: {
    name: "Express",
    site: "https://expressjs.com/"
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
  mongoose: {
    name: "Mongoose",
    site: "https://mongoosejs.com/"
  },
  node: {
    name: "Node.js",
    site: "https://nodejs.org/"
  },
  react: {
    name: "React",
    site: "https://reactjs.org/"
  },
  vue: {
    name: "Vue.js",
    site: "https://vuejs.org/"
  },
  webpack: {
    name: "webpack",
    site: "https://webpack.js.org/"
  }
};
var SAMP_APPS = [{
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
  description: "This app is the Node.js based back-end for my RSS based apps. The Express app takes a RSS feed " + "as a parameter, uses axios to fetch the feed & xml2js to convert it to JSON, then returns the JSON. " + "This app also serves as a proxy to overcome CORS restrictions that will not allow my apps to access " + "a feed located on a different domain.",
  libraries: ['node', 'express', 'axios']
}, {
  title: "ESPN RSS Feed Display",
  url: "samples/vue_rss_espn/index.html",
  source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/vue_rss_espn/src",
  description: "This app uses axios to obtain a JSON conversion of the ESPN AFC South NFL news feed from my " + "RSS to JSON proxy. It uses Vue.js to format the items to display the images & text and link to the" + "full articles for each story.",
  libraries: ['vue', 'axios', 'babel', 'webpack']
}, {
  title: "ESPN Podcast Player",
  url: "samples/react_podcast_espn/index.html",
  source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/react_podcast_espn/src",
  description: "This app uses axios to retrieve a JSON version of the ESPN Fantasy Focus Football Podcast feed " + "from my RSS to JSON Proxy. It uses React to format the podast list and the react-player library to " + "handle generating the proper html to play a podcast when it is selected.",
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
/* Render link to API if applicable */

var Api =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Api, _React$Component);

  function Api() {
    _classCallCheck(this, Api);

    return _possibleConstructorReturn(this, _getPrototypeOf(Api).apply(this, arguments));
  }

  _createClass(Api, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          name = _this$props.name,
          site = _this$props.site;
      if (!name) return null;
      return React.createElement("div", {
        className: "api"
      }, "API: ", ' ', React.createElement("a", {
        href: site,
        target: "_blank",
        rel: "noopener"
      }, name));
    }
  }]);

  return Api;
}(React.Component);

var Selection =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Selection, _React$Component2);

  function Selection() {
    _classCallCheck(this, Selection);

    return _possibleConstructorReturn(this, _getPrototypeOf(Selection).apply(this, arguments));
  }

  _createClass(Selection, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.blurFunc();
    }
  }, {
    key: "blurFunc",
    value: function blurFunc() {
      $("#code button").blur();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var buttons = [];
      var libs = {};
      var _this$props2 = this.props,
          libraries = _this$props2.libraries,
          selected = _this$props2.selected;
      Object.assign(libs, libraries);

      if (selected != "") {
        buttons.push(React.createElement("button", {
          key: "all",
          onClick: function onClick(e) {
            return _this.props.handleClick("", e);
          }
        }, "All"));
        delete libs[selected];
      }

      var _loop = function _loop() {
        var lib = _Object$keys[_i];
        buttons.push(React.createElement("button", {
          key: lib,
          onClick: function onClick(e) {
            return _this.props.handleClick(lib, e);
          }
        }, libs[lib].name));
      };

      for (var _i = 0, _Object$keys = Object.keys(libs); _i < _Object$keys.length; _i++) {
        _loop();
      }

      return React.createElement("div", {
        className: "selectors"
      }, buttons);
    }
  }]);

  return Selection;
}(React.Component);
/* Render array of sample apps */


var Samples =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(Samples, _React$Component3);

  function Samples(props) {
    var _this2;

    _classCallCheck(this, Samples);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Samples).call(this, props));
    _this2.state = {
      selected: ""
    };
    _this2.handleSelect = _this2.handleSelect.bind(_assertThisInitialized(_this2));
    return _this2;
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
    key: "handleSelect",
    value: function handleSelect(selected, e) {
      this.setState({
        selected: selected
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var output = [];
      var _this$props3 = this.props,
          samples = _this$props3.samples,
          libraries = _this$props3.libraries;
      var selected = this.state.selected;
      var libs = {};
      Object.assign(libs, libraries);
      /*
        Check if all libraries are included in a sample
      */

      Object.keys(libs).forEach(function (lib) {
        if (!samples.some(function (samp) {
          return samp.libraries.indexOf(lib) >= 0;
        })) {
          delete libs[lib];
        }
      });

      if (selected != "") {
        output = samples.filter(function (samp) {
          return samp.libraries.indexOf(selected) >= 0;
        });
      } else {
        output = samples;
      }

      output = output.map(function (samp, index) {
        return React.createElement("div", {
          className: "sample",
          key: index
        }, React.createElement("fieldset", null, React.createElement("legend", null, samp.title), React.createElement("div", {
          className: "pClass"
        }, samp.description, React.createElement(Api, {
          name: samp.apiname,
          site: samp.apisite
        })), React.createElement("button", {
          className: "ui-button ui-widget ui-corner-all",
          onClick: _this3.showCode.bind(_this3, samp.url, samp.newtab)
        }, "App"), React.createElement("button", {
          className: "ui-button ui-widget ui-corner-all source",
          onClick: _this3.showCode.bind(_this3, samp.source, true)
        }, "Source Code"), React.createElement("div", {
          className: "clear"
        })));
      });

      if (selected != "") {
        var sel = React.createElement("div", {
          className: "sel"
        }, React.createElement("a", {
          href: libraries[selected].site,
          target: "_blank",
          rel: "noopener"
        }, libraries[selected].name));
      }

      return React.createElement("div", null, React.createElement(Selection, {
        handleClick: this.handleSelect,
        selected: selected,
        libraries: libs
      }), selected != "" ? sel : "", output);
    }
  }]);

  return Samples;
}(React.Component);
/*
  Object.assign() polyfill from
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
*/


if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict';

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true
  });
}

ReactDOM.render(React.createElement(Samples, {
  samples: SAMP_APPS,
  libraries: LIBRARIES
}), document.getElementById('code'));