Template.eventSubmit.events({
    'submit form': function (e) {
        e.preventDefault();
        var event = {
            date: $(e.target).find('[name=date]').val(),
            title: $(e.target).find('[name=title]').val(),
            labels: $(e.target).find('[name=labels]').val()
        };

        Meteor.call('eventInsert', event, function (error, result) { // display the error to the user and abort
            if (error)
                return throwError(error.reason);;
            Router.go('timeline', {_id: result._id});
        });
    }
});