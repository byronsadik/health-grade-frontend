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
            this.setState({
              data: response.data
            });
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


    if (isEmpty(this.state)) {
        return <div>Loading</div>
    }

    let results = this.state.data;
  
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

      {this.getNameAndGrade(results[0].dba, results[0].grade) }

      </div>
    );
  }
}

function Grade(props) {
  return (
    <div>
      <h1>Name: {props.name}</h1>
      <h1>Grade: {props.grade}</h1>
    </div>
  ); 
  
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
