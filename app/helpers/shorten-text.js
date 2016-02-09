import Ember from 'ember';

export function shortenText(params) {
  let text = params[0];
  let length = params[1];
  if (text.length < length) {
    return text;
  } else {
    return text.substring(0, length - 3) + '...';
  }

}

export default Ember.Helper.helper(shortenText);
