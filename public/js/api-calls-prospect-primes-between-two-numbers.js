// let api_base_url = "http://localhost:8000"

$(document).ready(function () {
    // hide everything except logo on page load
    $('.show-error').hide();
    $('.display-results').hide();


    //step 1 get the input from the user for prospect-primes-between-two-numbers
    $(".prospect-primes-between-two-numbers").submit(function (event) {

        //force JavaScript to handle the submission
        event.preventDefault();

        //get the value from the input box
        let prospect_primes_between_two_numbers_apiKey = $("#prospect-primes-between-two-numbers-apiKey").val();
        let prospect_primes_between_two_numbers_check_start = $("#prospect-primes-between-two-numbers-start").val();
        let prospect_primes_between_two_numbers_check_end = $("#prospect-primes-between-two-numbers-end").val();
        let prospect_primes_between_two_numbers_include_explanations = $("#prospect-primes-between-two-numbers-include-explanations").val();
        let prospect_primes_between_two_numbers_include_prime_types_list = $("#prospect-primes-between-two-numbers-include-prime-types-list").val();
        let prospect_primes_between_two_numbers_language = $("#prospect-primes-between-two-numbers-language").val();

        // console.log(prospect_primes_between_two_numbers_apiKey, prospect_primes_between_two_numbers_check_start, prospect_primes_between_two_numbers_include_explanations, prospect_primes_between_two_numbers_include_prime_types_list, prospect_primes_between_two_numbers_language)

        //use the value to call the getResults function defined below
        prospect_primes_between_two_numbers_api_call(prospect_primes_between_two_numbers_apiKey, prospect_primes_between_two_numbers_check_start, prospect_primes_between_two_numbers_check_end, prospect_primes_between_two_numbers_include_explanations, prospect_primes_between_two_numbers_include_prime_types_list, prospect_primes_between_two_numbers_language);
    });

    //step2 using the input from the user make the API call to get the JSON response

    function prospect_primes_between_two_numbers_api_call(prospect_primes_between_two_numbers_apiKey, prospect_primes_between_two_numbers_check_start, prospect_primes_between_two_numbers_check_end, prospect_primes_between_two_numbers_include_explanations, prospect_primes_between_two_numbers_include_prime_types_list, prospect_primes_between_two_numbers_language) {
        let prospect_primes_between_two_numbers_api_url = `http://api.prime-numbers.io/prospect-primes-between-two-numbers.php?key=${prospect_primes_between_two_numbers_apiKey}&start=${prospect_primes_between_two_numbers_check_start}&end=${prospect_primes_between_two_numbers_check_end}&include_explanations=${prospect_primes_between_two_numbers_include_explanations}&include_prime_types_list=${prospect_primes_between_two_numbers_include_prime_types_list}&language=${prospect_primes_between_two_numbers_language}`

        console.log(prospect_primes_between_two_numbers_api_url)

        fetch(prospect_primes_between_two_numbers_api_url)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return response.json().then(response => { throw new Error(response.error) })
          })
          .then((responseJson) =>
            prospect_primes_between_two_numbers_api_results(responseJson)
          )
          .catch((err) => {
            console.log(err);
            displayError(err, "error-prospect-primes-between-two-numbers");
          });
    };
})

//step3 using the JSON response, populate the relevant part of your HTML with the variable inside the JSON

function prospect_primes_between_two_numbers_api_results(incomingData) {

    console.log(incomingData);

    //create an empty variable to store a new list item for each result
    let buildHtmlResults = "";
    let counter = 1;
    for (let key in incomingData) {
        // console.log(typeof incomingData[key]);
        if (typeof incomingData[key] == "object") {
            buildHtmlResults += `<tr class="results-prospect-primes-between-two-numbers-${key}">`;
            buildHtmlResults += `<th scope="row">${counter}</th>`;
            buildHtmlResults += `<td>${key}</td>`;
            buildHtmlResults += `<td class="${key}">${prospect_primes_between_two_numbers_api_results_details(incomingData[key], key)}</td>`;
            buildHtmlResults += `</tr>`;
        }
        else {
            dataOutput = incomingData[key];
            buildHtmlResults += `<tr class="results-prospect-primes-between-two-numbers-${key}">`;
            buildHtmlResults += `<th scope="row">${counter}</th>`;
            buildHtmlResults += `<td>${key}</td>`;
            buildHtmlResults += `<td class="${key}">${incomingData[key]}</td>`;
            buildHtmlResults += `</tr>`;
        }
        
        
        counter++;
    }

    //use the html output to show it in the index.html
    $('.results-prospect-primes-between-two-numbers-show').html(buildHtmlResults);
    $('.results-prospect-primes-between-two-numbers').show();
};

function prospect_primes_between_two_numbers_api_results_details(incomingData, parentKey) {

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
