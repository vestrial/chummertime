HistoricalEvents = new Mongo.Collection('historicalEvents');

HistoricalEvents.allow({
    update: function (userId, event) {
        return !! userId;
    }, remove: function (userId, event) {
        return !! userId;
    }
});

HistoricalEvents.deny({
    update: function(userId, event, fieldNames) {
        // may only edit the following fields:
        return (_.without(fieldNames, 'date', 'title', 'labels').length > 0); }
});

Meteor.methods({
    eventInsert: function (eventAttributes) {
        check(Meteor.userId(), String);
        check(eventAttributes, {
            date: String,
            title: String
        });
        var user = Meteor.user();
        var event = _.extend(eventAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        var eventId = HistoricalEvents.insert(event);
        return {
            _id: eventId
        };
    }
});