import React, {Component} from 'react';
import GetUrls from "./components/GetUrlsComponent";
import ShortUrls from "./components/ShortUrlsComponent";

class App extends Component {

  	render() {
		return (
			<div className="App">
				<GetUrls />
				<ShortUrls />
			</div>
		);
	}
}

export default App;
  