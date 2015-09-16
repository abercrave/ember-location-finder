import Ember from 'ember';
import DynamicAnchor from 'ember-location-finder/mixins/dynamic-anchor';

const { computed } = Ember;
const { reads } = computed;

export default Ember.Component.extend(DynamicAnchor, {
  href: reads('content.href'),
  text: reads('content.text')
});
