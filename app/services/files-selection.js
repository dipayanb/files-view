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

  selectFiles: function(files) {
    files.forEach((file) => {
      file.set('isSelected', true);
      this.get('files').pushObject(file);
      this.set('lastFileSelected', file);
    });
  },

  deselectFile: function(file) {

    if (file.get('isSelected')) {
        file.set('isSelected', false);
    }

    this.set('files', this.get('files').without(file));
    if(file === this.get('lastFileSelected')) {
      this.set('lastFileSelected', this.get('files').objectAt(this.get('files.length') - 1));
    }

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
