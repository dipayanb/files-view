import Ember from 'ember';

export function getSortingIcon(params/*, hash*/) {
  let sortOrder = params[0];
  var iconClass;
  if (sortOrder === 1) {
    iconClass = "chevron-down";
  } else if (sortOrder === -1) {
    iconClass = "chevron-up";
  } else {
    iconClass = "chevron-right";
  }
  return iconClass;
}

export default Ember.Helper.helper(getSortingIcon);
