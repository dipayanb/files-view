import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['col-md-12', 'file-row'],
  classNameBindings: ['isSelected:row-selected'],
  isSelected: Ember.computed.alias('file.isSelected'),

  click: function(event) {
    if(event.shiftKey) {
      this.sendAction("multiSelectAction", this.get('file'), true);
    } else if (event.ctrlKey) {
      this.sendAction("multiSelectAction", this.get('file'), false);
    } else if (event.metaKey) {
      this.sendAction("multiSelectAction", this.get('file'), false);
    } else {
      this.sendAction("singleSelectAction", this.get('file'));
    }
  }
});
