const LIBRARIES = {
  angularjs : {
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
  fontawesome : {
    name: "Font Awesome",
    site: "https://fontawesome.com/"
  },
  jquery : {
    name: "jQuery",
    site: "https://jquery.com/"
  },
  jqueryui : {
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

const SAMP_APPS = [
    {
      title: "NHTSA Safety Ratings",
      url: "samples/nhtsa/nhtsa.html",
      source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/nhtsa",
      description:
        "This application accesses data from the NHTSA 5 Star Safety Ratings REST API and " +
        "uses AngularJS to display the available data for the vehicle model selected. " +
        "It also takes advantage of jQueryUI stylized select menus.",
      apiname: "NHTSA NCAP - 5 Star Safety Ratings API",
      apisite: "https://one.nhtsa.gov/webapi/Default.aspx?SafetyRatings/API/5",
      libraries: ['jquery','jqueryui','angularjs','fontawesome']
    },
    {
      title: "NHTSA Recalls",
      url: "samples/react_nhtsa/react.html",
      source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/react_nhtsa",
      description:
        "This application uses the React JavaScript library to display data from the NHTSA Recall REST API " +
        "for the selected model. It also styles the select menus using CSS only.",
      apiname: "NHTSA's Office of Defect Investigation - Recalls API",
      apisite: "https://one.nhtsa.gov/webapi/Default.aspx?Recalls/API/83",
      libraries: ['react','babel','jquery','fontawesome']
    },
    {
      title: "URL Shortener",
      url: "https://mixed-hail.glitch.me",
      source: "https://glitch.com/edit/#!/mixed-hail",
      newtab: true,
      description:
        "This application is a simple URL shortener run on the Node.js runtime. " +
        "The front-end is served by Express and uses jQuery to parse the data returned from a POST request. " +
        "The back-end uses Express to handle the POST and Mongoose to store the URLs in a MongoDB database. " +
        "It is hosted on Glitch and will open in a new tab to avoid CORS issues.",
      libraries: ['node','express','mongoose','jquery']
    },
    {
      title: "RSS to JSON Proxy",
      url: "https://flannel-glade.glitch.me/?rss=http%3A%2F%2Fwww.espn.com%2Fblog%2Ffeed%3Fblog%3Dafcsouth",
      source: "https://glitch.com/edit/#!/flannel-glade",
      newtab: true,
      description:
        "This app is the Node.js based back-end for my RSS based apps. The Express app takes a RSS feed " +
        "as a parameter, uses axios to fetch the feed & xml2js to convert it to JSON, then returns the JSON. " +
        "This app also serves as a proxy to overcome CORS restrictions that will not allow my apps to access " +
        "a feed located on a different domain.",
      libraries: ['node','express','axios']
    },
    {
      title: "ESPN RSS Feed Display",
      url: "samples/vue_rss_espn/index.html",
      source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/vue_rss_espn/src",
      description:
        "This app uses axios to obtain a JSON conversion of the ESPN AFC South NFL news feed from my " +
        "RSS to JSON proxy. It uses Vue.js to format the items to display the images & text and link to the" +
        "full articles for each story.",
      libraries: ['vue','axios','babel','webpack']
    },
    {
      title: "ESPN Podcast Player",
      url: "samples/react_podcast_espn/index.html",
      source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/react_podcast_espn/src",
      description:
        "This app uses axios to retrieve a JSON version of the ESPN Fantasy Focus Football Podcast feed " +
        "from my RSS to JSON Proxy. It uses React to format the podast list and the react-player library to " +
        "handle generating the proper html to play a podcast when it is selected.",
      libraries: ['react','axios','babel','webpack']
    },
    {
      title: "SVG Bar Chart of GDP",
      url: "samples/d3BarChart/chart.html",
      source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/d3BarChart",
      description:
        "This application uses the D3 JavaScript library to display a bar chart " +
        "of quarterly US GDP values. It takes data from a json file and converts it " +
        "to SVG for display.",
      libraries: ['jquery','d3']
    },
    {
      title: "GPS Static Fleet Map",
      url: "samples/fleetmap/fleetmap.html",
      source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/fleetmap",
      description: 
        "This application takes data from the GPS provider (simulated for this example) & displays it on a map. " +
        "It uses the Google Static Maps API, because at the time it could be used for free without a key. " +
        "Because this API provides static images, I had to develop an interface to allow you to zoom " +
        "& move around the map. I also needed to determine the geographical center " +
        "and maximum & minimum latitude & longitude to ensure all items would be displayed on the initial map.",
      apiname: "Google Static Maps API",
      apisite: "https://developers.google.com/maps/documentation/static-maps/",
      libraries: ['jquery']
    },
    {
      title: "GPS JavaScript Fleet Map",
      url: "samples/fleetmapjs/fleetmap.html",
      source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/fleetmapjs",
      description:
        "An updated version of the Static Fleet Map developed using the Google Maps JavaScript API. " +
        "Using the JavaScript API allowed me to create a map with clickable location markers to display the " +
        "relevant data right on the map in an info bubble.",
      apiname: "Google Maps JavaScript API",
      apisite: "https://developers.google.com/maps/documentation/javascript/",
      libraries: []
    },
    {
      title: "IBM Career Carousel",
      url: "samples/bootstrap_carousel/Carousel.html",
      source: "https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/bootstrap_carousel",
      description:
        "This application uses the Bootstrap carousel component to display a slideshow of " +
        "images & descriptions from the different parts of my IBM career.",
      libraries: ['jquery', 'bootstrap']
    }      
  ];


/* Render link to API if applicable */
class Api extends React.Component {

  render(){
    var {name, site} = this.props;
    if(!name) return null;

    return (
      <div className='api'>
        API: {' '}
        <a href={site} target='_blank' rel='noopener'>
          {name}
        </a>
      </div>
    );
  }
}

class Selection extends React.Component {

  componentDidUpdate() {
    this.blurFunc();
  }

  blurFunc() {
    $("#code button").blur();
  }

  render() {
    var buttons = [];
    var libs = {};
    var {libraries, selected} = this.props;

    Object.assign(libs,libraries);

    if(selected != "") {
      buttons.push(
        <button key="all"
          onClick={(e) => this.props.handleClick("", e)}>
          All
        </button>
      );
      delete libs[selected];
    }

    for (const lib of Object.keys(libs)) {
      buttons.push(
        <button key={lib}
          onClick={(e) => this.props.handleClick(lib, e)}>
          {libs[lib].name}
        </button>
      );
    }

    return (
      <div className="selectors">
        {buttons}
      </div>
    );

  }
}

/* Render array of sample apps */
class Samples extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selected: ""
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  showCode(url, isSource) {
    if((isIE != 0) || isSource) {
      $("#code button").blur();
      var win = window.open(url,"_blank");
      win.focus();
    }
    else {
      $("#code").removeClass("active");
      $("#samples").addClass("active");
      $("#sampback").addClass("active");
      $("#topnav").hide();

      $("#samples iframe").attr('src',url);
    }
  };

  handleSelect(selected, e) {
    this.setState({selected:selected});
  }

  render(){
    var output = [];
    var {samples, libraries} = this.props;
    var {selected} = this.state;

    var libs = {};
    Object.assign(libs,libraries);

    /*
      Check if all libraries are included in a sample
    */
    Object.keys(libs).forEach((lib) => {
      if(!samples.some((samp) => 
        samp.libraries.indexOf(lib) >= 0
      )) {
        delete libs[lib];
      }
    });

    if(selected != "") {
      output = samples.filter((samp) => 
        samp.libraries.indexOf(selected) >= 0
      );
    } else {
      output = samples;
    }

    output = output.map((samp,index) =>
      <div className='sample' key={index}>
        <fieldset>
          <legend>{samp.title}</legend>
          <div className='pClass'>
            {samp.description}
            <Api name={samp.apiname} site={samp.apisite}/>
          </div>
          <button className='ui-button ui-widget ui-corner-all'
            onClick={this.showCode.bind(this,samp.url,samp.newtab)}>
            App
          </button>
          <button className='ui-button ui-widget ui-corner-all source'
            onClick={this.showCode.bind(this,samp.source,true)}>
            Source Code
          </button>
          <div className='clear'></div>
        </fieldset>
      </div>
    );

    if(selected != "") {
      var sel = (
        <div className="sel">
          <a href={libraries[selected].site} target="_blank" rel="noopener">
            {libraries[selected].name}
          </a>
        </div>
      );
    }

    return(
      <div>
        <Selection handleClick={this.handleSelect} selected={selected} libraries={libs}/>
        {selected != "" ? sel : ""}
        {output}
      </div>
    );
  }
}

/*
  Object.assign() polyfill from
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
*/
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
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


ReactDOM.render(
  <Samples samples={SAMP_APPS} libraries={LIBRARIES}/>,
  document.getElementById('code')
);
