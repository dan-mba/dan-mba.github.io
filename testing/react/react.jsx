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
    if(this.state.isLoaded && (year == this.state.year)) return;
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
    if(this.state.isLoaded &&(this.props.year == this.state.year) {
      makes = this.state.makes.map((make) =>
        <option value={make.replace('/&/g','_')} key={make}>
          {make}
        </option>
      );
    }
    
    return (
      <select
        id="make"
        onChange={this.handleChange}>
        
        <option value="" selected>Make:</option>
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
    this.setState({ year: newYear, make: ""});
  }
  
  changeMake(newMake) {
    this.setState({make: newMake});
  }
  
  render() {
    return (
      <div>
        <Year onChange={this.changeYear} />
        <Make onChange={this.changeMake} year={this.state.year} />
      </div>
    );
  }
}

ReactDOM.render(
  <Recall/>,
  document.getElementById('main-div')
);
