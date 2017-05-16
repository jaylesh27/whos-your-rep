// Load the Visualization API and the corechart package
google.charts.load('current', {packages: ['corechart']});
// Set a callback to run when the Google Visualization API is loaded
// google.charts.setOnLoadCallback(drawChart);

function drawChart() {

	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Topping');
	data.addColumn('number', 'Slices');
	data.addRows([
		['Donor 1', 100],
		['Donor 2', 200],
		['Donor 3', 50],
		['Donor 4', 23],
		['Donor 5', 500]
	]);

	// Set chart options
	var options = {'title':'Who is this rep getting money from?',
					'width':700,
					'height':500};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('infoPanel'));
	chart.draw(data, options);
	}