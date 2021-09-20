let api_base_url = "http://localhost:8000"

$(document).ready(function () {
  // hide everything except logo on page load
  $(".show-error").hide();
  $(".display-results").hide();

  //step 1 get the input from the user for get-all-primes-between-two-numbers
  $(".get-all-primes-between-two-numbers").submit(function (event) {
    //force JavaScript to handle the submission
    event.preventDefault();

    //get the value from the input box
    let get_all_primes_between_two_numbers_apiKey = $(
      "#get-all-primes-between-two-numbers-apiKey"
    ).val();
    let get_all_primes_between_two_numbers_check_start = $(
      "#get-all-primes-between-two-numbers-start"
    ).val();
    let get_all_primes_between_two_numbers_check_end = $(
      "#get-all-primes-between-two-numbers-end"
    ).val();
    let get_all_primes_between_two_numbers_include_explanations = $(
      "#get-all-primes-between-two-numbers-include-explanations"
    ).val();
    let get_all_primes_between_two_numbers_include_prime_types_list = $(
      "#get-all-primes-between-two-numbers-include-prime-types-list"
    ).val();
    let get_all_primes_between_two_numbers_language = $(
      "#get-all-primes-between-two-numbers-language"
    ).val();

    // console.log(get_all_primes_between_two_numbers_apiKey, get_all_primes_between_two_numbers_check_start, get_all_primes_between_two_numbers_include_explanations, get_all_primes_between_two_numbers_include_prime_types_list, get_all_primes_between_two_numbers_language)

    //use the value to call the getResults function defined below
    get_all_primes_between_two_numbers_api_call(
      get_all_primes_between_two_numbers_apiKey,
      get_all_primes_between_two_numbers_check_start,
      get_all_primes_between_two_numbers_check_end,
      get_all_primes_between_two_numbers_include_explanations,
      get_all_primes_between_two_numbers_include_prime_types_list,
      get_all_primes_between_two_numbers_language
    );
  });

  //step2 using the input from the user make the API call to get the JSON response

  function get_all_primes_between_two_numbers_api_call(
    get_all_primes_between_two_numbers_apiKey,
    get_all_primes_between_two_numbers_check_start,
    get_all_primes_between_two_numbers_check_end,
    get_all_primes_between_two_numbers_include_explanations,
    get_all_primes_between_two_numbers_include_prime_types_list,
    get_all_primes_between_two_numbers_language
  ) {
    let get_all_primes_between_two_numbers_api_url = `http://api.prime-numbers.io/get-all-primes-between-two-numbers.php?key=${get_all_primes_between_two_numbers_apiKey}&start=${get_all_primes_between_two_numbers_check_start}&end=${get_all_primes_between_two_numbers_check_end}&include_explanations=${get_all_primes_between_two_numbers_include_explanations}&include_prime_types_list=${get_all_primes_between_two_numbers_include_prime_types_list}&language=${get_all_primes_between_two_numbers_language}`;

    console.log(get_all_primes_between_two_numbers_api_url);

    fetch(get_all_primes_between_two_numbers_api_url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(response => { throw new Error(response.error) })
      })
      .then((responseJson) =>
        get_all_primes_between_two_numbers_api_results(responseJson)
      )
      .catch((err) => {
        console.log(err);
        displayError(err, "error-get-all-primes-between-two-numbers");
      });
  }
});

//step3 using the JSON response, populate the relevant part of your HTML with the variable inside the JSON

function get_all_primes_between_two_numbers_api_results(incomingData) {
  console.log(incomingData);

  //create an empty variable to store a new list item for each result
  let buildHtmlResults = "";
  let counter = 1;
  for (let i = 0; i < incomingData.length; i++) {
    for (let key in incomingData[i]) {
      // console.log(typeof incomingData[key]);
      if (typeof incomingData[i][key] == "object") {
        buildHtmlResults += `<tr class="results-get-all-primes-between-two-numbers-${key}">`;
        buildHtmlResults += `<th scope="row">${counter}</th>`;
        buildHtmlResults += `<td>${key}</td>`;
        buildHtmlResults += `<td class="${key}">${get_all_primes_between_two_numbers_api_results_details(
          incomingData[i][key],
          key
        )}</td>`;
        buildHtmlResults += `</tr>`;
      } else {
        dataOutput = incomingData[i][key];
        buildHtmlResults += `<tr class="results-get-all-primes-between-two-numbers-${key}">`;
        buildHtmlResults += `<th scope="row">${counter}</th>`;
        buildHtmlResults += `<td>${key}</td>`;
        buildHtmlResults += `<td class="${key}">${incomingData[i][key]}</td>`;
        buildHtmlResults += `</tr>`;
      }
      counter++;
    }
  }

  //use the html output to show it in the index.html
  $(".results-get-all-primes-between-two-numbers-show").html(buildHtmlResults);
  $(".results-get-all-primes-between-two-numbers").show();
}

function get_all_primes_between_two_numbers_api_results_details(
  incomingData,
  parentKey
) {
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
  buildHtmlResults += "</table>";

  // console.log(buildHtmlResults);

  return buildHtmlResults;
}

function displayError(errorText, containerClass) {
  // console.log(errorText);

  let buildHtmlError = `<button type="button" class="close" data-dismiss="alert" aria-label="Close">`;
  buildHtmlError += `<span aria-hidden="true">×</span>`;
  buildHtmlError += `</button>`;
  buildHtmlError += `<strong>${errorText}</strong>`;

  $(`.${containerClass}`).html(buildHtmlError);
  $(`.${containerClass}`).show();
}
