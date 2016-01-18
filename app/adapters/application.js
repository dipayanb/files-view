import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: '/api/v1/views/FILES/versions/1.0.0/instances/Files/resources/files/fileops',
  headers: {
    'X-Requested-By': 'ambari',
    'Authorization': 'Basic YWRtaW46YWRtaW4='
  }
});
