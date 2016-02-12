import Ember from 'ember';

export default Ember.Route.extend({
  fileOperationService: Ember.inject.service('file-operation'),
  model: function() {

    var promise = {
      homeDir: this.get('fileOperationService').getHome(),
      trashDir:  this.get('fileOperationService').getTrash()
    };

    return Ember.RSVP.hashSettled(promise).then(function(hash) {
      var response = {
        homeDir: {path: '', hasError: true},
        trashDir: {path: '', hasError: true}
      }
      if(hash.homeDir.state === 'fulfilled'){
        response.homeDir.path = hash.homeDir.path;
        response.homeDir.hasError = false;
      }

      if(hash.trashDir.state === 'fulfilled'){
        response.trashDir.path = hash.trashDir.path;
        response.trashDir.hasError = false;
      }

      return response;
    });
  },
  setupController: function(controller, hash) {
    this._super(controller, hash);
    if(hash.homeDir.hasError === false) {
      this.controllerFor('files').set('homePath', hash.homeDir.path);
      this.controllerFor('files').set('hasHomePath', true);
    }

    if(hash.trashDir.hasError === false) {
      this.controllerFor('files').set('trashPath', hash.homeDir.path);
      this.controllerFor('files').set('hasTrashPath', true);
    }
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
