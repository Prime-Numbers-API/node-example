let api_base_url = "http://localhost:8000"

$(document).ready(function () {
    // hide everything except logo on page load
    $('.show-error').hide();
    $('.display-results').hide();


    //step 1 get the input from the user for is-this-number-prime
    $(".is-this-number-prime").submit(function (event) {

        //force JavaScript to handle the submission
        event.preventDefault();

        //get the value from the input box
        let is_this_number_prime_apiKey = $("#is-this-number-prime-apiKey").val();
        let is_this_number_prime_check_number = $("#is-this-number-prime-number-check-number").val();
        let is_this_number_prime_include_explanations = $("#is-this-number-prime-include-explanations").val();
        let is_this_number_prime_include_prime_types_list = $("#is-this-number-prime-include-prime-types-list").val();
        let is_this_number_prime_language = $("#is-this-number-prime-language").val();

        // console.log(is_this_number_prime_apiKey, is_this_number_prime_check_number, is_this_number_prime_include_explanations, is_this_number_prime_include_prime_types_list, is_this_number_prime_language)

        //use the value to call the getResults function defined below
        is_this_number_prime_api_call(is_this_number_prime_apiKey, is_this_number_prime_check_number, is_this_number_prime_include_explanations, is_this_number_prime_include_prime_types_list, is_this_number_prime_language);
    });

    //step2 using the input from the user make the API call to get the JSON response

    function is_this_number_prime_api_call(is_this_number_prime_apiKey, is_this_number_prime_check_number, is_this_number_prime_include_explanations, is_this_number_prime_include_prime_types_list, is_this_number_prime_language) {
        let is_this_number_prime_api_url = `http://api.prime-numbers.io/is-this-number-prime.php?key=${is_this_number_prime_apiKey}&number=${is_this_number_prime_check_number}&include_explanations=${is_this_number_prime_include_explanations}&include_prime_types_list=${is_this_number_prime_include_prime_types_list}&language=${is_this_number_prime_language}`

        console.log(is_this_number_prime_api_url)

        fetch(is_this_number_prime_api_url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then(response => { throw new Error(response.error) })
            })
            .then(responseJson => is_this_number_prime_api_results(responseJson))
            .catch(err => {
                console.log(err);
                displayError(err, "error-is-this-number-prime")
            })
    };
})

//step3 using the JSON response, populate the relevant part of your HTML with the variable inside the JSON

function is_this_number_prime_api_results(incomingData) {

    console.log(incomingData);

    //create an empty variable to store a new list item for each result
    let buildHtmlResults = "";
    let counter = 1;
    for (let key in incomingData) {
        // console.log(typeof incomingData[key]);
        if (typeof incomingData[key] == "object") {
            buildHtmlResults += `<tr class="results-is-this-number-prime-${key}">`;
            buildHtmlResults += `<th scope="row">${counter}</th>`;
            buildHtmlResults += `<td>${key}</td>`;
            buildHtmlResults += `<td class="${key}">${is_this_number_prime_api_results_details(incomingData[key], key)}</td>`;
            buildHtmlResults += `</tr>`;
        }
        else {
            dataOutput = incomingData[key];
            buildHtmlResults += `<tr class="results-is-this-number-prime-${key}">`;
            buildHtmlResults += `<th scope="row">${counter}</th>`;
            buildHtmlResults += `<td>${key}</td>`;
            buildHtmlResults += `<td class="${key}">${incomingData[key]}</td>`;
            buildHtmlResults += `</tr>`;
        }
        
        
        counter++;
    }

    //use the html output to show it in the index.html
    $('.results-is-this-number-prime-show').html(buildHtmlResults);
    $('.results-is-this-number-prime').show();
};

function is_this_number_prime_api_results_details(incomingData, parentKey) {

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
