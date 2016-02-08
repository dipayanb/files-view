import Ember from 'ember';
import FileOperationMixin from '../mixins/file-operation';

export default Ember.Service.extend(FileOperationMixin, {
  logger: Ember.inject.service('alert-messages'),

  // Returns a promise for the operation. Upon sucess or error, this also
  // appropriately sends error messages.
  move: function(srcPath, destName, isDirectory) {
    return new Ember.RSVP.Promise((resolve, reject) => {

      var fileName;

      if(isDirectory){
        fileName = '';
      }else{
        fileName = srcPath.substring(srcPath.lastIndexOf('/'), srcPath.length);
      }

      var destPath = destName + fileName;

      /* TODO:: Apply validations if applicable. */
      /*
      if(this._isDestinationPathExists(destPath)) {
        var error = {success: false, message: `${destPath} already exists`, retry: true};
        return reject(error);
      }
      */

      var adapter = this.get('store').adapterFor('file');
      var baseURL = adapter.buildURL('file');
      var moveUrl = baseURL.substring(0, baseURL.lastIndexOf('/')) + "/rename";
      var data = {src: srcPath, dst: destPath};
      adapter.ajax(moveUrl, "POST", {data: data}).then((response) => {
        this.get('logger').success(`Successfully moved to ${destPath}.`, {}., {flashOnly: true});
        resolve(response);
      }, (responseError) => {
        var error = this.extractError(responseError);
        this.get('logger').danger(`Failed to move to ${destPath}`, error);
        reject(errorJson);
      });
    });
  },

  _isDestinationPathExists(destinationPath) {
    return this.get('store').peekAll('file').isAny('path', destinationPath);
  }
});
