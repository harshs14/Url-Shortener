import React, {Component} from 'react';
import GetUrls from "./components/GetUrlsComponent";
import ShortUrls from "./components/ShortUrlsComponent";
// import axios from 'axios'
// import './App.css';

class App extends Component {
	constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoaded: false,
        }
    }

	getUrls = () => {
		fetch("https://url-shortener-app-v1.herokuapp.com/api/get_shortened_urls")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });
	}

  	render() {
		return (
			<div className="App container" style={{}}>
				<div className="row">
					<h1 style={{margin: "2% 35%"}}>URL SHORTENER</h1>
					</div>
				<div className="row" >
					<div className="col" style={{}}>
						<GetUrls data={this.state.items} getUrls={this.getUrls}/>
					</div>
					<div className="col">
						<ShortUrls getUrls={this.getUrls}/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
  