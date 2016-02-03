import Ember from 'ember';
import OperationModal from '../mixins/operation-modal';

export default Ember.Component.extend(OperationModal, {
 consoleOnEscape: false,
 selectedFolderPath: '',
 actions: {
   didOpenModal: function() {
     console.log("Copy modal opened");
   },
   didCloseModal: function() {
     console.log("Copy Modal did close.");
   },
   move: function(){
      if(this.get('selectedFolderPath') !== ''){
        alert('Dirrectory:: ' + this.get('selectedFolderPath'));
      }
   }
 }
});
