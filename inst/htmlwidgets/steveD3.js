HTMLWidgets.widget({

  name: 'steveD3',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {


	// Create the dc.js chart objects & link to div
  // userChart  = dc.rowChart("#dc-user-chart");
  var userChart  = dc.rowChart(el);

	var margin = {top: 20, right: 10, bottom: 30, left: 60},
		padding = {top: 2, right: 2, bottom: 2, left: 2},
		outerWidth = 960, outerHeight = 700,
		width = outerWidth - margin.left - margin.right,
		height = outerHeight - margin.top - margin.bottom;

	// Run the data through crossfilter and load our records
//	var records = crossfilter(dataframe);
	var records = crossfilter (HTMLWidgets.dataframeToD3(x.message));
	var all = records.groupAll();

	// count all the records
	dc.dataCount(".dc-data-count").dimension(records).group(all);

  // Create Dimensions
    var userDim = records.dimension(function (d) { return d["Requests..Site"];});

    // Create Groups
    var userGroup  = userDim.group();

    // USER Horizontal Bar
    userChart
    .width(400)
    .height(800)
    .margins({top: 20, left: 100, right: 10, bottom: 20})
    .group(userGroup)
    .dimension(userDim)
    .labelOffsetX(-50)
    .labelOffsetY(8)
    .elasticX(true)
	.colors("#0e3928")
    .gap(2)
	.xAxis().ticks(4)
    ;

	// Render the Charts
    dc.renderAll();

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }
      //,
      //s: userChart
    };
  }
});
