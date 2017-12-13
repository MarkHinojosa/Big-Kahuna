// npm install react-shapes --save
// https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2
import React, {Component} from 'react';
import {Rectangle} from 'react-shapes';
import './App.css';
import avatar from './daftCat.png';

class App extends Component {
    constructor() {
        super();
        this.state = {
            profiles: [],
            urlArrayOne: [],
            groupOne: Array(30).fill(avatar),
            // matchArray: Array().fill('')
        };
        this.handleOnClick = this.handleOnClick.bind(this)
    }

    componentDidMount() {
        const that = this;
        fetch('https://randomuser.me/api/?results=15')
            .then((response) => response.json())
            .then((responseJson) => responseJson.results)

            // that.setState({profiles: responseJson.results})
            // this.shuffleArray();
            .then(results => {
                console.log('didmount', results);
                return results.map((profile) => {
                    return {
                        url: profile.picture.large,
                        shown: false,

                    }
                })
            })
                    .then(newArr => newArr.concat(newArr))
                    .then(doubledArr => console.log(doubledArr))

    }

    shuffleArray() {
        const {profiles} = this.state;
        if (profiles.length) {
            profiles.sort(() => Math.random() * 2 - 1);
            return profiles.concat(profiles).reverse().map((obj, key) => {
                this.setState({
                    urlArrayOne: [...this.state.urlArrayOne, obj.picture.large,]
                })
            });
        }
    };

    handleOnClick = (e, f) => {
        console.log(e, f)
        const {shown} = this.state;
        if (shown === false) {
            this.setState({
                shown: [...true]
            })
            const url = e.obj;
            const index = f.key;
            const tryIt = [...this.state.groupOne];
            tryIt[index] = url;
            const changeIt = () => {
                this.setState({groupOne: tryIt})
                this.state.matchArray.push(url)
                console.log(this.state.matchArray)
                console.log(this.state.urlArrayOne);

            }
            changeIt();
        }
    }


    renderprofiles() {
        const {urlArrayOne} = this.state;
        if (urlArrayOne.length) {
            return (
                urlArrayOne.map((obj, key) => {
                    return (
                        <div key={key}>
                            <img src={this.state.groupOne[key]} onClick={() => this.handleOnClick({obj}, {key})}/>
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
                <div>

                </div>
            </div>



        )
    }
}

export default App;