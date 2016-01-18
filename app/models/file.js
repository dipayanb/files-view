import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  isDirectory                       : DS.attr('boolean'),
  readAccess                        : DS.attr('boolean'),
  writeAccess                       : DS.attr('boolean'),
  executeAccess                     : DS.attr('boolean'),
  len                               : DS.attr('number'),
  owner                             : DS.attr('string'),
  group                             : DS.attr('string'),
  premission                        : DS.attr('string'),
  accessTime                        : DS.attr('iso-date'),
  modificationTime                  : DS.attr('iso-date'),
  blockSize                         : DS.attr('number'),
  replication                       : DS.attr('number'),
  size                              : Ember.computed.alias('len'),

  path: function() {
    return this.get('id');
  }.property('id'),

  name: function() {
    var splitPath = this.get('path').split('/');
    return splitPath.get(splitPath.length - 1);
  }.property('path'),

  date: function() {
    return parseInt(moment(this.get('modificationTime')).format('X'));
  }.property('modificationTime')

});
