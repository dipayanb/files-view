import Ember from 'ember';
import OperationModal from '../mixins/operation-modal';

export default Ember.Component.extend(OperationModal, {
 closeOnEscape: true,
 hasError: false,
 errorMessage: '',
 isUpdating: false,
 copyService: Ember.inject.service('file-copy'),
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
     console.log("Copy modal opened");
   },
   didCloseModal: function() {
     console.log("Copy Modal did close.");
   },
   copy: function(){
      if(this.get('selectionName') !== ''){
        console.log('Path :: ' + this.get('selectionName'));
      }
      this.set('isUpdating', true);
      this.get('copyService').copy( this.get('selected.path'), this.get('selectionName'), this.get('fileSelectionService.lastFileSelected.isDirectory') )
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
