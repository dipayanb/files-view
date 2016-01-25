import Ember from 'ember';

export default Ember.Service.extend({
  registerModal: function(modalControlProperty) {
    if(Ember.isBlank(modalControlProperty) || (typeof modalControlProperty !== 'string')) {
      Ember.assert("Modal: Can only register with a 'String' control property name.", false);
      return false;
    }
    if(typeof this.get(modalControlProperty) !== 'undefined') {
      Ember.assert("Modal: '" + modalControlProperty + "' has already been registered.", false);
      return false;
    }
    this.set(modalControlProperty, false);
  },

  showModal: function(modalControlProperty) {
    if(Ember.isBlank(modalControlProperty) || (typeof modalControlProperty !== 'string')) {
      Ember.assert("Modal: Can only use 'String' control property name for showing modal.", false);
      return false;
    }
    this.set(modalControlProperty, true);
  },
  resetModal: function(modalControlProperty) {
    if(Ember.isBlank(modalControlProperty) || (typeof modalControlProperty !== 'string')) {
      Ember.assert("Modal: Can only use 'String' control property name for reset modal.", false);
      return false;
    }
    this.set(modalControlProperty, false);
  }
});
