
//******************************************** set up data & call functions **************************************************//

var gradesP = d3.json("gradeDataTime.json");

gradesP.then(function(d)
{
  drawInitial(d,0);
},
function(err)
{
  console.log(err);
})


//************************************************** initialize the SVG *******************************************************//

var drawInitial = function(data,day)
{
  var svg = d3.select("svg")
              .attr("height", 600)
              .attr("width", 600);

  var margins =
  {
    left:40,
    right:90,
    top:10,
    bottom:40
  }





  var students = data[day].grades;

  var width = 600 - margins.left - margins.right;
  var height = 600 - margins.top - margins.bottom;
  var barWidth = width / students.length;

  var xScale = d3.scaleLinear()
                 .domain([0,4])
                 .range([0,width]);

  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([height,0]);

  var xAxis = d3.axisBottom(xScale);

  var colors = d3.scaleOrdinal(d3.schemeSet3);


  svg.selectAll("rect")
     .data(students)
     .enter()
     .append("rect")
     .attr("x", function(d,i) {
       return xScale(i)+ margins.left;})
     .attr("y", function (d,i) {
       return yScale(d.grade) + margins.top;})
     .attr("width", barWidth)
     .attr("height", function(d){return height - yScale(d.grade);})
     .attr("fill", function(d) {
      return colors(d.name);})


           .append("title")
           .text(function(d)
           {
              return d.name +"'s' grade is " + d.grade;
           });


       var body = d3.select("body");
       body.append("button")
           .attr("id","previous")
           .text("Previous");

        previous1 = d3.select("#previous");
        previous1.on("click",function(d){previous(data,day-1)   })
                 .attr("disabled",true);


        var body = d3.select("body");
        body.append("button")
            .attr("id","next")
            .text("Next");

         next1 = d3.select("#next");
         next1.on("click",function(d){next(data,day+1)   });


         var yAxis = d3.axisLeft(yScale);
             svg.append("g")
             .classed(yAxis,true)
               .call(yAxis)
               .attr("transform","translate(" + margins.left + "," + margins.top + ")");



        var legend = svg.append("g")
                 .classed("legend",true)
                 .attr("transform","translate("+
                 (width + margins.left) + "," + margins.top+")");

                 var legendLines = legend.selectAll("g")
                     .data(students)
                     .enter()
                     .append("g")
                     .classed("legendLines",true)
                     .attr("transform",function(d,i)
                     {
                       return "translate(20," + (i*20 +5) +")";}
                   )

                 legendLines.append("rect")
                         .attr("x", 0)
                         .attr("y", function(d,i){return i*20;})
                         .attr("width", 10)
                         .attr("height", 10)
                         .attr("fill",function(d) {return colors(d.name);})

                 legendLines.append("text")
                       .attr("x",20)
                       .attr("y",function(d,i){return i*20+10;})
                       .text(function(d){return d.name;});





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

              var dayHeader = d3.select("h2");
              dayHeader.text("Day " + (parseInt(day)+1));

              var svg = d3.select("svg")
              .attr("height", 600)
              .attr("width", 600);

              var students = data[day].grades;
              console.log(students);
              console.log(day);

  var margins =
  {
    left:40,
    right:90,
    top:10,
    bottom:40
  }




  var width = 600 - margins.left - margins.right;
  var height = 600 - margins.top - margins.bottom;
  var barWidth = width / students.length

  var xScale = d3.scaleLinear()
                 .domain([0,4])
                 .range([0,width]);

  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([height,0]);

  var yAxis = d3.axisLeft(yScale);
  svg.append("g")
      .classed(yAxis,true)
        .call(yAxis)
        .attr("transform","translate(" + margins.left + "," + margins.top + ")");



  var colors = d3.scaleOrdinal(d3.schemeSet3);

  svg.selectAll("rect")
     .data(students)
     .transition()
     .attr("x", function(d,i) {
       return xScale(i) + margins.left;})
     .attr("y", function (d,i) {
       return yScale(d.grade) + margins.top;})
     .attr("width", barWidth)
     .attr("height",function(d){return height - yScale(d.grade)})
     .attr("fill", function(d) {
       return colors(d.name);})

     var title = d3.selectAll("title");
     title.remove()
     svg.selectAll("rect")
     .append("title")
     .text(function(d)
     {
        return d.name +"'s' grade is " + d.grade;
     });





//***************************************** functions corresponding to buttons **************************************************//

  updateButtons(data,day)
}

  var previous = function(data,currentDay)
{
  var newDay = parseInt(currentDay);
  updateChart(data,newDay);

}

var next = function(data,currentDay)
{
  var newDay = parseInt(currentDay);

  updateChart(data,newDay);
}


var updateButtons = function(data,day)
{
  var next1 = d3.select("#next");
  var previous1 = d3.select("#previous");
  next1.on("click",function(d){next(data,day+1) });


  if(day==9)
  {
      next1.attr("disabled",true);

  }

  if(day>0)
  {
    previous1.attr("disabled",null)

  }





  previous1.on("click",function(d){previous(data,day-1)   });
  if(day==0)
  {
      previous1.attr("disabled",true);
  }

  if(day<9)
  {
    next1.attr("disabled",null);
  }








}
