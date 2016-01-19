import Ember from 'ember';

export function getValueFromColumns(params) {
  let columnsArray = params[0];
  let key = params[1];
  let paramKey = params[2];

  var column = columnsArray.filterBy('key', key);

  if(column.length > 0) {
    return column[0][paramKey];
  }
  return "";
}

export default Ember.Helper.helper(getValueFromColumns);
