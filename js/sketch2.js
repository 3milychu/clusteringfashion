// some colour variables
var tcBlack = "#130C0E";

// rest of vars
var w = 800,
    h = 1000,
    maxNodeSize = 2,
    x_browser = 20,
    y_browser = 25,
    root;
 
var vis;
var force = d3.layout.force(); 

vis = d3.select("#vis")
  .append("svg")
  .attr("width", w)
  .attr("height", h);
 
d3.json("https://media.githubusercontent.com/media/3milychu/clusteringfashion/master/assets/footwear.json", function(json) {

  var format = d3.format("");

    json.forEach(function(d) {
        d.labels = format(d.labels);
    });
 
  json = json;

  json = json.filter(function(d) { 
            return d.bodyclass1 === "feet" & d.Title != "Title"});

  // create children hierarchy json

var newData = { name :"root", 
      path: "https://lh3.googleusercontent.com/-YADBvaC2hUQ/AAAAAAAAAAI/AAAAAAAAAEg/_fr6798_2Uo/photo.jpg", 
      children : [] },
    levels = ["labels"];

// For each data row, loop through the expected levels traversing the output tree
json.forEach(function(d){
    // Keep this as a reference to the current level
    var depthCursor = newData.children;
    // Go down one level at a time
    levels.forEach(function(property, depth ){

        // Look to see if a branch has already been created
        var index;
        depthCursor.forEach(function(child,i){
            if ( d[property] == child.name ) index = i;
        });
        // Add a branch if it isn't there
        if ( isNaN(index) ) {
            depthCursor.push({ name : d[property], children : []});
            index = depthCursor.length - 1;
        }
        // Now reference the new child array as we go deeper into the tree
        depthCursor = depthCursor[index].children;
        // This is a leaf, so add the last element to the specified branch
        if ( depth === levels.length - 1 ) depthCursor.push({ Title : d.Title, link : d.link, path : d.path, 
          objectBegin : d.objectBegin, size : d.size, Culture : d.Culture, Medium : d.Medium, src : d.src,
          labels: d.labels});
    });
});

  // 
  console.log(newData);
 
  root = newData;
  root.fixed = true;
  root.x = w / 2;
  root.y = h / 4;
 
 
        // Build the path
  var defs = vis.insert("svg:defs")
      .data(["end"]);
 
 
  defs.enter().append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");
 
     update();
});
 
 
// functions

function update() {
  var nodes = flatten(root),
      links = d3.layout.tree().links(nodes);
 
  // Restart the force layout.
  force.nodes(nodes)
        .links(links)
        .gravity(0.05)
    .charge(-50)
    .linkDistance(20)
    .friction(0.5)
    .linkStrength(function(l, i) {return 1; })
    .size([w, h])
    .on("tick", tick)
        .start();
 
   var path = vis.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });
 
    path.enter().insert("svg:path")
      .attr("class", "link")
      // .attr("marker-end", "url(#end)")
      .style("stroke", "#eee");
 
 
  // Exit any old paths.
  path.exit().remove();
 
 
 
  // Update the nodes…
  var node = vis.selectAll("g.node")
      .data(nodes, function(d) { return d.id; });
 
 
  // Enter any new nodes.
  var nodeEnter = node.enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .on("click", click)
      .call(force.drag);
 
  // Append a circle
  nodeEnter.append("svg:circle")
      .attr("r", function(d) { return Math.sqrt(d.size) / 60 || 1.5; })
      .style("fill", "#eee");
 
   
  // Append images
  var images = nodeEnter.append("svg:image")
        .attr("xlink:href",  function(d) { return d.path;})
        .attr("x", function(d) { return -5;})
        .attr("y", function(d) { return -5;})
        .attr("height", 10)
        .attr("width", 10);
  
  // make the image grow a little on mouse over and add the text details on click
  var setEvents = images
          // Append hero text
          .on( 'click', function (d) {
              d3.select("h1").html(d.Title + " from cluster " + d.labels);  
              d3.select("h2").html(d.objectBegin + ", " + d.Culture + "<br>" + d.Medium); 
              d3.select("h3").html ("<a href='" + d.link + "' target=_blank>" + " Visit item"+ "</a>")
              d3.select("#featured").html("<img src='" + d.src + "'>"); 
           })

          .on( 'mouseenter', function() {
            // select element in current context
            d3.select( this )
              .transition()
              .attr("x", function(d) { return -10;})
              .attr("y", function(d) { return -10;})
              .attr("height", 20)
              .attr("width", 20);
          })
          // set back
          .on( 'mouseleave', function() {
            d3.select( this )
              .transition()
              .attr("x", function(d) { return -5;})
              .attr("y", function(d) { return -5;})
              .attr("height", 10)
              .attr("width", 10);
          });

  // Append hero name on roll over next to the node as well
  nodeEnter.append("text")
      .attr("class", "nodetext")
      .attr("x", x_browser -35)
      .attr("y", y_browser +15)
      .attr("fill", tcBlack)
      .style("font-size","0.5em")
      .style("z-index","101")
      .text(function(d) { return "#" + d.labels + ": " + d.Title + ", " + d.objectBegin; });
 
 
  // Exit any old nodes.
  node.exit().remove();
 
 
  // Re-select for update.
  path = vis.selectAll("path.link")
    .style("stroke-width","0.3px");
  node = vis.selectAll("g.node");
 
function tick() {
 
 
    path.attr("d", function(d) {
 
     var dx = d.target.x - d.source.x,
           dy = d.target.y - d.source.y,
           dr = Math.sqrt(dx * dx + dy * dy);
           return   "M" + d.source.x + "," 
            + d.source.y 
            + "A" + dr + "," 
            + dr + " 0 0,1 " 
            + d.target.x + "," 
            + d.target.y;
  });
    node.attr("transform", nodeTransform);    
  }
}

 
/**
 * Gives the coordinates of the border for keeping the nodes inside a frame
 * http://bl.ocks.org/mbostock/1129492
 */ 
function nodeTransform(d) {
  d.x =  Math.max(maxNodeSize, Math.min(w - (d.imgwidth/2 || 16), d.x));
    d.y =  Math.max(maxNodeSize, Math.min(h - (d.imgheight/2 || 16), d.y));
    return "translate(" + d.x + "," + d.y + ")";
   }
 
/**
 * Toggle children on click.
 */ 
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
 
  update();
}
 
 
/**
 * Returns a list of all nodes under the root.
 */ 
function flatten(root) {
  var nodes = []; 
  var i = 0;
 
  function recurse(node) {
    if (node.children) 
      node.children.forEach(recurse);
    if (!node.id) 
      node.id = ++i;
    nodes.push(node);
  }
 
  recurse(root);
  return nodes;
} 