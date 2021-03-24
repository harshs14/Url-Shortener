import React, {Component} from 'react';
import axios from 'axios'
// import {Button} from 'react-bootstrap'

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
		axios.post('https://url-shortener-app-v1.herokuapp.com/api/url_shortener', this.state,)
			.then(response => {
				console.log(response.data.short_url)
				this.setState({
					short_url: response.data.short_url
				})
				this.props.getUrls()
				this.setState({
					url: ''
				})
			})

			.catch(error =>{
				console.log(error)
			})
	}

	render() {
		const { url } = this.state;
		return (
			<div className="container" style={{margin: "10%"}}>
				<form onSubmit={this.submitHandler}>
					<div>
						<span>Enter Url:  </span>
						<input 
							type='text' 
							name='url'
							value={url} 
							onChange={this.changeHandler}
						/>
					</div> <br/>
					<button type='submit' className="btn btn-success">submit</button>
				</form>

				<div>
					{/* <p>Short Url: {this.state.short_url}</p> */}
				</div>
			</div>
		);
	}
}

export default ShortUrls;
  