import Ember from 'ember';
import OperationModal from '../mixins/operation-modal';

export default Ember.Component.extend(OperationModal, {
  closeOnEscape: true,
  hasError: false,
  errorMessage: '',
  isUpdating: false,
  renameService: Ember.inject.service('file-rename'),
  fileSelectionService: Ember.inject.service('files-selection'),
  selectedFiles: Ember.computed.alias('fileSelectionService.files'),
  selected: Ember.computed('selectedFiles', function() {
    return this.get('selectedFiles').objectAt(0);
  }),
  selectionName: Ember.computed.oneWay('selected.name'),
  hasErrorReset: Ember.observer('selectionName', 'selected.name', function() {
    if (this.get('hasError') && (this.get('selectionName') !== this.get('selected.name'))) {
      this.set('hasError', false);
    }
  }),

  actions: {
    didOpenModal: function() {
      //this.set('selectionName', this.get('selected.name'));
      // This was required as the DOM may not be visible due to animation in bootstrap modal
      Ember.run.later(() => {
        this.$('input').focus();
      }, 500);

    },

    rename: function() {
      if(Ember.isBlank(this.get('selectionName'))) {
        return false;
      }

      if(this.get('selected.name') === this.get('selectionName')) {
        this.set('hasError', true);
        this.set('errorMessage', 'Name should be different');
        return false;
      }
      this.set('isUpdating', true);
      this.get('renameService').rename(this.get('selected.path'), this.get('selectionName'))
      .then((response) => {
        this.set('isUpdating', false);
        this.send('close');
        this.sendAction('refreshAction');
      }, (error) => {
        this.set('isUpdating', false);
        if(error.retry) {
          this.set('hasError', true);
          this.set('errorMessage', error.message);
        } else {
          this.send('close');
        }
      });
    }
  }
});
