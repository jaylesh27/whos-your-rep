function proPublicaAPI (state) {
	var stateId = state;
	//console.log(stateId);

	var queryURL = "https://api.propublica.org/congress/v1/members/house/" + stateId +"/current.json";

	$.ajax({
         url: queryURL,
         method: "GET",
         dataType: 'json',
         headers: {'X-API-Key': '45Jqi2YUkG5u36euvspZI9yLR0dAOrz545XRSwW1'}

       }).done(function(data) {
       		var propublicaResults = data.results;
       		//console.log(propublicaResults);
       		for (var i = 0; i < propublicaResults.length; i++) {
       			$("#profiles").append(

					// "<div class='card medium'>" +
					// 	"<div class='card-image'>" + 
					// 		"<img src='https://twitter.com/" + propublicaResults[i].twitter_id +"/profile_image?size=original'>" +
					// 		"<span class = 'card-title'>" + 
					// 			propublicaResults[i].name +
					// 		"</span>" +
					// 	"</div>" + 
					// 	"<div class='card-content'>" + 
					// 		"<p>A useless congressman</p>" + 
					// 	"</div>" +
					// "</div>"

					"<li>" + 
						"<div class='collapsible-header rep' id = 'rep-"+i+"'>" + 
							propublicaResults[i].name + 
						"</div>" + 
						"<div class='collapsible-body'>" +
						"<span>" +
							"<img src='https://twitter.com/" + propublicaResults[i].twitter_id +"/profile_image?size=original'>" +
							"<p>Party: " + propublicaResults[i].party + "</p>" +
							"<p>District: " + propublicaResults[i].district + "</p>" +
						"</span>" + 
						"</div>" +
					"</li>"

	       		);
	       	$("#rep-"+i).attr("rep-ID", propublicaResults[i].id);
	       	console.log($("#rep").attr("rep-ID"));
       		}
       });
};

$("#profiles").on("click", ".rep", function() {
	$('#infoPanel').html('');
	console.log("you clicked on a congressman!");
	var repID = $(this).attr("rep-ID");
	console.log(repID);

	var queryURL = "https://api.propublica.org/congress/v1/members/" + repID + ".json";

	$.ajax({
         url: queryURL,
         method: "GET",
         dataType: 'json',
         headers: {'X-API-Key': '45Jqi2YUkG5u36euvspZI9yLR0dAOrz545XRSwW1'}

       }).done(function(data) {
       		var memberResults = data.results;
       		console.log(memberResults);
       		console.log(memberResults[0].roles[0].votes_with_party_pct);
       		$("#infoPanel").html(memberResults[0].roles[0].votes_with_party_pct);

       });
});
