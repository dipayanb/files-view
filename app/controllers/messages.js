import Ember from 'ember';

export default Ember.Controller.extend({
  currentBrowserPath: '/',
  isExpanded: true,
  shortenLenght: Ember.computed('isExpanded', function() {
    if(this.get('isExpanded') === true) {
      return 200;
    } else {
      return 100;
    }
  })
});
