$(document).ready(function() {

	$("#search-btn").on("click", function() {
		var stateId = $(this);
		console.log(stateId);

		//assign the API link to this variable
		// var queryURL = "https://api.propublica.org/congress/v1/102-115/house/members.json";

		var queryURL = "https://api.propublica.org/congress/v1/members/K000388.json";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

			var results = response.data;
			console.log(results);
		});



	});




});