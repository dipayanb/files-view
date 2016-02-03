import Ember from 'ember';

export default Ember.Component.extend({
  fileSelectionService: Ember.inject.service('files-selection'),
  modalEventBus: Ember.inject.service('modal-event-bus'),
  alertMessages: Ember.inject.service('alert-messages'),

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

  didInitAttrs: function() {
    // Register different modal so that they can be controlled from outside
    this.get('modalEventBus').registerModal('ctx-open');
    this.get('modalEventBus').registerModal('ctx-rename');
    this.get('modalEventBus').registerModal('ctx-permission');
    this.get('modalEventBus').registerModal('ctx-delete');
    this.get('modalEventBus').registerModal('ctx-copy');
    this.get('modalEventBus').registerModal('ctx-move');
    this.get('modalEventBus').registerModal('ctx-download');
    this.get('modalEventBus').registerModal('ctx-concatenate');
    window.abcd = this.get('alertMessages');
  },

  actions: {
    open: function(event) {
      if (this.get('isSingleSelected')) {
        var file = this.get('fileSelectionService.files').objectAt(0);
        if (file.get('isDirectory')) {
          this.sendAction('openFolderAction', file.get('path'));
        } else {
          this.get('modalEventBus').showModal('ctx-open');
        }
      }

    },

    delete: function(event) {
      if (!this.get('isSelected')) {
        return false;
      }
      this.get('modalEventBus').showModal('ctx-delete');
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
      this.get('modalEventBus').showModal('ctx-move');

    },

    download: function(event) {
      if (!this.get('isSelected')) {
        return false;
      }
      console.log("download called!!!");

    },

    concatenate: function(event) {
      if (!this.get('isMultiSelected')) {
        return false;
      }
      console.log("Concatenate called!!!");
    },

    rename: function(event) {
      if (!this.get('isSingleSelected')) {
        return false;
      }
      this.get('modalEventBus').showModal('ctx-rename');
    },

    modalClosed: function(modalName) {
      this.get('modalEventBus').resetModal(modalName);
    },

    refreshCurrentRoute: function() {
      this.get('fileSelectionService').reset();
      this.sendAction('refreshCurrentRouteAction');
    }
  }

});
