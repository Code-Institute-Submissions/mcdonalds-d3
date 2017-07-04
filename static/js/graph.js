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

    var ItemNameDim = ndx.dimension(function (d) {
       return d["Item name"];
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

    var VitADim = ndx.dimension(function (d) {
       return d["Vitamin A (% Daily Value)"];
    });

    var VitCDim = ndx.dimension(function (d) {
       return d["Vitamin C (% Daily Value)"];
    });

    var CalciumDim = ndx.dimension(function (d) {
       return d["Calcium (% Daily Value)"];
    });

    var IronDim = ndx.dimension(function (d) {
       return d["Iron (% Daily Value)"];
    });

    var ProteinDim = ndx.dimension(function (d) {
       return d["Protein"];
    });

    HunCalDim = ndx.dimension(dc.pluck('Item'));
    
   //Calculate metrics

   
    var Cholesterolchart = CholesterolDim.group()
    var SodiumChart = SodiumDim.group()
    var CarbChart = CarbDim.group()
    var FatChart = FatDim.group()
    
    var calciumPercentByItem = HunCalDim.group().reduceSum(dc.pluck ('Calcium (% Daily Value)'));
    
    var calciumRemainderByItem = HunCalDim.group().reduceSum(
        function(d) {
            return 100 - d["Calcium (% Daily Value)"];
        });

    var numSugarsTotal = ItemNameDim.groupAll().reduceSum(function (d) {
       return d["Sugars"];});

    var numCalories = ItemNameDim.group().reduceSum(function (d) {
       return d["Calories"];});

    var numCalories2 = ItemNameDim.groupAll().reduceSum(function (d) {
       return d["Calories"];});

       var numSugars = ItemNameDim.group().reduceSum(function (d) {
       return d["Sugars"];});

    var numVit = ItemNameDim.group().reduceSum(function (d) {
       return d["Vitamin C (% Daily Value)"];});

    

    var numProtein = ProteinDim.group().reduceSum(function (d) {
       return d["Protein"];});

    


    var stateGroup = ItemDim.group()

 
   //Charts
   var FatChartExport = dc.pieChart("#fatchartexport");
   var CholesterolChartExport = dc.pieChart("#cholesterolchartexport");
   var SodiumChartExport = dc.pieChart("#sodiumchartexport");
   var CarbChartExport = dc.pieChart("#carbchartexport");
   var CaloriesChart = dc.lineChart("#calorieschart");
   var SugarsChart = dc.barChart("#sugarschart");
   var VitCBarChart = dc.barChart("#vitcbarchart");
   var ProteinChart = dc.barChart("#proteinbarchart");
   var CalandIronBarChart = dc.barChart("#calciumandironchart");
   var TotalCalories = dc.numberDisplay("#totalcalories")
   var TotalSugars = dc.numberDisplay("#totalsugars")

    TotalSugars
        .formatNumber(d3.format("d"))
        .valueAccessor(function(d) {
            return d
        })
        .group(numSugarsTotal)

    TotalCalories
        .formatNumber(d3.format("d"))
        .valueAccessor(function(d) {
            return d
        })
        .group(numCalories2)

    CalandIronBarChart
       .width(300)
       .height(300)
       .margins({top: 20, right: 20, bottom: 1, left: 20})
       .dimension(HunCalDim)
       .group(calciumPercentByItem)
       .stack(calciumRemainderByItem)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .ordinalColors(['#1188d8','#c3d1f1'])
       .y(d3.scale.linear().domain([0, 60]))
       .xUnits(dc.units.ordinal)
       .elasticX(true)
    //    .elasticY(true)
       .yAxis().ticks(10);

    ProteinChart
       .width(300)
       .height(300)
       .margins({top: 20, right: 20, bottom: 1, left: 20})
       .dimension(ItemNameDim)
       .group(numProtein)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .y(d3.scale.linear().domain([0, 50]))
       .xUnits(dc.units.ordinal)
       .elasticX(true)
    //    .elasticY(true)
       .yAxis().ticks(10);

    VitCBarChart
       .width(300)
       .height(300)
       .margins({top: 20, right: 20, bottom: 1, left: 20})
       .dimension(ItemNameDim)
       .group(numVit)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .y(d3.scale.linear().domain([0, 130]))
       .xUnits(dc.units.ordinal)
       .elasticX(true)
       .yAxis().ticks(10);

    FatChartExport
        .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(FatDim)
       .group(FatChart);

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

    SugarsChart
       .width(1300)
       .height(600)
       .margins({top: 10, right: 50, bottom: 200, left: 50})
       .dimension(ItemNameDim)
       .group(numSugars)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .y(d3.scale.linear().domain([0, 100]))
       .xUnits(dc.units.ordinal)
       .elasticX(true)
       .yAxis().ticks(10);

    CaloriesChart
       .width(1300)
       .height(600)
       .margins({top: 10, right: 50, bottom: 200, left: 50})
       .dimension(ItemNameDim)
       .group(numCalories)
       .transitionDuration(500)
       .filter(null)
       .x(d3.scale.ordinal())
       .y(d3.scale.linear().domain([0, 1000]))
       .xUnits(dc.units.ordinal)
       .ordinalColors(['red'])
       .elasticX(true)
       .yAxis().ticks(10);
       
    selectField = dc.selectMenu('#menu-select')
       .dimension(ItemDim)
       .group(stateGroup);

   dc.renderAll();
}