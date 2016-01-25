import Ember from 'ember';
import FileOperationMixin from '../../../mixins/file-operation';
import { module, test } from 'qunit';

module('Unit | Mixin | file operation');

// Replace this with your real tests.
test('it works', function(assert) {
  let FileOperationObject = Ember.Object.extend(FileOperationMixin);
  let subject = FileOperationObject.create();
  assert.ok(subject);
});
