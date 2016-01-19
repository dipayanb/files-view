import Ember from 'ember';

export function showDate(params) {
  let date = params[0];
  let format = params[1];
  return moment(date).format(format);
}

export default Ember.Helper.helper(showDate);
