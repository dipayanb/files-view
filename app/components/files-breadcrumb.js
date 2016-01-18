import Ember from 'ember';

export default Ember.Component.extend({
  path: '',
  collapseAt: 4,
  tagName: 'ul',
  classNames: ['breadcrumb'],
  collapsingRequired: false,
  collapsedCrumbs: [],
  expandedCrumbs: [],

  crumbs: Ember.on('init', Ember.observer('path', function() {
    var path = this.get('path');
    var currentPath = path.match(/((?!\/)\S)+/g) || [];
    currentPath.unshift("/");
    var that = this;
    var shouldCollapse = function(scope, array, index) {
      return (((array.length - 1) >= scope.get('collapseAt')) && (index < array.length - 2));
    };
    var getCrumb = function(index, allCrumbs) {
      return {name: allCrumbs[index], path: "/" + allCrumbs.slice(1, index + 1).join('/'), last: false};
    };

    var collapsedCrumbs = currentPath.map(function(curr, i, array) {
      if(shouldCollapse(that, array, i)) {
        return getCrumb(i, array);
      } else {
        return {};
      }
    }).filterBy('name');

    var crumbs = currentPath.map(function(curr, i, array) {
      if(!shouldCollapse(that, array, i)) {
        return getCrumb(i, array);
      } else {
        return {};
      }
    }).filterBy('name');

    crumbs.set('lastObject.last', true);

    if (collapsedCrumbs.length > 0) {
      this.set('collapsingRequired', true);
    } else {
      this.set('collapsingRequired', false);
    }
    this.set('collapsedCrumbs', collapsedCrumbs.reverse());
    this.set('expandedCrumbs', crumbs);
  }))

});
