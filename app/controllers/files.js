import Ember from 'ember';
import columnConfig from '../config/files-columns';

export default Ember.Controller.extend({
  fileSelectionService: Ember.inject.service('files-selection'),

  queryParams: ['path'],
  path: '/',
  columns: columnConfig,

  // This is required as the validSearchText will be debounced and will not be
  // called at each change of searchText. searchText is required so that sub
  // components(file search componenet) UI can be cleared from outside.(i.e, from
  // the afterModel of the route when the route changes)
  searchText: '',
  validSearchText: '',

  sortProperty: [],
  sortEnabled: Ember.computed('fileSelectionService.files.length', function() {
    return this.get('fileSelectionService.files.length') === 0;
  }),

  allSelected: Ember.computed('fileSelectionService.files.length', function() {
    return this.get('fileSelectionService.files.length') !== 0 && this.get('fileSelectionService.files.length') === this.get('model.length');
  }),

  sortedContent: Ember.computed.sort('model', 'sortProperty'),

  resetSelection: Ember.observer('path', function() {
    this.get('fileSelectionService').reset();
  }),

  arrangedContent: Ember.computed('model', 'sortProperty', 'validSearchText', function() {
    var searchText = this.get('validSearchText');
    if(!Ember.isBlank(searchText)) {
      return this.get('sortedContent').filter(function(entry) {
        return !!entry.get('name').match(searchText);
      });
    }
    return this.get('sortedContent');
  }),

  actions: {
    sortFiles: function(sortColumn) {
      if (sortColumn['sortOrder'] !== 0) {
        var sortProperty = sortColumn['key'] + ':' + this._getSortOrderString(sortColumn);
        this.set('sortProperty', [sortProperty]);
      } else {
        this.set('sortProperty', []);
      }
    },

    searchFiles: function(searchText) {
      this.set('validSearchText', searchText);
    },

    /* Selects a single file. Clears previous selection */
    selectSingle: function(file) {
      this.get('fileSelectionService').deselectAll();
      this.get('fileSelectionService').selectFiles([file]);
    },

    /*
      Selects file without clearing the previous selection. If sticky is true
      then shiftkey was pressed while clicking and we should select all the
      files in between
    */
    selectMultiple: function(file, sticky) {
      if(!sticky) {
        if(file.get('isSelected')) {
          this.get('fileSelectionService').deselectFile(file);
        } else {
          this.get('fileSelectionService').selectFiles([file]);
        }
      } else {
        var lastFileSelected = this.get('fileSelectionService.lastFileSelected');
        var indexRange = this._getIndexRangeBetweenfiles(lastFileSelected, file);
        if(indexRange[0] === indexRange[1]) {
          return false;
        }
        var filesInRange = this._getFilesInRange(indexRange[0], indexRange[1]);
        this.get('fileSelectionService').deselectAll();
        this.get('fileSelectionService').selectFiles(filesInRange);
      }
    },

    selectAll: function(selectStatus) {
      this.get('fileSelectionService').deselectAll();
      if(selectStatus === false) {
        this.get('fileSelectionService').selectFiles(this.get('sortedContent'));
      }
    },

    /* Deselects the current selections */
    deselectAll: function() {
      this.get('fileSelectionService').deselectAll();
    },

    //Context Menu actions
    openFolder: function(path) {
      this.transitionToRoute({queryParams: {path: path}});
    }
  },

  _getIndexRangeBetweenfiles: function(startFile, endFile) {
    var startIndex = this.get('arrangedContent').indexOf(startFile);
    var endIndex = this.get('arrangedContent').indexOf(endFile);
    if (startIndex < endIndex) {
      return [startIndex, endIndex];
    } else {
      return [endIndex, startIndex];
    }
  },

  _getFilesInRange: function(startIndex, endIndex) {
    var range = Array.apply(null, Array(endIndex - startIndex + 1)).map(function (_, i) {return startIndex + i;});
    return this.get('arrangedContent').objectsAt(range);
  },

  _getSortOrderString: function(column) {
    if (column['sortOrder'] === -1) {
      return 'desc';
    } else if (column['sortOrder'] === 1) {
      return 'asc';
    } else {
      return '';
    }
  },
});
