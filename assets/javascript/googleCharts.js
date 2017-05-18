// Load the Visualization API and the corechart package
google.charts.load('current', {packages: ['corechart']});
// Set a callback to run when the Google Visualization API is loaded
// google.charts.setOnLoadCallback(drawChart);

function drawChart(crID) {
	console.log('Drawing Chart');
	var openSecretsAPI = '0e11c0ea5a983dc2004af32bd38156c1';

	var baseQuery = 'https://crossorigin.me/http://www.opensecrets.org/api/?method=candIndustry&output=json&cid=' + crID + '&cycle=2016&apikey='+openSecretsAPI;
	console.log('Base Query');
	console.log(baseQuery);
	$.ajax({
		url: baseQuery,
		method: 'GET',
		dataType: 'json'
	}).done(function (resp) {
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
		});
	};