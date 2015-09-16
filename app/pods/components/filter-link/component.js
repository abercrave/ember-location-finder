import Ember from 'ember';
import DynamicAnchor from 'ember-location-finder/mixins/dynamic-anchor';

const { computed, get } = Ember;
const { alias } = computed;

export default Ember.Component.extend(DynamicAnchor, {
  facet: null,
  facets: null,
  item: null,

  href: computed('facet', 'facets', 'item', 'prefix', function() {
    var facet = this.get('facet');
    var facets = this.get('facets');
    var item = this.get('item');
    var path = this.get('prefix');

    for (let facetName in facets) {
      if (facets.hasOwnProperty(facetName)) {
        let value = item.get(facetName);
        path += `/${facetName}/${value}`;
        if (facetName === facet) {
          break;
        }
      }
    }

    return path;
  }),

  text: computed('facet', 'item', function() {
    var facet = this.get('facet');
    return this.get(`item.${facet}`);
  })
});
