import Ember from 'ember';

/*
  Base Mixin to be used by different Services to get the common behaviors mixed
  in to the service.
*/
export default Ember.Mixin.create({
  store: Ember.inject.service('store'),

  getBaseFilesURLPath: function() {
    // TODO: This has to be changed when it is integrated inside Ambari
    //var pathName = window.location.pathname;
    var pathname = '/api/v1/views/FILES/versions/1.0.0/instances/Files/resources/files';
    return pathname;
  },

  getBaseDirPath: function(path) {
    return path.substring(0, path.lastIndexOf('/') + 1);
  },

  _getBaseURLFragments: function() {
    var adapter = this.get('store').adapterFor('file');
    var baseURL = adapter.buildURL('file');
    return baseURL.split('/');
  },

  extractError: function(error) {
    if (Ember.isArray(error.errors) && (error.errors.length >= 0)) {
      return error.errors[0];
    }
    return {};
  },

  isInvalidError: function(error) {
    // This seems to a slight hack. But from backend the response of 422 is
    // always a hash which has success param set and value is false
    return Ember.isPresent(error.success) && error.success === false;
  }
});
