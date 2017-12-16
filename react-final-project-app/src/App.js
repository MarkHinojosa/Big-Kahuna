// npm install react-shapes --save
// https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2
import React, {Component} from 'react';
// import {Rectangle} from 'react-shapes';
import './App.css';
import avatar from './daftCat.png';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentTurn: 1,
      profiles: [{
          shown: "",
          url: "",
      }],

    };
    this.handleOnClick = this.handleOnClick.bind(this)
    const testCopy = this.state.profiles;
  }
  componentDidMount() {
    fetch('https://randomuser.me/api/?results=15')
    .then((response) => response.json())
    .then((responseJson) => responseJson.results)
    .then(newArr => newArr.concat(newArr))
    .then(doubledArr => doubledArr.sort(() => Math.random() * 2 - 1))
    .then(results => {
      return results.map((profile) => {
        return ({
          url: profile.picture.large,
          shown: avatar,
        })
      })
    })
    .then(doubledArr => this.setState({ profiles: doubledArr }))
  }

  handleOnClick = (data, index) => {
    const that = this;
    const shownArr = this.state.profiles.map((profileIndex) => profileIndex.shown);
    const copy = [...that.state.profiles];
    if(this.state.currentTurn === 1){
      let localCopy = copy;
      if(this.state.profiles[index].shown === avatar){
        localCopy[index].shown = this.state.profiles[index].url;
        this.setState({ profiles: localCopy })
        this.setState({currentTurn: 2})
        this.setState({copyShown: copy1})

      }
    }
    if(this.state.currentTurn === 2 && this.state.profiles[index].shown === avatar ){
      if(shownArr.includes(data.url)){
        let localCopy = copy;
        localCopy[index].shown = this.state.profiles[index].url;
        this.setState({ profiles: localCopy })
        alert("MATCH!")} else {
          //need to reset state back to original
          console.log("line 57")
      };
    }
}
  renderprofiles() {
    const {profiles} = this.state;
    if (profiles.length) {
      return (
        profiles.map((obj, key) => {
          return (
            <div key={key}>
              <img src={profiles[key].shown} onClick={() => this.handleOnClick(obj, key)}/>
             </div>
          )
        })
      )
    }
  }

  render() {
    return (
      <div className="ui container">
        <div className="body">
          {this.renderprofiles()}
        </div>
      </div>
    )
  }
}

export default App;
