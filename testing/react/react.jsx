class Greeting extends React.Component{
  render() {
    return (
      <p>Hello World</p>
    );
  }
}

ReactDOM.render(
  <Greeting/>,
  document.getElementById('main-div')
);
