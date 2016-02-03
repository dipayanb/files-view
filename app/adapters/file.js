import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  pathForType: function(type) {
    if (type === 'file') {
      return 'listdir';
    }
  },
  parseErrorResponse: function(responseText) {
    var json = this._super(responseText);
    if((typeof json) === 'object') {
      json.errors = [{success: json.success, message: json.message}];
      delete json.success;
      delete json.message;
      return json;
    } else {
      return {success: "", message: ""};
    }
  }
});
