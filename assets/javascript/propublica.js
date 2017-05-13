$(document).ready(function() {

	function proPublicaAPI (state) {
		var stateId = state;
		console.log(stateId);

		var queryURL = "https://api.propublica.org/congress/v1/members/house/" + stateId +"/current.json";

		// var queryURL = "https://api.propublica.org/congress/v1/members/senate/" + stateId +"/current.json";

		// var queryURL = "https://api.propublica.org/congress/v1/80-115/senate/members.json";
	    console.log(queryURL);

		$.ajax({
	         url: queryURL,
	         method: "GET",
	         dataType: 'json',
	         headers: {'X-API-Key': '45Jqi2YUkG5u36euvspZI9yLR0dAOrz545XRSwW1'}
	       }).done(function(data){
	       		var propublicaResults = data.results;
	       		console.log(propublicaResults);
	       		console.log(data.results[0].name);
	       		for (var i = 0; i < propublicaResults.length; i++) {
	       			$("#profiles").append("<p>" + data.results[i].name + "</p>" );
	       		}
	       });



	};




});