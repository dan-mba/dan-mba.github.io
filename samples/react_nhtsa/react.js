"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var endpoint = "https://one.nhtsa.gov/webapi/api/Recalls/vehicle";
var datatype = "?format=json";

/**********
Year Component
Gets year data from server & generates select statement
**********/

var Year = function (_React$Component) {
  _inherits(Year, _React$Component);

  function Year(props) {
    _classCallCheck(this, Year);

    var _this = _possibleConstructorReturn(this, (Year.__proto__ || Object.getPrototypeOf(Year)).call(this, props));

    _this.state = {
      isLoaded: false,
      years: []
    };

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(Year, [{
    key: "handleChange",
    value: function handleChange(e) {
      var year = e.target.value;
      this.props.onChange(year);
      $("select").blur();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
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
  }, {
    key: "render",
    value: function render() {
      var modelYears = [];
      if (this.state.isLoaded) {
        modelYears = this.state.years.map(function (year) {
          return React.createElement(
            "option",
            { value: year, key: year.toString() },
            year
          );
        });
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
  }]);

  return Year;
}(React.Component);

/**********
Make Componet
Gets make data from server & generates select statement
**********/


var Make = function (_React$Component2) {
  _inherits(Make, _React$Component2);

  function Make(props) {
    _classCallCheck(this, Make);

    var _this2 = _possibleConstructorReturn(this, (Make.__proto__ || Object.getPrototypeOf(Make)).call(this, props));

    _this2.state = {
      isLoaded: false,
      year: "",
      makes: []
    };

    _this2.handleChange = _this2.handleChange.bind(_this2);
    return _this2;
  }

  _createClass(Make, [{
    key: "handleChange",
    value: function handleChange(e) {
      var make = e.target.value;
      this.props.onChange(make);
      $("select").blur();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var year = this.props.year;
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
  }, {
    key: "render",
    value: function render() {
      var makes = [];
      if (this.state.isLoaded && this.props.year == this.state.year) {
        makes = this.state.makes.map(function (make) {
          return React.createElement(
            "option",
            { value: make.replace('/&/g', '_'), key: make },
            make
          );
        });
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
  }]);

  return Make;
}(React.Component);

/**********
Model Component
Gets Model options from server & generates select statement
**********/


var Model = function (_React$Component3) {
  _inherits(Model, _React$Component3);

  function Model(props) {
    _classCallCheck(this, Model);

    var _this3 = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this, props));

    _this3.state = {
      isLoaded: false,
      year: "",
      make: "",
      models: []
    };

    _this3.handleChange = _this3.handleChange.bind(_this3);
    return _this3;
  }

  _createClass(Model, [{
    key: "handleChange",
    value: function handleChange(e) {
      var model = e.target.value;
      this.props.onChange(model);
      $("select").blur();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var year = this.props.year;
      var make = this.props.make;

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
  }, {
    key: "render",
    value: function render() {
      var models = [];
      if (this.state.isLoaded && this.props.year == this.state.year && this.props.model == this.state.model) {
        models = this.state.models.map(function (model) {
          return React.createElement(
            "option",
            { value: model.replace('/&/g', '_'), key: model },
            model
          );
        });
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
  }]);

  return Model;
}(React.Component);

/**********
Campaign Component
Gets campaign data from server & displays it
**********/


var Campaign = function (_React$Component4) {
  _inherits(Campaign, _React$Component4);

  function Campaign(props) {
    _classCallCheck(this, Campaign);

    var _this4 = _possibleConstructorReturn(this, (Campaign.__proto__ || Object.getPrototypeOf(Campaign)).call(this, props));

    _this4.state = {
      isLoaded: false,
      year: "",
      make: "",
      model: "",
      campaigns: []
    };
    return _this4;
  }

  _createClass(Campaign, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var year = this.props.year;
      var make = this.props.make;
      var model = this.props.model;

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
  }, {
    key: "render",
    value: function render() {
      var campaigns = [];
      var d = function d(date) {
        var newDate = new Date(parseInt(date.substr(6)));
        return newDate.toString().split(" ").slice(0, 4).join(" ");
      };

      var bStyle = { fontWeight: 'bold' };
      var tStyle = { fontWeight: 'bold', textAlign: 'center' };
      if (this.state.campaigns.length) {
        campaigns = this.state.campaigns.map(function (campaign) {
          return React.createElement(
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
          );
        });
      }

      return React.createElement(
        "div",
        { className: "campaignBox" },
        campaigns
      );
    }
  }]);

  return Campaign;
}(React.Component);

/**********
Recall Componet
Parent component that handles the communication between the children
**********/


var Recall = function (_React$Component5) {
  _inherits(Recall, _React$Component5);

  function Recall(props) {
    _classCallCheck(this, Recall);

    var _this5 = _possibleConstructorReturn(this, (Recall.__proto__ || Object.getPrototypeOf(Recall)).call(this, props));

    _this5.state = { year: "", make: "", model: "", parent: 0 };
    _this5.changeYear = _this5.changeYear.bind(_this5);
    _this5.changeMake = _this5.changeMake.bind(_this5);
    _this5.changeModel = _this5.changeModel.bind(_this5);
    return _this5;
  }

  _createClass(Recall, [{
    key: "changeYear",
    value: function changeYear(newYear) {
      this.setState({ year: newYear, make: "", model: "" });
    }
  }, {
    key: "changeMake",
    value: function changeMake(newMake) {
      this.setState({ make: newMake, model: "" });
    }
  }, {
    key: "changeModel",
    value: function changeModel(newModel) {
      this.setState({ model: newModel });
    }
  }, {
    key: "render",
    value: function render() {
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
  }]);

  return Recall;
}(React.Component);

ReactDOM.render(React.createElement(Recall, null), document.getElementById('main-div'));
