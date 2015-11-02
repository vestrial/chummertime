Meteor.publish('historicalEvents', function () {
    return HistoricalEvents.find();
});