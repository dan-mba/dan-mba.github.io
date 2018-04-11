const endpoint = "https://one.nhtsa.gov/webapi/api/Recalls/vehicle";
const datatype = "?format=json";

class Year extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoaded : false,
      years : []
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e){
    const year = e.target.value;
    this.props.onChange(year);
  }
  
  componentDidMount(){
    var xhr = $.ajax({ url: endpoint+datatype,
                       dataType: 'jsonp'
                    });
    xhr.done( function(data) {
      var newYears = [];
      
      for(var i=0; i < data.Count; i++) {
        newYears.push(data.Results[i].ModelYear);
      }
      
      this.setState({ isLoaded: true, years : newYears });
    }.bind(this));
  }
  
  render() {
    var modelYears = [];
    if(this.state.isLoaded) {
      modelYears = this.state.years.map((year) =>
        <option value={year} key={year.toString()}>
          {year}
        </option>
      );
    }
    
    return (
      <select
        id="year"
        onChange={this.handleChange}>
        
        <option value="">Year:</option>
        {modelYears}
      </select>
    );
  } 
}


class Make extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoaded : false,
      year: "",
      makes : []
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e){
    const make = e.target.value;
    this.props.onChange(make);
  }
  
  componentDidUpdate(){
    const year = this.props.year;
    if((this.state.isLoaded && (year == this.state.year)) || (year.length == 0)) return;
    var xhr = $.ajax({ url: endpoint+'/modelyear/'+year+datatype,
                       dataType: 'jsonp'
                    });
    xhr.done( function(data) {
      var newMakes = [];
      
      for(var i=0; i < data.Count; i++) {
        newMakes.push(data.Results[i].Make);
      }
      
      this.setState({ isLoaded: true, makes : newMakes, year: data.Results[0].ModelYear });
    }.bind(this));
  }
  
  render() {
    var makes = [];
    if(this.state.isLoaded &&(this.props.year == this.state.year)) {
      makes = this.state.makes.map((make) =>
        <option value={make.replace('/&/g','_')} key={make}>
          {make}
        </option>
      );
    }
    
    return (
      <select
        id="make"
        defaultValue=""
        onChange={this.handleChange}>
        
        <option value="">Make:</option>
        {makes}
      </select>
    );
  } 
}

class Model extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoaded : false,
      year: "",
      make: "",
      models : []
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e){
    const model = e.target.value;
    this.props.onChange(model);
  }
  
  componentDidUpdate(){
    const year = this.props.year;
    const make = this.props.make;
    
    if((this.state.isLoaded && (year == this.state.year) && (make == this.state.make)) || 
      (year.length == 0) || (make.length == 0)) return;
    
    var self = this;
    var xhr = $.ajax({ url: endpoint+'/modelyear/'+year+'/make/'+make+datatype,
                       dataType: 'jsonp',
                       year: year,
                       make: make
                    });
    xhr.done( function(data) {
      var newModels = [];
      
      for(var i=0; i < data.Count; i++) {
        newModels.push(data.Results[i].Model);
      }
      
      self.setState({ isLoaded: true, modelss : newModels, year: this.year, make: this.make });
    });
  }
  
  render() {
    var models = [];
    if(this.state.isLoaded && (this.props.year == this.state.year) && (this.props.model == this.state.model)) {
      models = this.state.modelss.map((model) =>
        <option value={model.replace('/&/g','_')} key={model}>
          {model}
        </option>
      );
    }
    
    return (
      <select
        id="model"
        defaultValue=""
        onChange={this.handleChange}>
        
        <option value="">Model:</option>
        {makes}
      </select>
    );
  } 
}

class Recall extends React.Component{
  constructor(props) {
    super(props);
    
    this.state = { year: "", make: "", model: "" }
    this.changeYear = this.changeYear.bind(this);
    this.changeMake = this.changeMake.bind(this);
  }
  
  changeYear(newYear) {
    this.setState({ year: newYear, make: "", model: ""});
  }
  
  changeMake(newMake) {
    this.setState({make: newMake, model: ""});
  }
  
  changeModel(newModel) {
    this.setState({model: newModel});
  }
  
  render() {
    return (
      <div>
        <Year onChange={this.changeYear} />
        <Make onChange={this.changeMake} year={this.state.year} />
        <Model onChange={this.changeModel} year={this.state.year} make={this.state.make} />
      </div>
    );
  }
}

ReactDOM.render(
  <Recall/>,
  document.getElementById('main-div')
);
