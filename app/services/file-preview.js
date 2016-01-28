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

  endIndex: function() {
      return this.get('startIndex') + this.get('offset');
  }.property('startIndex'),

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
    return this._getContent();
  },

  _getContent: function() {

    var _self = this;

    if(this.get('fileFetchFinished')) {
      return false;
    }

    console.log('startIndex:: ' +  this.get('startIndex'));
    console.log('endIndex:: ' +  this.get('endIndex'));

    //var currentFetchPath = '/api/v1/views/FILES/versions/1.0.0/instances/Files/resources/files/preview/file?path=/user/hue/airline/airline/2009.csv.bz2&start=' + this.get('startIndex') + '&end='+ this.get('endIndex');
    var currentFetchPath = '/api/v1/views/FILES/versions/1.0.0/instances/Files/resources/files/preview/file?path=/apps/hive/warehouse/nyse_stocks/NYSE-2000-2001.tsv.gz&start=' + this.get('startIndex') + '&end='+ this.get('endIndex');

    /* TODO:: remove above hardcoded file url and use getBaseFilesURLPath and dynamic path for particular file. Use below two lines.  */
    //var basePath = getBaseFilesURLPath();
    //var currentFetchPath = `${basePath}/preview/file?path=${this.get(path)}&start=${this.get('startIndex')}&end=${this.get('endIndex')}`;


    this.set('isLoading', true);

    Ember.$.ajax({
          url: currentFetchPath,
          dataType: 'json',
          type: 'get',
          contentType: 'application/json',
          success: this._fetchSuccess,
          beforeSend: function(xhr) {
              xhr.setRequestHeader ('X-Requested-By', 'ambari');
              xhr.setRequestHeader ('Authorization', 'Basic YWRtaW46YWRtaW4=');
          },
          success: function( response, textStatus, jQxhr ){
              _self.set('fileContent', _self.get('fileContent') + response.data);
              _self.set('fileFetchFinished', response.isFileEnd);
              _self.set('isLoading', false);

          },
          error: function(jQxhr, textStatus, errorThrown) {
             console.log("Preview Fail pagecontent: " + errorThrown);
             _self.set('hasError', true);
             _self.set('isLoading', false);
          }
    })

    this.set('startIndex', (this.get('startIndex') + this.get('offset')));

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


});
