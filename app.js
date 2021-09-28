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


let is_this_number_prime_api_call = function (is_this_number_prime_apiKey, is_this_number_prime_check_number, is_this_number_prime_include_explanations, is_this_number_prime_include_prime_types_list, is_this_number_prime_language) {
    let emitter = new events.EventEmitter();
    let requestString = `http://api.prime-numbers.io/is-this-number-prime.php?key=${is_this_number_prime_apiKey}&number=${is_this_number_prime_check_number}&include_explanations=${is_this_number_prime_include_explanations}&include_prime_types_list=${is_this_number_prime_include_prime_types_list}&language=${is_this_number_prime_language}`
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



let get_all_primes_between_two_numbers_api_call = function (get_all_primes_between_two_numbers_apiKey, get_all_primes_between_two_numbers_check_start, get_all_primes_between_two_numbers_check_end, get_all_primes_between_two_numbers_include_explanations, get_all_primes_between_two_numbers_include_prime_types_list, get_all_primes_between_two_numbers_language) {
    let emitter = new events.EventEmitter();
    let requestString = `http://api.prime-numbers.io/get-all-primes-between-two-numbers.php?key=${get_all_primes_between_two_numbers_apiKey}&start=${get_all_primes_between_two_numbers_check_start}&end=${get_all_primes_between_two_numbers_check_end}&include_explanations=${get_all_primes_between_two_numbers_include_explanations}&include_prime_types_list=${get_all_primes_between_two_numbers_include_prime_types_list}&language=${get_all_primes_between_two_numbers_language}`
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


let prospect_primes_between_two_numbers_api_call = function (prospect_primes_between_two_numbers_apiKey, prospect_primes_between_two_numbers_check_start, prospect_primes_between_two_numbers_check_end, prospect_primes_between_two_numbers_include_explanations, prospect_primes_between_two_numbers_include_prime_types_list, prospect_primes_between_two_numbers_language) {
    let emitter = new events.EventEmitter();
    let requestString = `http://api.prime-numbers.io/get-all-primes-between-two-numbers.php?key=${prospect_primes_between_two_numbers_apiKey}&start=${prospect_primes_between_two_numbers_check_start}&end=${prospect_primes_between_two_numbers_check_end}&include_explanations=${prospect_primes_between_two_numbers_include_explanations}&include_prime_types_list=${prospect_primes_between_two_numbers_include_prime_types_list}&language=${prospect_primes_between_two_numbers_language}`
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


app.get("/api/is-this-number-prime/:is_this_number_prime_apiKey/:is_this_number_prime_check_number/:is_this_number_prime_include_explanations/:is_this_number_prime_include_prime_types_list/:is_this_number_prime_language", function (req, res) {
    //external api function call and response
    let searchReq = is_this_number_prime_api_call(req.params.is_this_number_prime_apiKey, req.params.is_this_number_prime_check_number, req.params.is_this_number_prime_include_explanations, req.params.is_this_number_prime_include_prime_types_list, req.params.is_this_number_prime_language);

    //get the data from the first api call
    searchReq.on("end", function (results) {
        res.json(results);
    });

    //error handling
    searchReq.on("error", function (code) {
        res.sendStatus(code);
    });
});


app.get("/api/get-all-primes-between-two-numbers/:get_all_primes_between_two_numbers_apiKey/:get_all_primes_between_two_numbers_check_start/:get_all_primes_between_two_numbers_check_end/:get_all_primes_between_two_numbers_include_explanations/:get_all_primes_between_two_numbers_include_prime_types_list/:get_all_primes_between_two_numbers_language", function (req, res) {
    //external api function call and response
    let searchReq = get_all_primes_between_two_numbers_api_call(req.params.get_all_primes_between_two_numbers_apiKey, req.params.get_all_primes_between_two_numbers_check_start, req.params.get_all_primes_between_two_numbers_check_end, req.params.get_all_primes_between_two_numbers_include_explanations, req.params.get_all_primes_between_two_numbers_include_prime_types_list, req.params.get_all_primes_between_two_numbers_language);

    //get the data from the first api call
    searchReq.on("end", function (results) {
        res.json(results);
    });

    //error handling
    searchReq.on("error", function (code) {
        res.sendStatus(code);
    });
});


app.get("/api/prospect-primes-between-two-numbers/:prospect_primes_between_two_numbers_apiKey/:prospect_primes_between_two_numbers_check_start/:prospect_primes_between_two_numbers_check_end/:prospect_primes_between_two_numbers_include_explanations/:prospect_primes_between_two_numbers_include_prime_types_list/:prospect_primes_between_two_numbers_language", function (req, res) {
    //external api function call and response
    let searchReq = prospect_primes_between_two_numbers_api_call(req.params.prospect_primes_between_two_numbers_apiKey, req.params.prospect_primes_between_two_numbers_check_start, req.params.prospect_primes_between_two_numbers_check_end, req.params.prospect_primes_between_two_numbers_include_explanations, req.params.prospect_primes_between_two_numbers_include_prime_types_list, req.params.prospect_primes_between_two_numbers_language);

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
