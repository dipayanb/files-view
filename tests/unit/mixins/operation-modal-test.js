import Ember from 'ember';
import OperationModalMixin from '../../../mixins/operation-modal';
import { module, test } from 'qunit';

module('Unit | Mixin | operation modal');

// Replace this with your real tests.
test('it works', function(assert) {
  let OperationModalObject = Ember.Object.extend(OperationModalMixin);
  let subject = OperationModalObject.create();
  assert.ok(subject);
});
