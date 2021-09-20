let api_base_url = "http://localhost:8000"

$(document).ready(function () {
    // hide everything except logo on page load
    $('.show-error').hide();
    $('.display-results').hide();


    //step 1 get the input from the user for get-random-prime
    $(".get-random-prime").submit(function (event) {

        //force JavaScript to handle the submission
        event.preventDefault();

        //get the value from the input box
        let get_random_prime_apiKey = $("#get-random-prime-apiKey").val();
        let get_random_prime_check_start = $("#get-random-prime-start").val();
        let get_random_prime_check_end = $("#get-random-prime-end").val();
        let get_random_prime_include_explanations = $("#get-random-prime-include-explanations").val();
        let get_random_prime_include_prime_types_list = $("#get-random-prime-include-prime-types-list").val();
        let get_random_prime_language = $("#get-random-prime-language").val();

        // console.log(get_random_prime_apiKey, get_random_prime_check_start, get_random_prime_include_explanations, get_random_prime_include_prime_types_list, get_random_prime_language)

        //use the value to call the getResults function defined below
        get_random_prime_api_call(get_random_prime_apiKey, get_random_prime_check_start, get_random_prime_check_end, get_random_prime_include_explanations, get_random_prime_include_prime_types_list, get_random_prime_language);
    });

    //step2 using the input from the user, make the API call to get the JSON response

    function get_random_prime_api_call(get_random_prime_apiKey, get_random_prime_check_start, get_random_prime_check_end, get_random_prime_include_explanations, get_random_prime_include_prime_types_list, get_random_prime_language) {
        // let get_random_prime_api_url = `http://api.prime-numbers.io/get-random-prime.php?key=${get_random_prime_apiKey}&start=${get_random_prime_check_start}&end=${get_random_prime_check_end}&include_explanations=${get_random_prime_include_explanations}&include_prime_types_list=${get_random_prime_include_prime_types_list}&language=${get_random_prime_language}`

        let get_random_prime_api_url = `${api_base_url}/api/get-random-prime/${get_random_prime_apiKey}/${get_random_prime_check_start}/${get_random_prime_check_end}/${get_random_prime_include_explanations}/${get_random_prime_include_prime_types_list}/${get_random_prime_language}`

        // console.log(get_random_prime_api_url)


        fetch(get_random_prime_api_url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then(response => { throw new Error(response.error) })
            })
            .then(responseJson => get_random_prime_api_results(responseJson))
            .catch(err => {
                console.log(err);
                displayError(err, "error-get-random-prime")
            });
    };
})

//step3 using the JSON response, populate the relevant part of your HTML with the variable inside the JSON

function get_random_prime_api_results(incomingData) {

    console.log(incomingData);

    //create an empty variable to store a new list item for each result
    let buildHtmlResults = "";
    let counter = 1;
    for (let key in incomingData) {
        // console.log(typeof incomingData[key]);
        if (typeof incomingData[key] == "object") {
            buildHtmlResults += `<tr class="results-get-random-prime-${key}">`;
            buildHtmlResults += `<th scope="row">${counter}</th>`;
            buildHtmlResults += `<td>${key}</td>`;
            buildHtmlResults += `<td class="${key}">${get_random_prime_api_results_details(incomingData[key], key)}</td>`;
            buildHtmlResults += `</tr>`;
        }
        else {
            dataOutput = incomingData[key];
            buildHtmlResults += `<tr class="results-get-random-prime-${key}">`;
            buildHtmlResults += `<th scope="row">${counter}</th>`;
            buildHtmlResults += `<td>${key}</td>`;
            buildHtmlResults += `<td class="${key}">${incomingData[key]}</td>`;
            buildHtmlResults += `</tr>`;
        }
        
        
        counter++;
    }

    //use the html output to show it in the index.html
    $('.results-get-random-prime-show').html(buildHtmlResults);
    $('.results-get-random-prime').show();
};

function get_random_prime_api_results_details(incomingData, parentKey) {

    // console.log(incomingData);

    //create an empty variable to store a new list item for each result
    let buildHtmlResults = '<table class="table">';
    let counter = 1;
    for (let key in incomingData) {
        
        buildHtmlResults += `<tr>`;
        buildHtmlResults += `<th scope="row">${counter}</th>`;
        buildHtmlResults += `<td>${key}</td>`;
        buildHtmlResults += `<td>${incomingData[key]}</td>`;
        buildHtmlResults += `</tr>`;

        counter++;
    }
    buildHtmlResults += '</table>';

    // console.log(buildHtmlResults);

    return buildHtmlResults;
};

function displayError(errorText, containerClass) {

    // console.log(errorText);

    let buildHtmlError = `<button type="button" class="close" data-dismiss="alert" aria-label="Close">`;
    buildHtmlError += `<span aria-hidden="true">×</span>`;
    buildHtmlError += `</button>`;
    buildHtmlError += `<strong>${errorText}</strong>`;

    $(`.${containerClass}`).html(buildHtmlError);
    $(`.${containerClass}`).show();
};
