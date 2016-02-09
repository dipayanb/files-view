import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.peekRecord('alert', params.message_id);
  },

  afterModel: function() {
    console.log("Coming here to message route!!!");
    var messagesController = this.controllerFor('messages');
    messagesController.set('isExpanded', false);
  }
});
