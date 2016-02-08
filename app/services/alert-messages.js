import Ember from 'ember';


/**
  Shows alert flash and also creates `alert` objects in store. If creation of
  `alert` objects in store pass `options.flashOnly` as `true`. The options
  required for creating the `alert` objects are:
  ```
    options.message: message field returned by the API server.
    options.status : Status XHR request if the message is a response to XHR request. Defaults to -1.
    options.error: Detailed error to be displayed.
  ```
  Options required for ember-cli-flash can also be passed in the alertOptions to override the
  default behaviour.
*/
export default Ember.Service.extend({
  flashMessages: Ember.inject.service('flash-messages'),
  store: Ember.inject.service('store'),

  success: function(message, options = {}, alertOptions = {}) {
    this._clearMessagesIfRequired(alertOptions);
    this._createAlert(message, 'success', options, alertOptions);
    this.get('flashMessages').success(message, this._getOptions(options));
  },

  warn: function(message, options = {}, alertOptions = {}) {
    this._clearMessagesIfRequired(alertOptions, alertOptions);
    this._createAlert(message, 'warn', options);
    this.get('flashMessages').warn(message, this._getOptions(options));
  },

  info: function(message, options = {}, alertOptions = {}) {
    this._clearMessagesIfRequired(alertOptions);
    this._createAlert(message, 'info', options, alertOptions);
    this.get('flashMessages').info(message, this._getOptions(options));
  },

  danger: function(message, options = {}, alertOptions = {}) {
    this._clearMessagesIfRequired(alertOptions);
    this._createAlert(message, 'danger', options, alertOptions);
    this.get('flashMessages').danger(message, this._getOptions(options));
  },

  clearMessages: function() {
    this.get('flashMessages').clearMessages();
  },

  _createAlert: function(message, type, options, alertOptions) {
    var data = {};
    data.message = message;
    data.responseMessage = options.message || '';
    data.id = this._getNextAlertId();
    data.type = type;
    data.status = options.status || -1;
    data.trace = this._getDetailedError(options.trace);
    delete options.status;
    delete options.error;

    if(alertOptions.flashOnly !== true) {
      return this.get('store').createRecord('alert', data);
    }
  },

  _getDetailedError: function(error) {
    return error || '';
  },

  _getOptions: function(options = {}) {
    var defaultOptions = {
      priority: 100,
      showProgress: true,
      timeout: 6000
    };
    return Ember.merge(defaultOptions, options);
  },

  _getNextAlertId: function() {
    return this.get('store').peekAll('alert').get('length') + 1;
  },

  _clearMessagesIfRequired: function(options = {}) {
    var stackMessages = options.stackMessages || false;
    if(stackMessages !== true) {
      this.clearMessages();
    }
  }
});
