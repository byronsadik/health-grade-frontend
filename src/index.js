import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg';
import './App.css';

const axios = require('axios');


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchZip();
  }

  fetchZip(){
     axios.get('https://ipapi.co/json/')
          .then((response) => {
            this.setState({
              zip: response.data.postal
            });
          }).then((response) => {
            this.fetchRestaurants();
          })
          .catch((error) => {
            console.log(error);
          }); // end API call
    }

  fetchRestaurants() {
     axios.get('https://data.cityofnewyork.us/resource/43nn-pn8j.json', {
            params: {
                "$limit" : 10,
                "$$app_token" : "rwWEn2Tw493ASSX8bzGjwuz8O",
                "zipcode": this.state.zip  // should be this.state.zip
            }
          })
          .then((response) => {
            this.setState({
              data: response.data
            });
          })
          .catch((error) => {
            console.log(error);
          }); // end API call
  }

  getNameAndGrade(name, grade){
    return(
      <Grade name={name} grade={grade} />
    );
    
  }

  render(){


    // debugger;
    if (isEmpty(this.state.data)) {
        return <div>Loading</div>
    }

    console.log("zip: ", this.state.zip);
    console.log("data: ", this.state.data);

    let results = this.state.data;

    results.map(x => 
        console.log("\n\nname: " + x.dba +
          "\ngrade: " + x.grade
        )
    ); 
  
    return (
      <div className="App">
      { results.map(x => this.getNameAndGrade(x.dba, x.grade)) }
      </div>
    );
  }
}

class Grade extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: this.props.name,
      grade: (this.props.grade === undefined) ? "N/A" : this.props.grade
    };
  }

  render() {
    return (
      <div>
        <h1>Name: {this.state.name}</h1>
        <h1>Grade: {this.state.grade}</h1>
      </div>
    ); 
  }
  
}


ReactDOM.render(<App />, document.getElementById('root'));


function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop)) {
          return false
        };
    }
    return true;
}
