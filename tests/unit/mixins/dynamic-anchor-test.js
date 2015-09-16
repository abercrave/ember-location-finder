import Ember from 'ember';
import DynamicAnchorMixin from '../../../mixins/dynamic-anchor';
import { module, test } from 'qunit';

module('Unit | Mixin | dynamic anchor');

// Replace this with your real tests.
test('it works', function(assert) {
  var DynamicAnchorObject = Ember.Object.extend(DynamicAnchorMixin);
  var subject = DynamicAnchorObject.create();
  assert.ok(subject);
});
