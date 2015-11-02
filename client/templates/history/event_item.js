Template.eventItem.helpers({
    ownEvent: function () {
        return this.userId === Meteor.userId();
    }
});