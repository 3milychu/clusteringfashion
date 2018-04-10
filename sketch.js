d3.json("https://media.githubusercontent.com/media/3milychu/clusteringfashion/master/assets/costume_kmeans.json", 
	function(data) {
 
	data = data;

	grouped = d3.nest()
			.key(function(d) { return d.labels; })
			.entries(data)

	console.log(grouped)


});