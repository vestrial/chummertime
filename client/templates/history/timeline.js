Timescale = function (events) {
    this.entries = events;
    var format = d3.time.format("%Y-%m-%d");
    this.asDate = function (entry) {
        return format.parse(entry.date)
    }
    this.maxDate = function () {
        return d3.max(this.entries, this.asDate);
    };
    this.minDate = function () {
        return d3.min(this.entries, this.asDate);
    };
    this.tickCount = function () {
        var maxYear = this.maxDate().getFullYear();
        var minYear = this.minDate().getFullYear();
        return maxYear - minYear + 1;
    };
};

Axis = function (timescale) {
    this.height = timescale.tickCount() * 50;
    var yScale = d3.time.scale()
        .domain([timescale.minDate(), timescale.maxDate()])
        .range([this.height, 0]);
    this.svgAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(d3.time.years);
    this.offset = function (entry) {
        return yScale(timescale.asDate(entry));
    }
};

Template.timeline.rendered = function () {
    this.autorun(function () {
        d3.selectAll("svg > *").remove();
        var events = HistoricalEvents.find().fetch();
        var timescale = new Timescale(events);
        var timeAxis = new Axis(timescale);
        var xPadding = 100;
        var yPadding = 15;
        var circleRadius = 2;

        var svg = d3.select('svg').attr("width", 500).attr("height", timeAxis.height + 2*yPadding);

        var mark = svg.selectAll()
            .data(events)
            .enter()
            .append("g")
            .attr("class", "mark")
            .attr("transform", function (e) {
                return "translate(" + xPadding + ", " + (yPadding + timeAxis.offset(e)) + ")"
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
            .call(timeAxis.svgAxis);     
    });
};

Template.timeline.events({
    'mouseover .mark': function(event){
        var selection = d3.select(event.currentTarget);
        selection.classed("current", true);
        var selectionLabels = selection.datum().labels;
        var allMarks = d3.selectAll(".mark");
        var relatedMarks = allMarks.filter(function (candidate) {
            var intersection  = _.intersection(selectionLabels, candidate.labels);
            return !(_.isEmpty(intersection));
        });
        relatedMarks.each(function() {
            d3.select(this).classed("related", true);
        });
    },
    'mouseout .mark': function(){
        d3.selectAll(".mark").classed({"current": false, "related":false}); 
    }
});    
    