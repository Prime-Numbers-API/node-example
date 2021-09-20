require("dotenv").config()
let bodyParser = require("body-parser")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
//API middlewares 

//equivalent of fetch in node
const unirest = require("unirest");

//helping unirest to make secure or unsecure connection
const https = require("https");
const http = require("http");
//events is helping node to store the data
const events = require("events");

const { NODE_ENV, apiKey } = require("./config");


const app = express();

const morganOption = (NODE_ENV === 'development')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet());
app.use(express.static('public'));


app.use(bodyParser.json());

/////////////////////////////////////////////////////////////////////////////////////////
//external API calls
/////////////////////////////////////////////////////////////////////////////////////////



let get_random_prime_api_call = function (get_random_prime_apiKey, get_random_prime_check_start, get_random_prime_check_end, get_random_prime_include_explanations, get_random_prime_include_prime_types_list, get_random_prime_language) {
    let emitter = new events.EventEmitter();
    let requestString = `http://api.prime-numbers.io/get-random-prime.php?key=${get_random_prime_apiKey}&start=${get_random_prime_check_start}&end=${get_random_prime_check_end}&include_explanations=${get_random_prime_include_explanations}&include_prime_types_list=${get_random_prime_include_prime_types_list}&language=${get_random_prime_language}`
    unirest
        .get(requestString)
        .end(function (result) {
            if (result.status === 200) {
                // console.log(result.body);
                emitter.emit("end", result.body);
            }
            else {
                emitter.emit("error", result.status);
            }
        });
    return emitter;
};

/////////////////////////////////////////////////////////////////////////////////////////
// local API endpoints
/////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/get-random-prime/:get_random_prime_apiKey/:get_random_prime_check_start/:get_random_prime_check_end/:get_random_prime_include_explanations/:get_random_prime_include_prime_types_list/:get_random_prime_language", function (req, res) {
    //external api function call and response
    let searchReq = get_random_prime_api_call(req.params.get_random_prime_apiKey, req.params.get_random_prime_check_start, req.params.get_random_prime_check_end, req.params.get_random_prime_include_explanations, req.params.get_random_prime_include_prime_types_list, req.params.get_random_prime_language);

    //get the data from the first api call
    searchReq.on("end", function (results) {
        res.json(results);
    });

    //error handling
    searchReq.on("error", function (code) {
        res.sendStatus(code);
    });
});



//log errors for development

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV != 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app;