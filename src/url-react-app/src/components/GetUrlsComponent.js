import React, {Component} from 'react';

class GetUrls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
        }
    }

    componentDidMount() {
        this.props.getUrls()
    }

    render() {
        
        // let {isLoaded, items} = this.state;

        // if(!isLoaded) {
        //     return <div>Loading...</div>
        // }

        
        return (
            <div className="container">
                <ul style={{listStyleType: "none"}}>
                    {this.props.data.map(item => (
                        <li key={item.id} >
                            <div style={{border: "2px solid #ccc", boxShadow: "0 2px 2px #eee", fontSize: "16px", padding: "1%", width: "35em", margin: "2%"}}> 
                            Original Url: {item.original_url} <br/>
                            
                            Shortened Url: <a href={'https://url-shortener-app-v1.herokuapp.com/'+item.short_url}>http://127.0.0.1:8000/{item.short_url}</a> <br/>
                            Visits: {item.visit} <br/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default GetUrls;
