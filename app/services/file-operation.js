import Ember from 'ember';
import FileOperationMixin from '../mixins/file-operation';

export default Ember.Service.extend(FileOperationMixin, {
  logger: Ember.inject.service('alert-messages'),
  chmod: function(path, permission) {
    var adapter = this.get('store').adapterFor('file');
    var data = {mode: permission, path: path};
    return new Ember.RSVP.Promise((resolve, reject) => {
      adapter.ajax(this._getFileOperationUrl('chmod'), "POST", {data: data}).then(
        (response) => {
          this.get('logger').success(`Successfully changed permission of ${path}`, {}, {flashOnly: true});
          return resolve(response);
        }, (responseError) => {
          var error = this.extractError(responseError);
          this.get('logger').danger(`Failed to modify permission of ${path}`, error);
          return reject(error);
        });
    });
  },

  createNewFolder: function(path, folderName) {
    if(folderName.slice(0, 1) === '/') {
      folderName = folderName.slice(0, folderName.length);
    }
    var adapter = this.get('store').adapterFor('file');
    var data = {path: `${path}/${folderName}`};
    return new Ember.RSVP.Promise((resolve, reject) => {
      adapter.ajax(this._getFileOperationUrl('mkdir'), "PUT", {data: data}).then(
        (response) => {
          this.get('logger').success(`Successfully created ${path}`, {}, {flashOnly: true});
          return resolve(response);
        }, (error) => {
          var error = this.extractError(responseError);
          this.get('logger').danger(`Failed to create ${path}`, error);
          return reject(error);
        });
    });
  },

  deletePaths: function(paths, deletePermanently = false) {
    var opsUrl;
    if(deletePermanently) {
      opsUrl = this._getFileOperationUrl('remove');
    } else {
      opsUrl = this._getFileOperationUrl('moveToTrash');
    }
    var data = {
      paths: paths.map((path) => {
        return {path: path, recursive: true}
      })
    };
    var adapter = this.get('store').adapterFor('file');
    return new Ember.RSVP.Promise((resolve, reject) => {
      adapter.ajax(opsUrl, "DELETE", {data: data}).then(
        (response) => {
          return resolve(response);
        }, (rejectResponse) => {
          var error = this.extractError(rejectResponse);
          if (this.isInvalidError(error)) {
            return reject(this._prepareUnprocessableErrorResponse(error));
          } else {
            return reject(Ember.merge({retry: false, unprocessable: false}, error));
          }
        });
    })
  },

  _checkIfDeleteRetryIsRequired: function(error) {
    return error.unprocessed.length >= 1;
  },

  _prepareUnprocessableErrorResponse: function(error) {
    var response = {};
    response.unprocessable = true;
    if (this._checkIfDeleteRetryIsRequired(error)) {
      response.retry = true;
      response.failed = error.failed[0];
      response.message = error.message;
      response.unprocessed = error.unprocessed;
    } else {
      response.retry = false;
      response.failed = error.failed[0];
      response.message = error.message;
    }

    return response;
  },

  getHome: function() {
    var adapter = this.get('store').adapterFor('file');
    return adapter.ajax(this._getMiscUrl("/help/home"), "GET");
  },

  getTrash: function() {
    var adapter = this.get('store').adapterFor('file');
    return adapter.ajax(this._getMiscUrl("/help/trashDir"), "GET");
  },

  _getMiscUrl: function(segment) {
    var urlFragments = this._getBaseURLFragments();
    return urlFragments.slice(0, urlFragments.length - 2).join('/') + segment;
  },

  getUploadUrl: function() {
    return this._getMiscUrl("/upload");
  },

  _getFileOperationUrl: function(pathFragment) {
    var adapter = this.get('store').adapterFor('file');
    var baseURL = adapter.buildURL('file');
    return baseURL.substring(0, baseURL.lastIndexOf('/')) + `/${pathFragment}`;
  },

  isExistsInCurrentPath: function(name) {
    return this.get('store').peekAll('file').isAny('name', name);
  }
});
