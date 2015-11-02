Template.eventEdit.onCreated(function () {
    Session.set('eventEditErrors', {});
});

Template.eventEdit.helpers({
    errorMessage: function (field) {
        return Session.get('eventEditErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('eventEditErrors')[field] ? 'has-error' : '';
    }
});

Template.eventEdit.events({
    'submit form': function (e) {
        e.preventDefault();
        var currentEventId = this._id;
        var eventProperties = {
            date: $(e.target).find('[name=date]').val(),
            title: $(e.target).find('[name=title]').val(),
            labels: $(e.target).find('[name=labels]').val()
        }

        var errors = validateEvent(eventProperties);
        if (errors.title || errors.date)
            return Session.set('eventEditErrors', errors);


        Posts.update(currentEventId, {$set: eventProperties}, function (error) {
            if (error) {
                throwError(error.reason);
                ;
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