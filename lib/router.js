Router.configure({
    layoutTemplate: 'layout',
    waitOn: function() { return Meteor.subscribe('historicalEvents'); }

});
Router.route('/', {name: 'timeline'});
Router.route('/eventsList', {name: 'eventsList'});