import Ember from 'ember';
import OperationModal from '../mixins/operation-modal';

export default Ember.Component.extend(OperationModal, {
  closeOnEscape: true,
  filePreviewService: Ember.inject.service('file-preview'),
  modalGuardChanged: Ember.observer('modalGuard', function(){
    if(this.get('modalGuard')) {
      console.log("Modal Guard set");
    } else {
      console.log("Modal Guard not set");
    }
  }),

  actions: {
    // Actions to preview modal HTML.
    didOpenModal : function() {
      this.get('filePreviewService').getNextContent();
      var _self = this;
      this.$('.preview-content').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
          _self.get('filePreviewService').getNextContent();
        }
      });
    },
    didCloseModal: function() {
      this.$('.preview-content').off('scroll');
      this.get('filePreviewService').reset();
    }
  }

});
