import Ember from 'ember';
import FileOperationMixin from '../mixins/file-operation';

export default Ember.Service.extend(FileOperationMixin, {
  fileContent: '',
  startIndex: 0,
  offset: 3000,
  path: '',
  isLoading: false,
  fileFetchFinished: false,
  hasError: false,
  endIndex: Ember.computed('startIndex', () => {
    return this.get('startIndex') + this.get('offset');
  }),

  reset: function() {
    this.set('fileContent', '');
    this.set('startIndex', 0);
    this.set('offset', 3000);
    this.set('path', '');
    this.set('isLoading', false);
    this.set('hasError', false);
    this.set('fileFetchFinished', false);
  },

  getNextContent: function() {
    this.set('startIndex', (this.get('startIndex') + this.get('offset')));
    return this._getContent();
  },

  _getContent: function() {
    if(this.get('fileFetchFinished')) {
      return false;
    }
    var basePath = getBaseFilesURLPath();
    var currentFetchPath = `${basePath}/preview/file?path=${this.get(path)}&start=${this.get('startIndex')}&end=${this.get('endIndex')}`;
    this.set('isLoading', true);
    Ember.$.ajax({
      url: currentFetchPath,
      dataType: 'json',
      type: 'get',
      async: false,
      contentType: 'application/json',
      success: this._fetchSuccess,
      error: this._fetchError,
      beforeSend: this._beforeSend(xhr)
    })
  },

  _fetchSuccess: function(response, textStatus, jQxhr) {
    this.set('fileContent', this.get('fileContent') + response.data);
    this.set('fileFetchFinished', response.isFileEnd);
    this.set('isLoading', false);
  },

  _fetchError: function(jQxhr, textStatus, errorThrown) {
    console.log("Preview Fail pagecontent: " + errorThrown);
    this.set('hasError', true);
    this.set('isLoading', false);
  },

  // TODO: remove this finally
  _beforeSend: function(jQxhr) {
    jQxhr.setRequestHeader({
      'X-Requested-By': 'ambari',
      'Authorization': 'Basic YWRtaW46YWRtaW4='
    });
  }
});
