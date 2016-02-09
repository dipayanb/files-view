import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  namespace: Ember.computed(function() {
    return '/api/v1/views/FILES/versions/1.0.0/instances/Files/resources/files/fileops';
  }),
  headers: {
    'X-Requested-By': 'ambari',
    'Authorization': 'Basic YWRtaW46YWRtaW4='
  }
});
