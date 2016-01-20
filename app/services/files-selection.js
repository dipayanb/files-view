import Ember from 'ember';

export default Ember.Service.extend({
  files: [],
  lastFileSelected: null,

  selectFiles: function(files) {
    files.forEach((file) => {
      file.set('isSelected', true);
      this.get('files').pushObject(file);
      this.set('lastFileSelected', file);
    });
  },

  deselectAll: function() {
    this.get('files').forEach((file) => {
      file.set('isSelected', false);
    });
    this.set('files', []);
    this.set('lastFileSelected');
  }
});
