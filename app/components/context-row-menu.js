import Ember from 'ember';

export default Ember.Component.extend({
  fileSelectionService: Ember.inject.service('files-selection'),
  classNames: ['row', 'context-menu-row'],
  selectedFilesCount: Ember.computed.oneWay('fileSelectionService.filesCount'),
  selectedFolderCount: Ember.computed.oneWay('fileSelectionService.folderCount'),
  isMultiSelected: Ember.computed('selectedFilesCount', 'selectedFolderCount', function() {
    return this.get('selectedFilesCount') + this.get('selectedFolderCount') > 1;
  }),
  isSingleSelected: Ember.computed('selectedFilesCount', 'selectedFolderCount', function() {
    return this.get('selectedFilesCount') + this.get('selectedFolderCount') === 1;
  }),
  isSelected: Ember.computed('selectedFilesCount', 'selectedFolderCount', function() {
    return (this.get('selectedFilesCount') + this.get('selectedFolderCount')) !== 0;
  }),
  lastSelectedFile: Ember.computed.oneWay('fileSelectionService.lastFileSelected'),

  actions: {
    open: function(event) {
      if (this.get('isSingleSelected')) {
        var file = this.get('fileSelectionService.files').objectAt(0);
        if (file.get('isDirectory')) {
          console.log('need to transition to ' + file.get('path'));
        }
      }

    },

    delete: function(event) {
      if (!this.get('isSelected')) {
        return false;
      }
      console.log("Delete called!!!");
    },

    copy: function(event) {
      if (!this.get('isSelected')) {
        return false;
      }
      console.log("Copy called!!!");
    },

    move: function(event) {
      if (!this.get('isSelected')) {
        return false;
      }
      console.log("move called!!!");

    },

    download: function(event) {
      if (!this.get('isSelected')) {
        return false;
      }
      console.log("download called!!!");

    },

    concatenate: function(event) {
      if (!this.get('isSelected')) {
        return false;
      }
      console.log("Concatenate called!!!");
    },

    rename: function(event) {
      if (!this.get('isSingleSelected')) {
        return false;
      }
      console.log('rename called!!!');
    }
  }

});
