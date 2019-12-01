import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg';
import './App.css';

const axios = require('axios');



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

var appState;

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchThis();
  }

  fetchThis(){
     axios.get('https://data.cityofnewyork.us/resource/43nn-pn8j.json', {
            params: {
                "$limit" : 10,
                "$$app_token" : "rwWEn2Tw493ASSX8bzGjwuz8O",
                "zipcode": 11213    
            }
          })
          .then((response) => {


            appState = response.data;
            this.setState({
              data: response
            }, () =>{

            });
            return;
          })
          .catch((error) => {
            console.log(error);
          });
    }


  getNameAndGrade(name, grade){

    return(
      <Grade name={name} grade={grade} />
    );
    
  }

  render(){

    console.log("render method", this.state);
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

      { 
        this.state.data ? 
        this.getNameAndGrade(this.state.data.data[0].dba, this.state.data.data[0].grade)
        : this.getNameAndGrade()
      }

      </div>
    );
  }
}

class Grade extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: this.props.name,
      grade: this.props.grade
    };
    
  }

  render (){
    return (
      <div>
        <h1>Name: {this.props.name}</h1>
        <h1>Grade: {this.props.grade}</h1>
      </div>
    ); 
  }
}


ReactDOM.render(<App />, document.getElementById('root'));

