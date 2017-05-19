function appendRepMember (name, party, district, twitterHandle, crID) {
  $('#houseMembers').append(
            '<li class=\"collection-item avatar rep\" crid = ' + crID + ' name='+name+'>' +
                  '<img src="https://twitter.com/' + twitterHandle +'/profile_image?size=original" alt="" class="circle">' +
                  '<span class="title">' + name + '</span>' +
                  '<p>Party: '+ party + ' <br> ' +
                  'District: ' + district + 
                  '</p>' +
              '</li>'
            );
};

function appendSenateMember (name, party, twitterHandle, crID) {
  $('#senateMembers').append(
            '<li class=\"collection-item avatar sen\" crid = ' + crID + ' name='+name+'>' +
                  '<img src="https://twitter.com/' + twitterHandle +'/profile_image?size=original" alt="" class="circle">' +
                  '<span class="title">' + name + '</span>' +
                  '<p>Party: '+ party + ' <br> ' +
                  'Elected: ' + 'placeholder' + 
                  '</p>' +
              '</li>'
            );
}

function clearMembers() {
  $('#senateMembers').empty();
  $('#houseMembers').empty();
}

//use house = house for represtatntives, house = senate for senators
function proPublicaAPI (state, body) {
  var stateId = state;
  console.log('Running ProPublica For ' + state + ' for the ' + body);

  //clear existing senators/representatives

  var queryURL = "https://api.propublica.org/congress/v1/members/" + body + "/" + stateId +"/current.json";

  $.ajax({
         url: queryURL,
         method: "GET",
         dataType: 'json',
         headers: {'X-API-Key': '45Jqi2YUkG5u36euvspZI9yLR0dAOrz545XRSwW1'}
       }).done(function(data) {
          var propublicaResults = data.results;
          console.log(propublicaResults);
          var houseDemocrats = 0;
          var houseRepublicans = 0;
          for (var i = 0; i < propublicaResults.length; i++) {
            if (body == 'house') {
              console.log(propublicaResults[i].crp_id);
              appendRepMember(propublicaResults[i].name, propublicaResults[i].party, propublicaResults[i].district, propublicaResults[i].twitter_id, propublicaResults[i].id);              
            }
            else if (body == 'senate') {
              appendSenateMember(propublicaResults[i].name, propublicaResults[i].party, propublicaResults[i].twitter_id, propublicaResults[i].id);
            }
            if (propublicaResults[i].party === "D") {
              houseDemocrats++;
            }else if (propublicaResults[i].party === "R") {
              houseRepublicans++;
            }
          }
          console.log(houseRepublicans);
          console.log(houseDemocrats);
          drawChart2(houseRepublicans, houseDemocrats);
       });
};

$("#houseMembers").on("click", ".rep", function() {
  $('#infoDiv').html('');
  console.log("you clicked on a congressman!");
  var repID = $(this).attr("crID");
  var name = $(this).attr('name');
  console.log(repID);
  $('#repName').html(name);
  Materialize.toast('Loading ' + name + ', please wait!', 4000);

  var queryURL = 'https://api.propublica.org/congress/v1/members/' + repID + '.json'

  $.ajax({
         url: queryURL,
         method: "GET",
         dataType: 'json',
         headers: {'X-API-Key': '45Jqi2YUkG5u36euvspZI9yLR0dAOrz545XRSwW1'}

       }).done(function(data) {
          var memberResults = data.results;
          console.log('MEMBER RESULTS:');
          console.log('================');
          console.log(memberResults);
          drawChart(memberResults["0"].crp_id);
          Materialize.fadeInImage('#infoDiv');

       });
});

$("#senateMembers").on("click", ".sen", function() {
  $('#infoDiv').html('');
  console.log("you clicked on a congressman!");
  var repID = $(this).attr("crID");
  var name = $(this).attr('name');
  console.log(repID);
  Materialize.toast('Loading ' + name + ', please wait!', 4000);
  $('#repName').html(name);
  var queryURL = 'https://api.propublica.org/congress/v1/members/' + repID + '.json';

  $.ajax({
         url: queryURL,
         method: "GET",
         dataType: 'json',
         headers: {'X-API-Key': '45Jqi2YUkG5u36euvspZI9yLR0dAOrz545XRSwW1'}

       }).done(function(data) {
          var memberResults = data.results;
          console.log(memberResults);
          // console.log(memberResults[0].roles[0].votes_with_party_pct);
          // $("#infoPanel").html(memberResults[0].roles[0].votes_with_party_pct);
          drawChart(memberResults["0"].crp_id);
          Materialize.fadeInImage('#infoDiv');
       });
});


$(document).ready(function(){
$('.carousel.carousel-slider').carousel({fullWidth: true});
});