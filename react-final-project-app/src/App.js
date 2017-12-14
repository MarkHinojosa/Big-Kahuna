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
      profiles: [{
          shown: "",
          url: "",
      }],

    };
    this.handleOnClick = this.handleOnClick.bind(this)
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
          shown: avatar,}

        )
      })
    })
    .then(doubledArr => this.setState({ profiles: doubledArr }))
  }

  handleOnClick = (data, index) => {
    const that = this;

    if(this.state.profiles[index].shown === avatar){
      const copy = [...that.state.profiles];
      copy[index].shown = this.state.profiles[index].url;
      this.setState({profiles: copy})
      // console.log(copy[index])
      //   console.log(copy)
    } else {

    }
    // const {shown} = this.state.profiles[e
    // if (shown === avatar) {
    //   this.setState({
    //     shown: []
    //   })

    //   const tryIt = [...this.state.groupOne];
    //   tryIt[index] = url;
    //   const changeIt = () => {
    //     this.setState({groupOne: tryIt})
    //     this.state.matchArray.push(url)
    //   }
    //   changeIt();
    // }
  }
  renderprofiles() {
    const {profiles} = this.state;
    if (profiles.length) {
      return (
        profiles.map((obj, key) => {
          return (
            <div key={key}>
              <img   src={profiles[key].shown} onClick={() => this.handleOnClick(obj, key)}/>

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
