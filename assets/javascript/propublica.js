	function proPublicaAPI (state) {
		var stateId = state;
		console.log(stateId);

		var queryURL = "https://api.propublica.org/congress/v1/members/house/" + stateId +"/current.json";

		// var queryURL = "https://api.propublica.org/congress/v1/members/senate/" + stateId +"/current.json";

		// var queryURL = "https://api.propublica.org/congress/v1/80-115/senate/members.json";
	    //console.log(queryURL);

		$.ajax({
	         url: queryURL,
	         method: "GET",
	         dataType: 'json',
	         headers: {'X-API-Key': '45Jqi2YUkG5u36euvspZI9yLR0dAOrz545XRSwW1'}
	       }).done(function(data){
	       		var propublicaResults = data.results;
	       		console.log(propublicaResults);
	       		//console.log(propublicaResults.results[0].name);
	       		for (var i = 0; i < propublicaResults.length; i++) {


	       			$("#profiles").append(
	       					"<div class='col s12 m6'>" + 
	       						"<div class='card'>" +
	       							"<div class='card-image'>" + 
	       							"<img src='https://twitter.com/" + propublicaResults[i].twitter_id +"/profile_image?size=original'>" +
	       							"<span class = 'card-title'>" + 
	       							propublicaResults[i].name + "</span>" +
	       							"</div>" + 
	       							"<div class='card-content'>" + 
	       							"<p> Above is a very useless congressman</p>" + 
	       							"</div>" +
	       						"</div>" + 
	       					"</div>"
 	       				);
	       		}
	       });

	};