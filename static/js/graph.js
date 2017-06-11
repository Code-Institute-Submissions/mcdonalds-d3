queue()
   .defer(d3.json, "/data")
   .await(makeGraphs);

    function makeGraphs(error, projectsJson) {

 
   //Create a Crossfilter instance
   var ndx = crossfilter(projectsJson);
 
   //Define Dimensions
   var CatDim = ndx.dimension(function (d) {
       return d["SubCat"];
    });

   var ItemDim = ndx.dimension(function (d) {
       return d["Item"];
   });
   
   var FatDim = ndx.dimension(function (d) {
       return d["Total Fat (% Daily Value)"];
   });

   var CholesterolDim = ndx.dimension(function (d) {
       return d["Cholesterol (% Daily Value)"];
    });

    var SodiumDim = ndx.dimension(function (d) {
       return d["Sodium (% Daily Value)"];
    });

  var CarbDim = ndx.dimension(function (d) {
       return d["Carbohydrates (% Daily Value)"];
    });


   //Calculate metrics

   var Fatchart = FatDim.group()
   var Cholesterolchart = CholesterolDim.group()
   var SodiumChart = SodiumDim.group()
   var CarbChart = CarbDim.group()
//    var bulbchart2 = bulbled.group()


    var numCalories = ItemDim.group().reduceSum(function (d) {
       return d["Calories"];});

    // var numCholesterol = ItemDim.group().reduceSum(function (d) {
    //    return d["Cholesterol"];});

    // var teslagroup = CatDim.group().reduceSum(function (d) {
    //    return d[""];});

    var stateGroup = CatDim.group()

 
   //Charts
   var FatChartExport = dc.pieChart("#fatchartexport");
   var CholesterolChartExport = dc.pieChart("#cholesterolchartexport");
   var SodiumChartExport = dc.pieChart("#sodiumchartexport");
   var CarbChartExport = dc.pieChart("#carbchartexport");
   var CaloriesChart = dc.lineChart("#calorieschart");
//    var a4 = dc.barChart("#chart name4");
//    var a5 = dc.lineChart("#chart name5");

    
    FatChartExport
        .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(FatDim)
       .group(Fatchart);

    CholesterolChartExport
        .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(CholesterolDim)
       .group(Cholesterolchart);

    SodiumChartExport
        .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(SodiumDim)
       .group(SodiumChart);

    CarbChartExport
        .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(CarbDim)
       .group(CarbChart);

    // a2
    //     .height(213)
    //    .radius(90)
    //    .innerRadius(40)
    //    .transitionDuration(1500)
    //    .dimension(bulb)
    //    .legend(dc.legend().x(10).y(40).gap(5))
    //    .group(bulbchart);

    // a5
    //    .width(900)
    //    .height(500)
    //    .margins({top: 10, right: 50, bottom: 40, left: 50})
    //    .dimension(CodeDim)
    //    .group(teslagroup)
    //    .transitionDuration(500)
    //    .x(d3.scale.ordinal())
    //    .y(d3.scale.linear().domain([5000, 8000]))
    //    .xUnits(dc.units.ordinal)
    //    .renderDataPoints(true)
    //    .renderArea(true)
    //    .yAxis().ticks(10);

    // a4
    //    .width(1200)
    //    .height(300)
    //    .margins({top: 10, right: 50, bottom: 40, left: 50})
    //    .dimension(CodeDim)
    //    .group(numTotalSunnyHoursPerYear)
    //    .transitionDuration(500)
    //    .x(d3.scale.ordinal())
    //    .y(d3.scale.linear().domain([500, 900]))
    //    .xUnits(dc.units.ordinal)
    //    .yAxis().ticks(10);

    CaloriesChart
       .width(1200)
       .height(600)
       .margins({top: 10, right: 50, bottom: 300, left: 50})
       .dimension(ItemDim)
       .group(numCalories)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .y(d3.scale.linear().domain([0, 1200]))
       .xUnits(dc.units.ordinal)
       .yAxis().ticks(10);
       

    selectField = dc.selectMenu('#menu-select')
       .dimension(CatDim)
       .group(stateGroup);

   dc.renderAll();
}