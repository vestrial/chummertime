Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { return Meteor.subscribe('historicalEvents'); }

});
Router.route('/', {name: 'timeline'});
Router.route('/eventsList', {name: 'eventsList'});