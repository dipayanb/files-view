import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  pathForType: function(type) {
    if (type === 'file') {
      return 'listdir';
    }
  }
});
