$(document).ready(function() {

	$("#search-btn").on("click", function() {
		var stateId = "FL";
		console.log(stateId);

		//assign the API link to this variable
		// var queryURL = "https://api.propublica.org/congress/v1/102-115/house/members.json";

		// var queryURL = "https://api.propublica.org/congress/v1/members/senate/" + stateId + "/current.json";

		var queryURL = "https://api.propublica.org/congress/v1/80-115/senate/members.json";
	    // console.log(queryURL);

		$.ajax({
	         url: queryURL,
	         method: "GET",
	         dataType: 'json',
	         headers: {'X-API-Key': '45Jqi2YUkG5u36euvspZI9yLR0dAOrz545XRSwW1'}
	       }).done(function(data){
	       		console.log(data);
	       		// console.log(data.results.members[1].last_name);
	       });



	});




});