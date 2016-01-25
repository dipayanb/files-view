import Ember from 'ember';
import OperationModal from '../mixins/operation-modal';

export default Ember.Component.extend(OperationModal, {
  //consoleOnEscape: false,
  actions: {
    didOpenModal: function() {
      console.log("Rename modal opened");
    },
    didCloseModal: function() {
      console.log("Rename Modal did close.");
    }
  }
});
