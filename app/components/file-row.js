import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['col-md-12', 'file-row'],
  classNameBindings: ['isSelected:row-selected'],
  isSelected: Ember.computed.alias('file.isSelected'),

  click: function() {
    this.set('isSelected', !this.get('isSelected'));
  }
});
