import React, {Component} from 'react'
import axios from 'axios'

export default class CreateApi extends Component {

    constructor(props) { 
        super(props)

        this.state = {
            api_endpoint: '',
            api_proprietary: '',
            api_description: '',
        }

        this.onChangeApiDescription = this.onChangeApiDescription.bind(this);
        this.onChangeApiProprietary = this.onChangeApiProprietary.bind(this);
        this.onChangeApiEndpoint = this.onChangeApiEndpoint.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeApiEndpoint(e) { 
        this.setState({
            api_endpoint: e.target.value
        })
    }

    onChangeApiProprietary(e) { 
        this.setState({
            api_proprietary: e.target.value
        })
    }

    onChangeApiDescription(e) {
        this.setState({
            api_description:  e.target.value
        })
    }

    onSubmit(e) { 
        e.preventDefault()

        const newApi = {
            api_description: this.state.api_description,
            api_endpoint: this.state.api_endpoint,
            api_proprietary: this.state.api_proprietary
        }

        // axios.post('http://ec2-54-242-182-148.compute-1.amazonaws.com/apis/add', newApi)
        fetch('/apis/add', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newApi),
            })

        this.setState({
            api_endpoint: '', 
            api_proprietary: '',
            api_description: '', 
        })
    }


    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Api Endpoint!</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label> Endpoint: </label>
                        <input type="text"
                              className="form-control"
                              value={this.state.api_endpoint}
                              onChange={this.onChangeApiEndpoint}
                              />
                    </div>

                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.api_description}
                                onChange={this.onChangeApiDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label> Proprietary:  </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.api_proprietary}
                                onChange={this.onChangeApiProprietary}
                                />
                    </div>
                   
                    

                    <div className="form-group">
                        <input type="submit" value="Create Api!" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    } 
    
}
