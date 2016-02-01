import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  pathForType: function(type) {
    if (type === 'file') {
      return 'listdir';
    }
  },
  parseErrorResponse: function(responseText) {
    var json = this._super(responseText);
    json.errors = [{success: json.success, message: json.message}];
    delete json.success;
    delete json.message;
    return json;
  }
});
