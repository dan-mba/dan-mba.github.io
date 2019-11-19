const SAMPLES = [
  {
    title: 'NHTSA Safety Ratings',
    url: 'https://dan-mba.github.io/vue-nhtsa/',
    source: 'https://github.com/dan-mba/vue-nhtsa',
    description:
      'This application accesses data from the NHTSA 5 Star Safety Ratings REST API and '
      + 'uses Vue to display the available data for the vehicle model selected.',
    apiname: 'NHTSA Safety Ratings API',
    apisite: 'https://one.nhtsa.gov/webapi/Default.aspx?SafetyRatings/API/5',
    libraries: ['axios-jsonp', 'vue', 'fontawesome'],
  },
  {
    title: 'NHTSA Recalls',
    url: 'https://dan-mba.github.io/react-nhtsa/',
    source: 'https://github.com/dan-mba/react-nhtsa',
    description:
      'This application uses the React JavaScript library to display data from the NHTSA Recall '
      + 'REST API for the selected model. It also styles the select menus using CSS only.',
    apiname: 'NHTSA Recalls API',
    apisite: 'https://one.nhtsa.gov/webapi/Default.aspx?Recalls/API/83',
    libraries: ['react', 'jquery', 'fontawesome'],
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
    url: 'https://dan-mba.github.io/vue-rss-espn/',
    source: 'https://github.com/dan-mba/vue-rss-espn',
    description:
      'This app uses axios to obtain a JSON conversion of the ESPN AFC South NFL news feed from '
      + 'my RSS to JSON proxy. It uses Vue.js to format the items to display the images & text '
      + 'and link to thefull articles for each story.',
    libraries: ['vue', 'axios'],
  },
  {
    title: 'ESPN Podcast Player',
    url: 'https://dan-mba.github.io/react-podcast-espn/',
    source: 'https://github.com/dan-mba/react-podcast-espn',
    description:
      'This app uses axios to retrieve a JSON version of the ESPN Fantasy Focus Football Podcast '
      + 'feed from my RSS to JSON Proxy. It uses React to format the podast list and the '
      + 'react-player library to handle generating the proper html to play a podcast when '
      + 'it is selected.',
    libraries: ['react', 'axios'],
  },
  {
    title: 'SVG Bar Chart of GDP',
    url: 'https://dan-mba.github.io/d3-gdp-barchart/',
    source: 'https://github.com/dan-mba/d3-gdp-barchart',
    description:
      'This application uses the D3 JavaScript library to display a bar chart '
      + 'of quarterly US GDP values. It takes data from a json file and converts it '
      + 'to SVG for display.',
    libraries: ['jquery', 'd3'],
  },
];

export default SAMPLES;
