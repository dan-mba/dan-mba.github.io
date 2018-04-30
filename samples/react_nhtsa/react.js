const endpoint = "https://one.nhtsa.gov/webapi/api/Recalls/vehicle";
const datatype = "?format=json";

/**********

Year Component
Gets year data from server & generates select statement

**********/
class Year extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      years: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const year = e.target.value;
    this.props.onChange(year);
    $("select").blur();
  }

  componentDidMount() {
    var xhr = $.ajax({ url: endpoint + datatype,
      dataType: 'jsonp'
    });
    xhr.done(function (data) {
      var newYears = [];

      /* Start at 1 because the value at Results[0] is erroneus */
      for (var i = 1; i < data.Count; i++) {
        newYears.push(data.Results[i].ModelYear);
      }

      this.setState({ isLoaded: true, years: newYears });
    }.bind(this));
  }

  render() {
    var modelYears = [];
    if (this.state.isLoaded) {
      modelYears = this.state.years.map(year => React.createElement(
        "option",
        { value: year, key: year.toString() },
        year
      ));
    }

    return React.createElement(
      "div",
      { className: "selectdiv", id: "year" },
      React.createElement(
        "select",
        { onChange: this.handleChange },
        React.createElement(
          "option",
          { value: "" },
          "Year:"
        ),
        modelYears
      )
    );
  }
}

/**********

Make Componet
Gets make data from server & generates select statement

**********/
class Make extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      year: "",
      makes: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const make = e.target.value;
    this.props.onChange(make);
    $("select").blur();
  }

  componentDidUpdate() {
    const year = this.props.year;
    if (this.state.isLoaded && year == this.state.year || year.length == 0) return;
    var xhr = $.ajax({ url: endpoint + '/modelyear/' + year + datatype,
      dataType: 'jsonp'
    });
    xhr.done(function (data) {
      var newMakes = [];

      for (var i = 0; i < data.Count; i++) {
        newMakes.push(data.Results[i].Make);
      }

      this.setState({ isLoaded: true, makes: newMakes, year: data.Results[0].ModelYear });
    }.bind(this));
  }

  render() {
    var makes = [];
    if (this.state.isLoaded && this.props.year == this.state.year) {
      makes = this.state.makes.map(make => React.createElement(
        "option",
        { value: make.replace('/&/g', '_'), key: make },
        make
      ));
    }

    return React.createElement(
      "div",
      { className: "selectdiv", id: "make" },
      React.createElement(
        "select",
        {
          defaultValue: "",
          onChange: this.handleChange },
        React.createElement(
          "option",
          { value: "" },
          "Make:"
        ),
        makes
      )
    );
  }
}

/**********

Model Component
Gets Model options from server & generates select statement

**********/
class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      year: "",
      make: "",
      models: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const model = e.target.value;
    this.props.onChange(model);
    $("select").blur();
  }

  componentDidUpdate() {
    const year = this.props.year;
    const make = this.props.make;

    if (this.state.isLoaded && year == this.state.year && make == this.state.make || year.length == 0 || make.length == 0) return;

    var self = this;
    var xhr = $.ajax({ url: endpoint + '/modelyear/' + year + '/make/' + make + datatype,
      dataType: 'jsonp',
      year: year,
      make: make
    });
    xhr.done(function (data) {
      var newModels = [];

      for (var i = 0; i < data.Count; i++) {
        newModels.push(data.Results[i].Model);
      }

      self.setState({ isLoaded: true, models: newModels, year: this.year, make: this.make });
    });
  }

  render() {
    var models = [];
    if (this.state.isLoaded && this.props.year == this.state.year && this.props.model == this.state.model) {
      models = this.state.models.map(model => React.createElement(
        "option",
        { value: model.replace('/&/g', '_'), key: model },
        model
      ));
    }

    return React.createElement(
      "div",
      { className: "selectdiv", id: "model" },
      React.createElement(
        "select",
        {
          defaultValue: "",
          onChange: this.handleChange },
        React.createElement(
          "option",
          { value: "" },
          "Model:"
        ),
        models
      )
    );
  }
}

