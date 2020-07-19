import React, {Component} from "react"
import {Link} from 'react-router-dom'
import axios from 'axios'


const Api = props => { 
    return (
        <tr> 
            <td> {props.api.api_endpoint} </td> 
            <td> {props.api.api_proprietary} </td>
            <td> {props.api.api_description} </td> 
        </tr>
    )
}

export default class ApiList extends Component {
    constructor(props) { 
        super(props)

        this.state = {
            apis: []
        }
    }


    componentDidMount() {
        fetch('/apis')
        .then(res => res.json())
        .then(data => {
            this.setState({apis: data})
        })
        .catch( err => { 
            console.log(err)
        })
    }
    
    apiList() { 
        return this.state.apis.map( (api, i) => { 
            return <Api api={api} key={i} />
        })
    }


    render() { 
        return (
            <div>
                <h3> Listed Apis! </h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Endpoint</th>
                            <th>Proprietary </th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.apiList() }
                    </tbody>
                </table>
            </div>
        ) 
    }
}
