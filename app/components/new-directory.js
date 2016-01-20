import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "span",
  enabledModal: false,

  actions: {
    createDirectory: function() {
      alert('directory created')
    },
    closeModal : function() {
      /* TODO :: Remove below two lines, these lines are HACK code for modal closing not behaving as expected. */
      $("#createDirectoryModal").css('display','none');
      $(".modal-backdrop").remove();

      $("#createDirectoryModal").modal('hide');
    },
    openModal : function() {
      $("#createDirectoryModal").modal('show');
    }
  }


});
