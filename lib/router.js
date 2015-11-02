Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('historicalEvents');
    }

});

Router.route('/', {name: 'timeline'});

Router.route('/events/:_id/edit', {
    name: 'eventEdit',
    data: function () {
        return HistoricalEvents.findOne(this.params._id);
    }
});

Router.route('/submit', {name: 'eventSubmit'});

var requireLogin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}

Router.route('/eventsList', {name: 'eventsList'});
Router.onBeforeAction(requireLogin, {only: 'eventSubmit'});