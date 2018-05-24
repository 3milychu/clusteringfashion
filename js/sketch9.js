function setup() {

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
           $('#tutorial').hide();
           $('#mobile-cta').css("display", "inline");
    };

	noCanvas();

	getClusters();

    window.onscroll = function() {scrollState()};

    $('button').change(function() {
    reset();
});

}

function scrollState() {

    var elmnt = document.getElementById("clusters");
    var rep = elmnt.offsetTop;
    var elmnt2 = document.getElementById("anchor1");
    var rep2 = elmnt2.offsetTop;


    if (window.pageYOffset >= elmnt.offsetHeight) { 
        distributeCluster46();
        distributeCluster29();
        $("#cluster-desc").css("margin-top", "-15%");
        $("#cluster-desc").css("opacity", "1");
        $("#clusters").css("top", "50%");
        $("#tutorial").css("margin-top", "10%");
    } else if (window.pageYOffset <= elmnt.offsetHeight){
        reset();
        $("#cluster-desc").css("margin-top", "-12%");
        $("#cluster-desc").css("opacity", "0");
        $("#tutorial").css("margin-top", "5%");
    } else {
        reset();
        $("#cluster-desc").css("margin-top", "-10%");
        $("#cluster-desc").css("opacity", "0");
        $("#tutorial").css("margin-top", "5%");
        $("#model-section").css("position", "fixed");
        $("#model-section").css("top", "0");
        $("#model-section").css("left", "0");
    };
};

function getClusters() {
	d3.json("https://media.githubusercontent.com/media/3milychu/clusteringfashion/master/assets/model_clusters.json", function(data) {

  var format = d3.format("");

    data.forEach(function(d) {
        d.labels = format(d.labels);
    });
 
	data = data;

			// Cluster 46
			  samples = data.filter(function(d) { 
			    	return (d.labels === "46" | d.labels === "29") & d.Title != "Title" });


	samples = samples.sort(function(a, b) {
		        return d3.ascending(+a.objectBegin, +b.objectBegin)
		    });


   d3.select(".clusters").selectAll("img").remove();

	var samples = d3.select(".clusters").selectAll("#clusters")
		.data(samples)
        .enter()
        .append('a')
        .attr("href",function(d) {return d.link})
        .attr("target","_blank")
        .append('img')
        .attr("class",function(d) {return "label"+d.labels;})
        .attr("alt", function(d){return d.Title +", " + d.objectBegin + ", " + d.Culture})
        .attr("title", function(d){return d.Title +", " + d.objectBegin + ", " + d.Culture})
        .attr("src",function(d) {return d.path;})
        .exit();

});

}

function play () {
    distributeCluster46();
    distributeCluster29();
}

function reset () {

    var fields = $('.label46'), container = $('#clusters'),
        width = container.width(), height = container.height(),
        angle = 0, step = (2*Math.PI) / fields.length;
    fields.each(function() {
        var radius = Math.floor(Math.random() * 150) + 1 
        var x = Math.round(width/4 + radius * Math.cos(angle) - $(this).width()/2);
        var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2);
        if(window.console) {
            // console.log($(this).text(), x, y);
        }
        $(this).css({
            width: '2%',
            // height: '2.7%',
            position: 'relative',
            left:'0px',
            top:'40%',
        });
        angle += step;
    });

    var fields = $('.label29'), container = $('#clusters'),
        width = container.width(), height = container.height(),
        angle = 0, step = (2*Math.PI) / fields.length;
    fields.each(function() {
        var radius = Math.floor(Math.random() * 150) + 1 
        var x = Math.round(width/4 + radius * Math.cos(angle) - $(this).width()/2);
        var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2);
        if(window.console) {
            // console.log($(this).text(), x, y);
        }
        $(this).css({
            width: '2%',
            // height: '2.7%',
            position: 'relative',
            left:'0px',
            top:'40%',
        });
        angle += step;
    });

}

function distributeCluster46() {
    // var radius = 200;
    var fields = $('.label46'), container = $('#clusters'),
        width = container.width(), height = container.height(),
        angle = 0, step = (2*Math.PI) / fields.length;
    fields.each(function() {
    	var radius = Math.floor(Math.random() * (width*.15)) + 1 
        var x = Math.round(width/4 + radius * Math.cos(angle) - $(this).width()/2);
        var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2);
        if(window.console) {
            // console.log($(this).text(), x, y);
        }
        $(this).css({
        	width: '3%',
      		// height: '4.5%',
        	position: 'absolute',
            left: x + 'px',
            top: y + 'px'
        });
        angle += step;
    });
}


function distributeCluster29() {
    // var radius = 200;
    var fields = $('.label29'), container = $('#clusters'),
        width = container.width(), height = container.height(),
        angle = 0, step = (2*Math.PI) / fields.length;
    fields.each(function() {
    	var radius = Math.floor(Math.random() * (width*.15)) + 1 
        var x = Math.round(width/1.5 + radius * Math.cos(angle) - $(this).width());
        var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/3);
        if(window.console) {
            // console.log($(this).text(), x, y);
        }
        $(this).css({
        	width: '3%',
      		// height: '4.5%',
        	position: 'absolute',
            left: x + 'px',
            top: y + 'px'
        });
        angle += step;
    });
}

