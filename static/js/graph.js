queue()
   .defer(d3.json, "/data")
   .await(makeGraphs);

    function makeGraphs(error, projectsJson) {

 
   //Create a Crossfilter instance
   var ndx = crossfilter(projectsJson);
 
   //Define Dimensions
   var CountyDim = ndx.dimension(function (d) {
       return d["County"];
   });

   var CodeDim = ndx.dimension(function (d) {
       return d[""];
    });

   var avrhoursDim = ndx.dimension(function (d) {
       return d[""];
    });
   var totalSunnyHoursPerYearDim = ndx.dimension(function (d) {
       return d[""];
   });

   var bulb = ndx.dimension(function (d) {
       return d[""];
    });

    var bulbled = ndx.dimension(function (d) {
       return d[""];
    });


   //Calculate metrics

   var bulbchart = bulb.group()
   var bulbchart2 = bulbled.group()


    var numTotalavrhours = CodeDim.group().reduceSum(function (d) {
       return d[""];});

    var numTotalSunnyHoursPerYear = CodeDim.group().reduceSum(function (d) {
       return d[""];});

    var teslagroup = CodeDim.group().reduceSum(function (d) {
       return d[""];});

    var stateGroup = CountyDim.group()

 
   //Charts
   var a1 = dc.pieChart("#chart name1");
   var a2 = dc.pieChart("#chart name2");
   var a3 = dc.barChart("#chart name3");
   var a4 = dc.barChart("#chart name4");
   var a5 = dc.lineChart("#chart name5");

    
    a1
        .height(213)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(bulbled)
       .legend(dc.legend().x(10).y(10).gap(4))
       .group(bulbchart2);

    a2
        .height(213)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(bulb)
       .legend(dc.legend().x(10).y(40).gap(5))
       .group(bulbchart);

    a5
       .width(900)
       .height(500)
       .margins({top: 10, right: 50, bottom: 40, left: 50})
       .dimension(CodeDim)
       .group(teslagroup)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .y(d3.scale.linear().domain([5000, 8000]))
       .xUnits(dc.units.ordinal)
       .renderDataPoints(true)
       .renderArea(true)
       .yAxis().ticks(10);

    a3
       .width(1200)
       .height(300)
       .margins({top: 10, right: 50, bottom: 40, left: 50})
       .dimension(CodeDim)
       .group(numTotalSunnyHoursPerYear)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .y(d3.scale.linear().domain([500, 900]))
       .xUnits(dc.units.ordinal)
       .yAxis().ticks(10);

    a4
       .width(1200)
       .height(300)
       .margins({top: 10, right: 50, bottom: 40, left: 50})
       .dimension(CodeDim)
       .group(numTotalavrhours)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .y(d3.scale.linear().domain([0, 80]))
       .xUnits(dc.units.ordinal)
       .yAxis().ticks(10);
       

    selectField = dc.selectMenu('#menu-select')
       .dimension(CountyDim)
       .group(stateGroup);

   dc.renderAll();
}