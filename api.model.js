const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Api = Schema({
    api_endpoint: {
        type: String
    }, 
    api_proprietary: {
        type: String
    },
    api_description: {
        type: String
    }
})

module.exports = mongoose.model('Api', Api)