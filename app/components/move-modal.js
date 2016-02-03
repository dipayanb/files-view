import Ember from 'ember';
import OperationModal from '../mixins/operation-modal';

export default Ember.Component.extend(OperationModal, {

 closeOnEscape: true,
 hasError: false,
 errorMessage: '',
 isUpdating: false,
 moveService: Ember.inject.service('file-move'),
 fileSelectionService: Ember.inject.service('files-selection'),
 selectedFiles: Ember.computed.alias('fileSelectionService.files'),
 selected: Ember.computed('selectedFiles', function() {
   return this.get('selectedFiles').objectAt(0);
 }),
 selectionName: '',
 hasErrorReset: Ember.observer('selectionName', 'selected.name', function() {
   if (this.get('hasError') && (this.get('selectionName') !== this.get('selected.name'))) {
     this.set('hasError', false);
   }
 }),

 actions: {
   didOpenModal: function() {
     console.log("Move modal opened");
   },
   didCloseModal: function() {
     console.log("Move Modal did close.");
   },
   move: function(){
      if(this.get('selectionName') !== ''){
        console.log('Path :: ' + this.get('selectionName'));
      }
      this.set('isUpdating', true);
      this.get('moveService').move( this.get('selected.path'), this.get('selectionName'), this.get('fileSelectionService.lastFileSelected.isDirectory') )
      .then((response) => {
        console.log('Successful:: ', response);
        this.set('isUpdating', false);
        this.send('close');
        this.sendAction('refreshAction');
      }, (error) => {

        console.log('Error:: ', error);

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
