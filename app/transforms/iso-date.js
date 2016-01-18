import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    if (serialized) {
      return moment.utc(serialized).toDate();
    }
    return serialized;
  },

  serialize(deserialized) {
    if (deserialized) {
      return moment(deserialized).format('X');
    }
    return deserialized;
  }
});
