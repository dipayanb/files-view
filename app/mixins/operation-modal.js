import Ember from 'ember';
import { EKMixin, keyUp, EKFirstResponderOnFocusMixin } from 'ember-keyboard';

export default Ember.Mixin.create(EKMixin, EKFirstResponderOnFocusMixin, {
  modalEventBus: Ember.inject.service('modal-event-bus'),
  name: '',
  closeOnEscape: false,
  isModalOpen: false,

  setupKey: Ember.on('init', function() {
    this.set('keyboardActivated', true);
  }),

  //disableEscape:
  closeModalOnEscape: Ember.on(keyUp('Escape'), function() {
    if (this.get('closeOnEscape')) {
      this.$('.modal').modal('hide');
    }
  }),

  initModal: function() {
    Ember.defineProperty(this, 'modalGuard', Ember.computed.alias('modalEventBus.' + this.get('name')));
    this.addObserver('modalGuard', () => {
      if(this.get('modalGuard')) {
        this.set('isModalOpen', true);
        Ember.run.later(this, () => {
          this.$('.modal').modal({backdrop: 'static', keyboard: false});
          this.$('.modal').on('hide.bs.modal', () => {
            this.send('closeModal');
          });
          this.send('modalOpened');
        });

      }
    });
  }.on('didInitAttrs'),

  hideModal: Ember.on('willDestroyElement', function() {
    if (this.get('isModalOpen')) {
      this.$('.modal').modal('hide');
    }
  }),

  removeModalSubscription: Ember.on('didDestroyElement', function() {
    this.set('isModalOpen', false);
    this.get('modalEventBus').resetModal(this.get('name'));
  }),

  actions: {
    /** close by action in the UI **/
    closeModal: function() {
      this.$('.modal').off('hide.bs.modal');
      this.send('didCloseModal');
    },

    modalOpened: function() {
      this.send('didOpenModal');
    },

    didCloseModal: function() {},
    didOpenModal: function() {}
  }
});
