import React, {Component} from 'react';
import axios from 'axios'

class ShortUrls extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			url : '',
			short_url : ''
		}
	}

	changeHandler = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}

	submitHandler = (e) => {
		e.preventDefault()
		console.log(this.state)
		axios.post('http://127.0.0.1:8000/api/url_shortener', this.state,)
			.then(response => {
				console.log(response.data.short_url)
				this.setState({
					short_url: response.data.short_url
				})
			})
			.catch(error =>{
				console.log(error)
			})
	}

	render() {
		const { url } = this.state;
		return (
			<div>
				<form onSubmit={this.submitHandler}>
					<div>
						<input 
							type='text' 
							name='url'
							value={url} 
							onChange={this.changeHandler}
						/>
					</div>
					<button type='submit'>submit</button>
				</form>
				<div>
					<p>Short Url: {this.state.short_url}</p>
				</div>
			</div>
		);
	}
}

export default ShortUrls;
  