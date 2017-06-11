queue()
   .defer(d3.json, "/data")
   .await(makeGraphs);

    function makeGraphs(error, projectsJson) {

 
   //Create a Crossfilter instance
   var ndx = crossfilter(projectsJson);
 
   //Define Dimensions
   var CatDim = ndx.dimension(function (d) {
       return d["Cat"];
    });

   var ItemDim = ndx.dimension(function (d) {
       return d["Item"];
   });
   
//    var totalSunnyHoursPerYearDim = ndx.dimension(function (d) {
//        return d[""];
//    });

//    var bulb = ndx.dimension(function (d) {
//        return d[""];
//     });

//     var bulbled = ndx.dimension(function (d) {
//        return d[""];
//     });


   //Calculate metrics

//    var bulbchart = bulb.group()
//    var bulbchart2 = bulbled.group()


    var numCalories = ItemDim.group().reduceSum(function (d) {
       return d["Calories"];});

    // var numTotalSunnyHoursPerYear = CatDim.group().reduceSum(function (d) {
    //    return d[""];});

    // var teslagroup = CatDim.group().reduceSum(function (d) {
    //    return d[""];});

    var CatGroup = ItemDim.group()

 
   //Charts
   var FatChart = dc.pieChart("#chart name1");
//    var a2 = dc.pieChart("#chart name2");
   var CaloriesChart = dc.barChart("#calorieschart");
//    var a4 = dc.barChart("#chart name4");
//    var a5 = dc.lineChart("#chart name5");

    
    // a1
    //     .height(213)
    //    .radius(90)
    //    .innerRadius(40)
    //    .transitionDuration(1500)
    //    .dimension(bulbled)
    //    .legend(dc.legend().x(10).y(10).gap(4))
    //    .group(bulbchart2);

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
       .y(d3.scale.linear().domain([300, 1200]))
       .xUnits(dc.units.ordinal)
       .yAxis().ticks(10);
       

    selectField = dc.selectMenu('#menu-select')
       .dimension(ItemDim)
       .group(numCalories);

   dc.renderAll();
}