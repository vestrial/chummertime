Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() { return Meteor.subscribe('historicalEvents'); }

});
Router.route('/', {name: 'timeline'});
Router.route('/eventsList', {name: 'eventsList'});