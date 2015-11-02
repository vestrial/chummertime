HistoricalEvents = new Mongo.Collection('historicalEvents');

HistoricalEvents.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !! userId; }
});