// let api_base_url = "http://localhost:8000"

$(document).ready(function () {
    // hide everything except logo on page load
    $('.show-error').hide();
    $('.display-results').hide();


    //step 1 get the input from the user for get-isolated-random-prime
    $(".get-isolated-random-prime").submit(function (event) {

        //force JavaScript to handle the submission
        event.preventDefault();

        //get the value from the input box
        let get_isolated_random_prime_apiKey = $("#get-isolated-random-prime-apiKey").val();
        let get_isolated_random_prime_check_minimum_combined_prime_gap = $("#get-isolated-random-prime-minimum-combined-prime-gap").val();
        let get_isolated_random_prime_include_explanations = $("#get-isolated-random-prime-include-explanations").val();
        let get_isolated_random_prime_include_prime_types_list = $("#get-isolated-random-prime-include-prime-types-list").val();
        let get_isolated_random_prime_language = $("#get-isolated-random-prime-language").val();

        // console.log(get_isolated_random_prime_apiKey, get_isolated_random_prime_check_minimum_combined_prime_gap, get_isolated_random_prime_include_explanations, get_isolated_random_prime_include_prime_types_list, get_isolated_random_prime_language)

        //use the value to call the getResults function defined below
        get_isolated_random_prime_api_call(get_isolated_random_prime_apiKey, get_isolated_random_prime_check_minimum_combined_prime_gap, get_isolated_random_prime_include_explanations, get_isolated_random_prime_include_prime_types_list, get_isolated_random_prime_language);
    });

    //step2 using the input from the user make the API call to get the JSON response

    function get_isolated_random_prime_api_call(get_isolated_random_prime_apiKey, get_isolated_random_prime_check_minimum_combined_prime_gap, get_isolated_random_prime_include_explanations, get_isolated_random_prime_include_prime_types_list, get_isolated_random_prime_language) {
        let get_isolated_random_prime_api_url = `http://api.prime-numbers.io/get-isolated-random-prime.php?key=${get_isolated_random_prime_apiKey}&minimum_combined_prime_gap=${get_isolated_random_prime_check_minimum_combined_prime_gap}&include_explanations=${get_isolated_random_prime_include_explanations}&include_prime_types_list=${get_isolated_random_prime_include_prime_types_list}&language=${get_isolated_random_prime_language}`

        console.log(get_isolated_random_prime_api_url)

        fetch(get_isolated_random_prime_api_url)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
              return response.json().then(response => { throw new Error(response.error) })
          })
          .then((responseJson) =>
            get_isolated_random_prime_api_results(responseJson)
          )
          .catch((err) => {
            console.log(err);
            displayError(err, "error-get-isolated-random-prime");
          });
    };
})

//step3 using the JSON response, populate the relevant part of your HTML with the variable inside the JSON

function get_isolated_random_prime_api_results(incomingData) {

    console.log(incomingData);

    //create an empty variable to store a new list item for each result
    let buildHtmlResults = "";
    let counter = 1;
    for (let key in incomingData) {
        // console.log(typeof incomingData[key]);
        if (typeof incomingData[key] == "object") {
            buildHtmlResults += `<tr class="results-get-isolated-random-prime-${key}">`;
            buildHtmlResults += `<th scope="row">${counter}</th>`;
            buildHtmlResults += `<td>${key}</td>`;
            buildHtmlResults += `<td class="${key}">${get_isolated_random_prime_api_results_details(incomingData[key], key)}</td>`;
            buildHtmlResults += `</tr>`;
        }
        else {
            dataOutput = incomingData[key];
            buildHtmlResults += `<tr class="results-get-isolated-random-prime-${key}">`;
            buildHtmlResults += `<th scope="row">${counter}</th>`;
            buildHtmlResults += `<td>${key}</td>`;
            buildHtmlResults += `<td class="${key}">${incomingData[key]}</td>`;
            buildHtmlResults += `</tr>`;
        }
        
        
        counter++;
    }

    //use the html output to show it in the index.html
    $('.results-get-isolated-random-prime-show').html(buildHtmlResults);
    $('.results-get-isolated-random-prime').show();
};

function get_isolated_random_prime_api_results_details(incomingData, parentKey) {

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
