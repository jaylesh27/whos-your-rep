// Load the Visualization API and the corechart package
google.charts.load('current', {packages: ['corechart']});
// Set a callback to run when the Google Visualization API is loaded
// google.charts.setOnLoadCallback(drawChart);


//TO GO LIVE comment this out, and uncomment AJAX call
var resp ={
  "response":{
     "industries":{
        "@attributes":{
           "cand_name":"Bob Casey (D)",
           "cid":"N00027503",
           "cycle":"2016",
           "origin":"Center for Responsive Politics",
           "source":"http:\/\/www.opensecrets.org\/politicians\/industries.php?cid=N00027503&cycle=2016",
           "last_updated":"02\/01\/2017"
        },
        "industry":[
           {
              "@attributes":{
                 "industry_code":"K01",
                 "industry_name":"Lawyers\/Law Firms",
                 "indivs":"1708098",
                 "pacs":"205233",
                 "total":"1913331"
              }
           },
           {
              "@attributes":{
                 "industry_code":"F07",
                 "industry_name":"Securities & Investment",
                 "indivs":"316650",
                 "pacs":"163700",
                 "total":"480350"
              }
           },
           {
              "@attributes":{
                 "industry_code":"H04",
                 "industry_name":"Pharmaceuticals\/Health Products",
                 "indivs":"115950",
                 "pacs":"359079",
                 "total":"475029"
              }
           },
           {
              "@attributes":{
                 "industry_code":"F10",
                 "industry_name":"Real Estate",
                 "indivs":"345909",
                 "pacs":"59900",
                 "total":"405809"
              }
           },
           {
              "@attributes":{
                 "industry_code":"K02",
                 "industry_name":"Lobbyists",
                 "indivs":"380901",
                 "pacs":"11970",
                 "total":"392871"
              }
           },
           {
              "@attributes":{
                 "industry_code":"W06",
                 "industry_name":"Retired",
                 "indivs":"387741",
                 "pacs":"0",
                 "total":"387741"
              }
           },
           {
              "@attributes":{
                 "industry_code":"F09",
                 "industry_name":"Insurance",
                 "indivs":"147000",
                 "pacs":"220500",
                 "total":"367500"
              }
           },
           {
              "@attributes":{
                 "industry_code":"H01",
                 "industry_name":"Health Professionals",
                 "indivs":"183002",
                 "pacs":"169250",
                 "total":"352252"
              }
           },
           {
              "@attributes":{
                 "industry_code":"H02",
                 "industry_name":"Hospitals\/Nursing Homes",
                 "indivs":"229335",
                 "pacs":"119000",
                 "total":"348335"
              }
           },
           {
              "@attributes":{
                 "industry_code":"Q03",
                 "industry_name":"Leadership PACs",
                 "indivs":"1000",
                 "pacs":"253364",
                 "total":"254364"
              }
           }
        ]
     }
  }
};






function drawChart(crID) {
	console.log('Drawing Chart');
	var openSecretsAPI = '0e11c0ea5a983dc2004af32bd38156c1';

	// var baseQuery = 'https://crossorigin.me/http://www.opensecrets.org/api/?method=candIndustry&output=json&cid=' + crID + '&cycle=2016&apikey='+openSecretsAPI;
	// console.log('Base Query');
	// console.log(baseQuery);
	// $.ajax({
	// 	url: baseQuery,
	// 	method: 'GET',
	// 	dataType: 'json'
	// }).done(function (resp) {
		console.log('Open Secrets API connected, response:');
		//create arrays to store info
		var industrynames=[];
		var totals=[];
		console.log(resp);

		for (var i = 0; i < resp.response.industries.industry.length; i++) {
			industrynames.push(resp.response.industries.industry[i]['@attributes'].industry_name);
			totals.push(resp.response.industries.industry[i]['@attributes'].total);
		}

		//create Rows for data table
		var rows = [];
		for (var j = 0; j < industrynames.length; j++) {
			rows.push([industrynames[j], parseInt(totals[j])]);
		}

		// Create the data table.
      	var data = new google.visualization.DataTable();
		data.addColumn('string', 'Topping');
		data.addColumn('number', 'Slices');
		data.addRows(rows);

		// Set chart options
		var options = {'title':'Who is this rep getting money from?',
						'width':700,
						'height':500};

		// Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.PieChart(document.getElementById('infoDiv'));
		chart.draw(data, options);
		// });
	};

function drawChart2(houseRepublicans, houseDemocrats) {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Democrats', houseDemocrats],
      ['Republicans', houseRepublicans],
    ]);

    var options = {
      title: 'Democrat and Republican Reps',
      pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('mainStats'));
    chart.draw(data, options);
  }