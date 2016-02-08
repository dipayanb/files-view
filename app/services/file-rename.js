import Ember from 'ember';
import FileOperationMixin from '../mixins/file-operation';

export default Ember.Service.extend(FileOperationMixin, {
  logger: Ember.inject.service('alert-messages'),

  // Returns a promise for the operation. Upon sucess or error, this also
  // appropriately sends error messages.
  rename: function(srcPath, destName) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      var basePath = this.getBaseDirPath(srcPath);
      var destPath = basePath + destName;
      if(this._isDestinationPathExists(destPath)) {
        var error = {success: false, message: `${destPath} already exists`, retry: true};
        return reject(error);
      }

      var adapter = this.get('store').adapterFor('file');
      var baseURL = adapter.buildURL('file');
      var renameUrl = baseURL.substring(0, baseURL.lastIndexOf('/')) + "/rename";
      var data = {src: srcPath, dst: destPath};
      adapter.ajax(renameUrl, "POST", {data: data}).then((response) => {
        this.get('logger').success(`Successfully renamed ${srcPath} to ${destPath}.`, {}, {flashOnly: true});
        resolve(response);
      }, (responseError) => {
        var error = this.extractError(responseError);
        this.get('logger').danger(`Failed to rename ${srcPath} to ${destPath}`, error);
        reject(error);
      });
    });
  },

  _isDestinationPathExists(destinationPath) {
    return this.get('store').peekAll('file').isAny('path', destinationPath);
  }
});
