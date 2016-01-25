import Ember from 'ember';
import OperationModal from '../mixins/operation-modal';

export default Ember.Component.extend(OperationModal, {
  closeOnEscape: true,
  actions: {

    didOpenModal: function() {
      console.log("Delete modal opened");
    },

    didCloseModal: function() {
      console.log("Delete Modal closed");
    }
  }


});
