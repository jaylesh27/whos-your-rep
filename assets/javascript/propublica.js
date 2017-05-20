function appendRepMember (name, party, district, twitterHandle, crID) {
  $('#houseMembers').append(
            '<li class=\"collection-item avatar rep ' + party + '-bg \" crid = ' + crID + ' name='+name+'>' +
                  '<img src="https://twitter.com/' + twitterHandle +'/profile_image?size=original" alt="" class="circle">' +
                  '<span class="title">' + name + '</span>' +
                  '<p>Party: '+ party + ' <br> ' +
                  'District: ' + district + 
                  '</p>' +
              '</li>'
            );
};

function appendSenateMember (name, party, role, twitterHandle, crID) {
  $('#senateMembers').append(
            '<li class=\"collection-item avatar sen ' + party + '-bg \" crid = ' + crID + ' name='+name+'>' +
                  '<img src="https://twitter.com/' + twitterHandle +'/profile_image?size=original" alt="" class="circle">' +
                  '<span class="title">' + name + '</span>' +
                  '<p>Party: '+ party + ' <br> ' +
                  role + 
                  '</p>' +
              '</li>'
            );
}

function populateFourthPanel(name, twitter, facebook, committees){
  //remove previous info
  $('#contactDiv').html('');
  $('#contactDiv').removeClass('green');
  $('#contactDiv').removeClass('white-text');
  //Populate 4th
  $('#contactDiv').append('<h4>' + name + '</h4>');
  for (var i = 0; i<committees.length; i++) {
    $('#contactDiv').append('<p class = "text-left">' + committees[i] + '</p>');
  }
  $('#contactDiv').append('<h4>Social Media</h4>');
  //if twitter exists, then link it
  if (twitter != '') {
    //pic linked to twitter
    $('#contactDiv').append('<a href="https://twitter.com/'+twitter+'"><img src="assets/images/twitter_bird.png" height="128px" width="154px"></a>');
  }
  //if facebook links, then link it
  if (facebook != '') {
    //pic linked to facebook
    $('#contactDiv').append('<a href="https://www.facebook.com/'+facebook+'"><img src="assets/images/facebook_symbol.png" height="128px" width="128px"></a>');
  }
}

function clearMembers () {
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
          console.log('PRO PUBLICA RESULTS');
          console.log(propublicaResults);
          var houseDemocrats = 0;
          var houseRepublicans = 0;
          for (var i = 0; i < propublicaResults.length; i++) {
            if (body == 'house') {
              console.log(propublicaResults[i].crp_id);
              appendRepMember(propublicaResults[i].name, propublicaResults[i].party, propublicaResults[i].district, propublicaResults[i].twitter_id, propublicaResults[i].id);              
            }
            else if (body == 'senate') {
              appendSenateMember(propublicaResults[i].name, propublicaResults[i].party, propublicaResults[i].role, propublicaResults[i].twitter_id, propublicaResults[i].id);
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
          // populate 4th panel first since we already have info and Open Secets API slow
          var currCommittees = [];
          console.log('Committees');
          for (var j = 0; j < memberResults[0].roles[0].committees.length; j++) {
            currCommittees.push(memberResults[0].roles[0].committees[j].name);
          }

          populateFourthPanel(memberResults[0].first_name + ' ' + memberResults[0].last_name, memberResults[0].twitter_account, memberResults[0].facebook_account, currCommittees);

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
          // populate 4th panel first since we already have info and Open Secets API slow
          var currCommittees = [];
          console.log('Committees');
          for (var j = 0; j < memberResults[0].roles[0].committees.length; j++) {
            currCommittees.push(memberResults[0].roles[0].committees[j].name);
          }

          populateFourthPanel(memberResults[0].first_name + ' ' + memberResults[0].last_name, memberResults[0].twitter_account, memberResults[0].facebook_account, currCommittees);
          //Now populate 3rd panel
          drawChart(memberResults[0].crp_id);
          Materialize.fadeInImage('#infoDiv');
       });
});


$(document).ready(function(){
$('.carousel.carousel-slider').carousel({fullWidth: true});
});