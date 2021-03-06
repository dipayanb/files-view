import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('files');
  this.route('messages', function() {
    this.route('message', {path: '/message/:message_id'});
  });
});

export default Router;
