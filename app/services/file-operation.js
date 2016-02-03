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
          return resolve(response);
        }, (error) => {
          // TODO: Log Here....
          return reject();
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
          // TODO: Log here....
          return resolve(response);
        }, (error) => {
          return reject(error);
        });
    });
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
