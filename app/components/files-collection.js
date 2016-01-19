import Ember from 'ember';

export default Ember.Component.extend({
  minHeight: 600,
  currentWidth: 1000,
  currentHeight: 600,
  columnsConfig: [],
  sortOptions: [-1, 0, 1],

  containerStyle: Ember.computed('currentHeight', function() {
    var height = this.get('currentHeight');
    var style = 'position: relative; height: ' + height + 'px';
    return style.htmlSafe();
  }),

  resizeView: Ember.on('init', function() {
    $(window).resize(this.windowResized(this));
  }),

  windowResized: function(scope) {
    return function() {
      Ember.run.later(function() {
        var currentWidth = $("#" + scope.get('containerId')).width();
        var windowHeight = $(window).height()
        var relativeHeight = windowHeight - 150;
        if(relativeHeight < scope.get('minHeight')) {
          relativeHeight = scope.get('minHeight');
        }
        scope.set('currentWidth', currentWidth);
        scope.set('currentHeight', relativeHeight);
      });
    };
  },

  didInsertElement: function() {
    var func = this.windowResized(this);
    func();
  },

  actions: {
    rotateSort: function(column) {
      if(!column['sortable']) {
        return false;
      }
      var sortOptions = this.get('sortOptions');
      // Resetting the current sort order
      this.get('columnsConfig').forEach(function(entry) {
        if(entry['key'] !== column['key']) {
          Ember.set(entry, 'sortOrder', sortOptions[1]);
        }
      });
      var currentSortOrder = column['sortOrder'];
      var currentSortOrderIndex = sortOptions.indexOf(currentSortOrder);
      var nextSortOrderIndex = (currentSortOrderIndex + 1) % sortOptions.length;
      Ember.set(column, 'sortOrder', sortOptions[nextSortOrderIndex]);
      this.sendAction('sortAction', column);
    }
  }
});