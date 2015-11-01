Template.timeline.rendered = function () {
    this.autorun(function () {
        if (HistoricalEvents.find().count() === 0) {
            return;
        }
        var events = HistoricalEvents.find().fetch();
        var format = d3.time.format("%Y-%m-%d");
        //Width and height
        var width = 500;
        var height = d3.max(events, function (d) {
            return format.parse(d.date).getTime() / 1000000000;
        });
        var xPadding = 100;
        var yPadding = 15;
        var circleRadius = 2;

        var yScale = d3.time.scale()
            .domain(
            [d3.min(events, function (e) {
                return format.parse(e.date);
            }),
                d3.max(events, function (e) {
                    return format.parse(e.date);
                })])
            .range([height - yPadding, 0]);

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(d3.time.years);
//Create SVG element
        var visualizationDiv = d3.select('#visualization');
        visualizationDiv.empty();
        var svg = visualizationDiv.append('svg')
            .attr("width", width)
            .attr("height", height + yPadding);

        var mark = svg.selectAll()
            .data(events)
            .enter()
            .append("g")
            .attr("class", "mark")
            .attr("transform", function (e) {
                return "translate(" + xPadding + ", " + (yPadding + yScale(format.parse(e.date))) + ")"
            });

        mark.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", circleRadius);

        mark.append("text")
            .text(function (event) {
                return event.title;
            })
            .attr("x", 5)
            .attr("y", circleRadius * 2);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + xPadding + "," + yPadding + ")")
            .call(yAxis);

        svg.selectAll(".mark")
            .on("mouseover", function (data, index) {
                d3.select(this).style("fill", "red");
                var allMarks = d3.selectAll(".mark");
                var editions = allMarks.filter(function (candidate, index) {
                    var candidateLabels = d3.set(candidate.labels);
                    for (i = 0; i < data.labels.length; i++) {
                        var dataLabel = data.labels[i];
                        if (candidateLabels.has(dataLabel)) {
                            return true;
                        }
                    }
                    return false;
                });
                editions.each(function (data, index) {
                    var mark = d3.select(this);
                    mark.style("font-weight", "bold")
                });
            })
            .on("mouseout", function (data, index) {
                d3.selectAll(".mark").style("fill", null).style("font-weight", null);
                ;
            });
    });
}