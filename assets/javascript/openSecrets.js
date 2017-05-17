var openSecretsAPI = '0e11c0ea5a983dc2004af32bd38156c1';
var norcross = 'N00036154';

function getContributionSummary (crID){
	console.log('running Open Secrets function');
	var baseQuery = 'https://crossorigin.me/http://www.opensecrets.org/api/?method=candIndustry&output=json&cid=N00007360&cycle=2016&apikey='+openSecretsAPI;
	console.log(baseQuery);
	$.ajax({
		url: baseQuery,
		method: 'GET',
		dataType: 'json'
	}).done(function (data) {
		console.log('Open Secrets API connected, response:');
		console.log(data);

		for (var i = 0; i < data.response.industries.industry.length; i++) {
			console.log(data.response.industries.industry[i]['@attributes'].industry_name);
			console.log(data.response.industries.industry[i]['@attributes'].total);
		}

	});
}