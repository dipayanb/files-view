import Ember from 'ember';
import OperationModal from '../mixins/operation-modal';

export default Ember.Component.extend(OperationModal, {
  modalEventBus: Ember.inject.service('modal-event-bus'),
  fileOperationService: Ember.inject.service('file-operation'),
  closeOnEscape: true,
  tagName: 'span',
  name: 'ctx-new-directory',
  hasError: false,
  errorMessage: '',
  folderName: '',
  didInitAttrs: function() {
    this.get('modalEventBus').registerModal("ctx-new-directory");
  },
  resetError: Ember.observer('folderName', function() {
    this.set('hasError', false);
    this.set('errorMessage', '');
  }),
  setError: function(message) {
    this.set('hasError', true);
    this.set('errorMessage', message);
  },
  actions: {
    didOpenModal: function() {
      this.set('folderName');
      Ember.run.later(() => {
        this.$('input').focus();
      }, 500);
    },
    create: function() {
      if(Ember.isBlank(this.get('folderName'))) {
        this.setError('Cannot be empty');
        return false;
      }

      if(this.get('fileOperationService').isExistsInCurrentPath(this.get('folderName'))) {
        this.setError('Name already exists');
        return false;
      }

      this.get('fileOperationService').createNewFolder(this.get('path'), this.get('folderName')).then(
        (response) => {
          this.send('close');
          this.sendAction('refreshAction');
        }, (error) => {
          this.send('close');
        });
    },
    openModal : function() {
      this.get('modalEventBus').showModal('ctx-new-directory');
    }
  }
});
