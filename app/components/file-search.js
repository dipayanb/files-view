import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['input-group'],
  classNameBindings: ['expanded::col-md-6', 'expanded::col-md-offset-6'],
  expanded: false,

  searchText: '',

  throttleTyping: Ember.observer('searchText', function() {
    Ember.run.debounce(this, this.searchFiles, 500);
  }),

  searchFiles: function() {
    this.sendAction('searchAction', this.get('searchText'));
  },

  focusIn: function() {
    this.set('expanded', true);
  },
  focusOut: function() {
    this.set('expanded', false);
  }
});
