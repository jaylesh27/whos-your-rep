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
		['Mushrooms', 3],
		['Onions', 1],
		['Olives', 1],
		['Zucchini', 1],
		['Pepperoni', 2]
	]);

	// Set chart options
	var options = {'title':'What is your rep up to?',
					'width':700,
					'height':500};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.ColumnChart(document.getElementById('infoPanel'));
		chart.draw(data, options);
	}