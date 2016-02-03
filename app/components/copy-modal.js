import Ember from 'ember';
import OperationModal from '../mixins/operation-modal';

export default Ember.Component.extend(OperationModal, {
 closeOnEscape: true,
 selectedFolderPath: '',
 actions: {
   didOpenModal: function() {
     console.log("Copy modal opened");
   },
   didCloseModal: function() {
     console.log("Copy Modal did close.");
   },
   copy: function(){
      if(this.get('selectedFolderPath') !== ''){
        alert('Dirrectory:: ' + this.get('selectedFolderPath'));
      }
   }
 }
});
