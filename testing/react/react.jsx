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
  
  handleCahnge(e){
    const year = e.target.value;
    this.props.onChange(year);
  }
  
  componentDidMount(){
    var xhr = $.ajax({ url: endpoint+datatype.
                       dataType: 'jsonp'
                    });
    xhr.done( function(data) {
      var newYears = [];
      
      for(var i=0; i < data.Count; i++) {
        newYears.push(data.results[i].ModelYear);
      }
      
      this.setState({ isLoaded: true, years : newYears });
    });
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
        
        <option value="">Year:</value>
        {modelYears}
      </select>
    );
  } 
}

class Recall extends React.Component{
  constructor(props) {
    super(props);
    
    this.state = { year: "" }
    this.changeYear = this.changeYear.bind(this)
  }
  
  changeYear(newYear) {
    this.setState({ year: newYear});
  }
  
  render() {
    return (
      <div>
        <Year onChange={this.changeYear} />
      </div>
    );
  }
}

ReactDOM.render(
  <Recall/>,
  document.getElementById('main-div')
);
