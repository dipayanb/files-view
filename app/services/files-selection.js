import Ember from 'ember';

export default Ember.Service.extend({
  files: [],
  lastFileSelected: null,
  filesCount: Ember.computed('files.[]', function() {
    return this.get('files').filterBy('isDirectory', false).length;
  }),
  folderCount: Ember.computed('files.[]', 'filesCount', function() {
    return this.get('files.length') - this.get('filesCount');
  }),

  init: function() {
    console.log("Selection service created!!!");
    this._super();
  },

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
  },

  reset: function() {
    this.set('files', []);
    this.set('lastFileSelected');
  }
});
