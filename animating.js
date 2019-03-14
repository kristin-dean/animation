
//******************************************** set up data & call functions **************************************************//

var gradesP = d3.json("gradeDataTime.json");

gradesP.then(function(d)
{
  drawInitial(d,3);
},
function(err)
{
  console.log(err);
})


//************************************************** initialize the SVG *******************************************************//

var drawInitial = function(data,day)
{
  var svg = d3.select("svg")
              .attr("height", 500)
              .attr("width", 500);

  var margins =
  {
    left:10,
    right:10,
    top:10,
    bottom:10
  }





  var students = data[day].grades;

  var width = 500 - margins.left - margins.right;
  var height = 500 - margins.top - margins.bottom;
  var barWidth = width / students.length;

  var xScale = d3.scaleLinear()
                 .domain([0,4])
                 .range([0,width]);

  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([height,0]);

  var colors = d3.scaleOrdinal(d3.schemeSet3);


  svg.selectAll("rect")
     .data(students)
     .enter()
     .append("rect")
     .attr("x", function(d,i) {
       return xScale(i);})
     .attr("y", function (d,i) {
       return height - d.grade;})
     .attr("width", barWidth)
     .attr("height", function(d){return d.grade;})
     .attr("fill", function(d) {
      return colors(d.name);});



       var body = d3.select("body");
       body.append("button")
           .attr("id","previous")
           .text("Previous");

        previous1 = d3.select("#previous");
        previous1.on("click",function(d){previous(data,day)   });



       //button1.on("click",function(d){console.log("hi");});

       /*
       console.log("hi");
       var button2 = document.createElement("button");
       button2.innerHTML = "Next";
       var body = document.getElementsByTagName("body")[0];
       body.appendChild(button2);
       */
}


//******************************************** function to update according to day **************************************************//

var updateChart = function(data,day)
{

              var svg = d3.select("svg")
              .attr("height", 500)
              .attr("width", 500);
              var students = data[day].grades;
              console.log(students);
  var margins =
  {
    left:10,
    right:10,
    top:10,
    bottom:10
  }


  var width = 500 - margins.left - margins.right;
  var height = 500 - margins.top - margins.bottom;
  var barWidth = width / students.length

  var xScale = d3.scaleLinear()
                 .domain([0,4])
                 .range([0,width]);

  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([height,0]);

  var colors = d3.scaleOrdinal(d3.schemeSet3);

  svg.selectAll("rect")
     .data(students)
     .append("rect")
     .attr("x", function(d,i) {
       return xScale(i);})
     .attr("y", function (d,i) {
       return height - d.grade;})
     .attr("width", barWidth)
     .attr("height",function(d){return d.grade})
     .attr("fill", function(d) {
       return colors(d.name);});

//******************************************** functions corresponding to buttons **************************************************//

}

  var previous = function(data,currentDay)
{
  var newDay = parseInt(currentDay)-1;
  updateChart(data,newDay);

}

var next = function(data)
{
  var currentDay = d3.select("p").text();
  var newDay = parseInt(currentDay)+1;
  console.log(gradesP[1].grades);
  updateChart(data,newDay);
}
