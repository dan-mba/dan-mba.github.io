const SAMPLES = [
  {
    title: 'NHTSA Safety Ratings',
    url: 'https://dan-mba.github.io/samples/nhtsa/nhtsa.html',
    source: 'https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/nhtsa',
    description:
      'This application accesses data from the NHTSA 5 Star Safety Ratings REST API and '
      + 'uses AngularJS to display the available data for the vehicle model selected.',
    apiname: 'NHTSA Safety Ratings API',
    apisite: 'https://one.nhtsa.gov/webapi/Default.aspx?SafetyRatings/API/5',
    libraries: ['jquery', 'angularjs', 'fontawesome'],
  },
  {
    title: 'NHTSA Recalls',
    url: 'https://dan-mba.github.io/samples/react_nhtsa/react.html',
    source: 'https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/react_nhtsa',
    description:
      'This application uses the React JavaScript library to display data from the NHTSA Recall'
      + 'REST API for the selected model. It also styles the select menus using CSS only.',
    apiname: 'NHTSA Recalls API',
    apisite: 'https://one.nhtsa.gov/webapi/Default.aspx?Recalls/API/83',
    libraries: ['react', 'babel', 'jquery', 'fontawesome'],
  },
  {
    title: 'URL Shortener',
    url: 'https://mixed-hail.glitch.me',
    source: 'https://glitch.com/edit/#!/mixed-hail',
    newtab: true,
    description:
      'This application is a simple URL shortener run on the Node.js runtime. '
      + 'The front-end is served by Express and uses jQuery to parse the data returned '
      + 'from a POST request. The back-end uses Express to handle the POST and Mongoose '
      + 'to store the URLs in a MongoDB database. It is hosted on Glitch and will open '
      + 'in a new tab to avoid CORS issues.',
    libraries: ['node', 'express', 'mongoose', 'jquery'],
  },
  {
    title: 'RSS to JSON Proxy',
    url: 'https://flannel-glade.glitch.me/?rss=http%3A%2F%2Fwww.espn.com%2Fblog%2Ffeed%3Fblog%3Dafcsouth',
    source: 'https://glitch.com/edit/#!/flannel-glade',
    newtab: true,
    description:
      'This app is the Node.js based back-end for my RSS based apps. The Express app takes'
      + ' a RSS feed as a parameter, uses axios to fetch the feed & xml2js to convert it to JSON, '
      + 'then returns the JSON. This app also serves as a proxy to overcome CORS restrictions'
      + ' that will not allow my apps to access a feed located on a different domain.',
    libraries: ['node', 'express', 'axios'],
  },
  {
    title: 'ESPN RSS Feed Display',
    url: 'https://dan-mba.github.io/samples/vue_rss_espn/index.html',
    source: 'https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/vue_rss_espn/src',
    description:
      'This app uses axios to obtain a JSON conversion of the ESPN AFC South NFL news feed from '
      + 'my RSS to JSON proxy. It uses Vue.js to format the items to display the images & text '
      + 'and link to thefull articles for each story.',
    libraries: ['vue', 'axios', 'babel', 'webpack'],
  },
  {
    title: 'ESPN Podcast Player',
    url: 'https://dan-mba.github.io/samples/react_podcast_espn/index.html',
    source: 'https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/react_podcast_espn/src',
    description:
      'This app uses axios to retrieve a JSON version of the ESPN Fantasy Focus Football Podcast '
      + 'feed from my RSS to JSON Proxy. It uses React to format the podast list and the '
      + 'react-player library to handle generating the proper html to play a podcast when '
      + 'it is selected.',
    libraries: ['react', 'axios', 'babel', 'webpack'],
  },
  {
    title: 'SVG Bar Chart of GDP',
    url: 'https://dan-mba.github.io/samples/d3BarChart/chart.html',
    source: 'https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/d3BarChart',
    description:
      'This application uses the D3 JavaScript library to display a bar chart '
      + 'of quarterly US GDP values. It takes data from a json file and converts it '
      + 'to SVG for display.',
    libraries: ['jquery', 'd3'],
  },
  {
    title: 'GPS Static Fleet Map',
    url: 'https://dan-mba.github.io/samples/fleetmap/fleetmap.html',
    source: 'https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/fleetmap',
    description:
      'This application takes data from the GPS provider (simulated for this example) & displays '
      + 'it on a map. It uses the Google Static Maps API, because at the time it could be used '
      + 'for free without a key. Because this API provides static images, I had to develop an '
      + 'interface to allow you to zoom & move around the map. I also needed to determine the '
      + 'geographical center and maximum & minimum latitude & longitude to ensure all items '
      + 'would be displayed on the initial map.',
    apiname: 'Google Static Maps API',
    apisite: 'https://developers.google.com/maps/documentation/static-maps/',
    libraries: ['jquery'],
  },
  {
    title: 'GPS JavaScript Fleet Map',
    url: 'https://dan-mba.github.io/samples/fleetmapjs/fleetmap.html',
    source: 'https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/fleetmapjs',
    description:
      'An updated version of the Static Fleet Map developed using the Google Maps JavaScript API. '
      + 'Using the JavaScript API allowed me to create a map with clickable location markers to '
      + 'display the relevant data right on the map in an info bubble.',
    apiname: 'Google Maps JavaScript API',
    apisite: 'https://developers.google.com/maps/documentation/javascript/',
    libraries: [],
  },
  {
    title: 'IBM Career Carousel',
    url: 'https://dan-mba.github.io/samples/bootstrap_carousel/Carousel.html',
    source: 'https://github.com/dan-mba/dan-mba.github.io/tree/master/samples/bootstrap_carousel',
    description:
      'This application uses the Bootstrap carousel component to display a slideshow of '
      + 'images & descriptions from the different parts of my IBM career.',
    libraries: ['jquery', 'bootstrap'],
  },
];

export default SAMPLES;
