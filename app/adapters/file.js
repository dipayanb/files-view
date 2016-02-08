import Ember from 'ember';
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
      var error = {};
      if (Ember.isPresent(json.success)) {
        // This error is for Invalid Error response (422)
        error.success = json.success;
        error.message = json.message;

        delete json.success;
        delete json.message;

        if(Ember.isArray(json.succeeded)) {
          error.succeeded = json.succeeded;
          delete json.succeeded;
        }
        if (Ember.isArray(json.failed)) {
          error.failed = json.failed;
          delete json.failed;
        }
        if (Ember.isArray(json.unprocessed)) {
          error.unprocessed = json.unprocessed;
          delete json.unprocessed;
        }
      } else {
        // Other errors
        error.message = json.message;
        error.trace = json.trace;
        error.status = json.status;
        delete json.trace;
        delete json.status;
        delete json.message;
      }
      json.errors = [error];
    }

    return json;
  }
});
