import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    path: {
      refreshModel: true
    }
  },
  model: function(params) {
    this.store.unloadAll('file');
    return this.store.query('file', {path: params.path});
  },

  afterModel: function() {
    var fileController = this.controllerFor('files');
    fileController.set('searchText', '');
  }
});
