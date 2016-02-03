import Ember from 'ember';
import OperationModal from '../mixins/operation-modal';

export default Ember.Component.extend(OperationModal, {
 consoleOnEscape: false,
 selectedFolderPath: '',
 actions: {
   didOpenModal: function() {
     console.log("Move modal opened");
   },
   didCloseModal: function() {
     console.log("Move Modal did close.");
   },
   setPathModal: function(){
      alert('hi');
      //this.set('selectedPath',path);
   },
   move: function(){
      if(this.get('selectedFolderPath') !== ''){
        alert('Dirrectory:: ' + this.get('selectedFolderPath'));
      }
   }
 }


});
