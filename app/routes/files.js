import Ember from 'ember';

export default Ember.Route.extend({
  fileSelectionService: Ember.inject.service('files-selection'),
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
    this.get('fileSelectionService').reset();
  },

  actions: {
    refreshCurrentRoute: function() {
      this.refresh();
    }
  }
});
