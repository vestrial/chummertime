Template.eventSubmit.onCreated(function () {
    Session.set('eventSubmitErrors', {});
});
Template.eventSubmit.helpers({
    errorMessage: function (field) {
        return Session.get('eventSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('eventSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.eventSubmit.events({
    'submit form': function (e) {
        e.preventDefault();
        var event = {
            date: $(e.target).find('[name=date]').val(),
            title: $(e.target).find('[name=title]').val(),
            labels: $(e.target).find('[name=labels]').val()
        };

        var errors = validateEvent(event);
        if (errors.title || errors.date)
            return Session.set('eventSubmitErrors', errors);

        Meteor.call('eventInsert', event, function (error, result) { // display the error to the user and abort
            if (error)
                return throwError(error.reason);
            ;
            Router.go('timeline', {_id: result._id});
        });
    }
});