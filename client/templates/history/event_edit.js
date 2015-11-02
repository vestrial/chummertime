Template.eventEdit.events({
    'submit form': function (e) {
        e.preventDefault();
        var currentEventId = this._id;
        var eventProperties = {
            date: $(e.target).find('[name=date]').val(),
            title: $(e.target).find('[name=title]').val(),
            labels: $(e.target).find('[name=labels]').val()
        }
        Posts.update(currentEventId, {$set: eventProperties}, function (error) {
            if (error) {
                throwError(error.reason);;
            } else {
                Router.go('eventsList');
            }
        });
    },
    'click .delete': function (e) {
        e.preventDefault();
        if (confirm("Delete this event?")) {
            var currentEventId = this._id;
            HistoricalEvents.remove(currentEventId);
            Router.go('eventsList');
        }
    }
});