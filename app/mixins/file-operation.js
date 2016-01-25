import Ember from 'ember';

/*
  Base Mixin to be used by different Services to get the common behaviors mixed
  in to the service.
*/
export default Ember.Mixin.create({
  getBaseFilesURLPath: function() {
    // TODO: This has to be changed when it is integrated inside Ambari
    //var pathName = window.location.pathname;
    var pathname = '/api/v1/views/FILES/versions/1.0.0/instances/Files/resources/files';
    return pathname;
  }
});