/**********

Campaign Component
Gets campaign data from server & displays it

**********/
class Campaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      year: "",
      make: "",
      model: "",
      campaigns: [],
      parent: 0
    };
  }

  componentDidUpdate() {
    const year = this.props.year;
    const make = this.props.make;
    const model = this.props.model;

    var parent_height;
    if (this.state.parent == 0) {
      parent_height = $(parent.window).height() - 75;
      this.setState({ parent: parent_height });
    } else {
      parent_height = this.state.parent;
    }

    var item_height = ReactDOM.findDOMNode(this).offsetHeight + 128;
    $("#samples iframe", window.parent.document).height(Math.max(item_height, parent_height));

    if (this.state.isLoaded && year == this.state.year && make == this.state.make && model == this.state.model) return;
    if (year.length == 0 || make.length == 0 || model.length == 0) {
      if (this.state.isLoaded) this.setState({ isLoaded: false, campaigns: [], make: "", model: "", year: "" });
      return;
    }

    var self = this;
    var xhr = $.ajax({ url: endpoint + '/modelyear/' + year + '/make/' + make + '/model/' + model + datatype,
      dataType: 'jsonp',
      year: year,
      make: make,
      model: model
    });
    xhr.done(function (data) {
      var newCampaigns = data.Results;

      self.setState({ isLoaded: true, campaigns: newCampaigns, year: this.year, make: this.make, model: this.model });
    });
  }

  render() {
    var campaigns = [];
    var d = function (date) {
      var newDate = new Date(parseInt(date.substr(6)));
      return newDate.toString().split(" ").slice(0, 4).join(" ");
    };

    const bStyle = { fontWeight: 'bold' };
    const tStyle = { fontWeight: 'bold', textAlign: 'center' };
    if (this.state.campaigns.length) {
      campaigns = this.state.campaigns.map(campaign => React.createElement(
        "div",
        { key: campaign.NHTSACampaignNumber, className: "campaign" },
        React.createElement(
          "div",
          null,
          React.createElement(
            "span",
            { style: bStyle },
            "Campaign Number"
          ),
          ": ",
          campaign.NHTSACampaignNumber
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "span",
            { style: bStyle },
            "Report Received Date"
          ),
          ": ",
          d(campaign.ReportReceivedDate)
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { style: tStyle },
            "Summary"
          ),
          campaign.Summary
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { style: tStyle },
            "Problem"
          ),
          campaign.Conequence
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { style: tStyle },
            "Remedy"
          ),
          campaign.Remedy
        )
      ));
    }

    return React.createElement(
      "div",
      { className: "campaignBox" },
      campaigns
    );
  }
}

/**********

Recall Componet
Parent component that handles the communication between the children

**********/
class Recall extends React.Component {
  constructor(props) {
    super(props);

    this.state = { year: "", make: "", model: "", parent: 0 };
    this.changeYear = this.changeYear.bind(this);
    this.changeMake = this.changeMake.bind(this);
    this.changeModel = this.changeModel.bind(this);
  }

  changeYear(newYear) {
    this.setState({ year: newYear, make: "", model: "" });
  }

  changeMake(newMake) {
    this.setState({ make: newMake, model: "" });
  }

  changeModel(newModel) {
    this.setState({ model: newModel });
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "selectBox" },
        React.createElement(Year, { onChange: this.changeYear }),
        React.createElement(Make, { onChange: this.changeMake, year: this.state.year }),
        React.createElement(Model, { onChange: this.changeModel, year: this.state.year, make: this.state.make })
      ),
      React.createElement(Campaign, { year: this.state.year, make: this.state.make, model: this.state.model })
    );
  }
}

ReactDOM.render(React.createElement(Recall, null), document.getElementById('main-div'));
