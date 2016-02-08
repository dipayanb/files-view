import Ember from 'ember';
import OperationModal from '../mixins/operation-modal';

export default Ember.Component.extend(OperationModal, {
  fileSelectionService: Ember.inject.service('files-selection'),
  fileOperationService: Ember.inject.service('file-operation'),
  closeOnEscape: true,
  deletePermanently: false,
  selectedFiles: Ember.computed.alias('fileSelectionService.files'),
  filesCount: Ember.computed.oneWay('fileSelectionService.filesCount'),
  folderCount: Ember.computed.oneWay('fileSelectionService.folderCount'),
  hasFiles: Ember.computed('filesCount', function() {
    return this.get('filesCount') > 0;
  }),
  hasFolders: Ember.computed('folderCount', function() {
    return this.get('folderCount') > 0;
  }),
  hasError: false,
  shouldRetry: false,
  currentFailedPath: '',
  currentUnprocessedPaths: [],
  currentFailureMessage: '',
  isDeleting: false,

  disableCloseOnEscape: Ember.observer('isDeleting', function() {
    if (this.get('isDeleting') === true) {
      this.set('closeOnEscape', false);
    } else {
      this.set('closeOnEscape', true);
    }
  }),

  deletePaths: function(paths) {
    this.set('isDeleting', true);
    this.get('fileOperationService').deletePaths(paths, this.get('deletePermanently')).then(
      (response) => {
        this.set('isDeleting', false);
        this.send('close');
        this.sendAction('refreshAction');
      }, (error) => {
        this.set('isDeleting', false);
        if (error.unprocessable === true) {
          this.set('hasError', true);
          this.set('currentFailedPath', error.failed);
          this.set('currentFailureMessage', error.message);
          this.set('shouldRetry', error.retry);
          this.set('currentUnprocessedPaths', error.unprocessed);
        } else {
          this.set('isDeleting', false);
          console.log('Server error!!!');
          // TODO: Alert and close;
          this.send('close');
        }
      });
  },
  reset: function() {
    this.set('deletePermanently', false);
    this.set('hasError', false);
    this.set('shouldRetry', false);
    this.set('isDeleting', false);
    this.set('currentFailedPath', '');
    this.set('currentFailureMessage', '');
    this.set('currentUnprocessedPaths', '');
  },
  actions: {
    didOpenModal: function() {
      this.reset();
      console.log("Delete modal opened");
    },

    didCloseModal: function() {
      console.log("Delete Modal closed");
    },
    delete: function() {
      var currentPathsToDelete = this.get('selectedFiles').map((entry) => { return entry.get('path')});
      this.deletePaths(currentPathsToDelete);
    },
    retryError: function() {
      var newPaths = [this.get('currentFailedPath')];
      if (Ember.isArray(this.get('currentUnprocessedPaths'))) {
        newPaths.pushObjects(this.get('currentUnprocessedPaths'));
      }
      this.deletePaths(newPaths);
    },
    skipAndRetry: function() {
      this.deletePaths(this.get('currentUnprocessedPaths'));
    },
    skipAll: function() {
      this.send('close');
      this.sendAction('refreshAction');
    }
  }
});
