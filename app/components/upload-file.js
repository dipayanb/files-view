import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "span",
  click: function() {
    //this.set('isSelected', !this.get('isSelected'));
    alert('I am in Upload File.');
  }
});
