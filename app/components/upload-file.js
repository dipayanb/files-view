import Ember from 'ember';
import OperationModal from '../mixins/operation-modal';

export default Ember.Component.extend(OperationModal, {
  modalEventBus: Ember.inject.service('modal-event-bus'),
  tagName: "span",
  closeOnEscape: true,
  name: 'ctx-uploader',
  path: '',
  didInitAttrs: function() {
    this.get('modalEventBus').registerModal("ctx-uploader");
  },
  actions: {
    openModal : function() {
      this.get('modalEventBus').showModal('ctx-uploader');
    },
    /* TODO :: change the fileLoaded for actual implementation.  */
    fileLoaded: function(file) {
    			// readAs="readAsFile"
    			console.log(file.name, file.type, file.size);
    			// readAs="readAsArrayBuffer|readAsBinaryString|readAsDataURL|readAsText"
    			console.log(file.filename, file.type, file.data, file.size);
    			alert('Here are the file details ::  ' +  ' file.name: ' + file.name + ' file.type: '+ file.type + ' file.size: ' +  file.size);
    }

  }
});

