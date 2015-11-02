Template.eventsList.helpers({
    historicalEvents: function () {
        return HistoricalEvents.find({}, {sort: {date: -1}});
    }
});