import Ember from 'ember';
import columnConfig from '../config/files-columns';

export default Ember.Controller.extend({
  queryParams: ['path'],
  path: '/',
  columns: columnConfig
});
