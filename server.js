const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const Api = require('./api.model')
const path = require('path')
const cors = require('cors')
const app = express()


const apiRoutes = express.Router()


const PORT = process.env.HTTP_PORT || 8080;

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use(bodyParser.json())
app.use(cors())


const fs = require('fs');
var file_content = fs.readFileSync('config.csv','utf8')
var config_values = file_content.split(',')
var user_name = config_values[0]
var psw = config_values[1]
var cluster = config_values[2]
var db = config_values[3]

const uri = "mongodb+srv://"+user_name+":"+psw+"@"+cluster+".mongodb.net/"+db+"?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true
});

const connection = mongoose.connection;

apiRoutes.route('/').get(function(req,res) { 
    Api.find( (err, apis) => {
        if(err) { 
            console.log(err)
        } else { 
            res.json(apis)
        }
    })
})

apiRoutes.route('/:id').get( function(req, res) { 
    let  id = req.params.id
    Api.findById(id, (err, api) => { 
        res.json(api)
    })
})

apiRoutes.route('/update/:id').post(function(req, res) {
    Api.findById(req.params.id, function(err, api) {
        if (!api)
            res.status(404).send("data is not found");
        else
            api.api_description = req.body.api_description;
            api.api_proprietary = req.body.api_proprietary;
            api.api_endpoint = req.body.api_endpoint;

            api.save().then(todo => {
                res.json('api updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

apiRoutes.route('/add').post(function(req, res) {
    let api = new Api(req.body);
    console.log(api)
    api.save()
        .then(api => {
            res.status(200).json({'api': 'api added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new api failed');
        });
});

app.use('/apis', apiRoutes)

app.listen(PORT, function() { 
    console.log("Server is running on port: " + PORT)
})
