import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr('string'),
  message: DS.attr('string'),
  status: DS.attr('number'),
  trace: DS.attr('string')
});
