import React, {Component} from 'react';

class GetUrls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/get_shortened_urls")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });
    }

    render() {
        
        let {isLoaded, items} = this.state;

        if(!isLoaded) {
            return <div>Loading...</div>
        }

        else{
            return (
                <div className="App">
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>
                                Original Url: {item.original_url} | Shortened Url: {item.short_url} | Visits: {item.visit}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default GetUrls;
