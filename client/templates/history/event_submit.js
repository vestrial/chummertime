Template.eventSubmit.events({'submit form': function (e) {
        e.preventDefault();
        var event = {
            date: $(e.target).find('[name=date]').val(),
            title: $(e.target).find('[name=title]').val(),
            labels: $(e.target).find('[name=labels]').val()
        };
        HistoricalEvents.insert(event);
        Router.go('timeline');
    }
});