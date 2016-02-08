import Ember from 'ember';

export default Ember.Route.extend({
  fileOperationService: Ember.inject.service('file-operation'),
  model: function() {
    return Ember.RSVP.hash({
      homeDir: this.get('fileOperationService').getHome(),
      trashDir: this.get('fileOperationService').getTrash()
    });
  },
  setupController: function(controller, hash) {
    this._super(controller, hash);
    this.controllerFor('files').set('homePath', hash.homeDir.path);
    this.controllerFor('files').set('trashPath', hash.trashDir.path);
  },

  actions: {
    loading(transition, route) {
      let startTime = moment();
      let appController = this.controllerFor('application');
      // when the application loads up we want the loading template to be
      // rendered and not the loading spinner in the application template
      if(appController.get('firstLoad') === false) {
        appController.set('isLoading', true);
      }
      transition.promise.finally(() => {
        console.log("Loaded in " + (moment() - startTime) + "ms");
        appController.set('isLoading', false);
        appController.set('firstLoad', false);
      });
      return appController.get('firstLoad');
    }
  }
});
