import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "span",
  enabledModal: false, // was never used
  actions: {
    uploadFile: function() {
      alert('file uploaded.')
    },
    closeModal : function() {
      /* TODO :: Remove below two lines, these lines are HACK code for modal closing not behaving as expected. */
      $("#uploadFileModal").css('display','none');
      $(".modal-backdrop").remove();

      $("#uploadFileModal").modal('hide');
    },
    openModal : function() {
      $("#uploadFileModal").modal('show');
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

