Template.timeline.rendered = function () {
    var events = [
        {date:'2006-11-17',
            title:'North Korea launches nukes at Japan',
            labels: ["war","asia"]
        },
        {date:'2008-11-04',
            title:'Jesse Garetty elected president of the U.S.',
            labels: ["politics","america"]
        },
        {date:'2011-01-13',
            title:'First UGE baby is born'
        },
        {date:'2011-12-24',
            title:'The Awakening'
        },
        {date:'2014-07-12',
            title:'Great Ghost Dance. Ghost Dance War begins.',
            labels: ["war","america"]
        },
        {date:'2021-04-30',
            title:'Goblinization'
        },
        {date:'2029-02-08',
            title:'The Crash of \'29'
        },
        {date:'2050-01-01',
            title:'Present day of SR1',
            labels:['edition']
        },
        {date:'2053-01-01',
            title:'Present day of SR2',
            labels:['edition']
        },
        {date:'2060-01-01',
            title:'Present day of SR3',
            labels:['edition']
        },
        {date:'2072-01-01',
            title:'Present day of SR4',
            labels:['edition']
        },
        {date:'2072-03-15',
            title:'Knight Errant takes over Seattle'
        },
        {date:'2075-01-01',
            title:'Present day of SR5',
            labels:['edition']
        }
    ];


    var format = d3.time.format("%Y-%m-%d");
    //Width and height
    var w = 500;
    var h = d3.max(events, function (d) {
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
        .range([h - yPadding, 0]);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(d3.time.years);
//Create SVG element
    var svg = d3.select('#visualization').append('svg')
        .attr("width", w)
        .attr("height", h + yPadding);

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
}