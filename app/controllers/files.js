import Ember from 'ember';
import columnConfig from '../config/files-columns';

export default Ember.Controller.extend({
  queryParams: ['path'],
  path: '/',
  columns: columnConfig,
  sortProperty: [],

  // This is required as the validSearchText will be debounced and will not be
  // called at each change of searchText. searchText is required so that sub
  // components(file search componenet) UI can be cleared from outside.(i.e, from
  // the afterModel of the route when the route changes)
  searchText: '',
  validSearchText: '',

  sortedContent: Ember.computed.sort('model', 'sortProperty'),

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
    }
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
