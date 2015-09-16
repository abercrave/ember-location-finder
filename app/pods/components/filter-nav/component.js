import Ember from 'ember';
import objectifyPath from 'ember-location-finder/utils/objectify-path';

const { computed, observer, on } = Ember;
const { alias } = computed;

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: [
    'filter'
  ],

  action: 'gotoRoute',
  currentPathname: null,
  facets: null,
  prefixPath: null,
  prefixText: null,

  filterLinks: computed('currentPathname', 'facets', 'prefix', function() {
    var currentPathname = this.get('currentPathname');
    var filterItems;

    if (Ember.isPresent(currentPathname)) {
      let prefixPath = this.get('prefixPath');
      let pathSegments = currentPathname.replace(prefixPath, '').split('/').filter(function(item) {
        return item !== '';
      });

      filterItems = [{
        href: prefixPath,
        text: this.get('prefixText')
      }];

      pathSegments.forEach(function(item, index, pathSegments) {
        let isKey = index % 2 === 0;
        let nextIndex = index + 1;
        let value = pathSegments[nextIndex];
        if (isKey && value && value !== 'undefined') {
          let itemPath = pathSegments.slice(0, nextIndex + 1).join('/');
          filterItems.push({
            href: `${prefixPath}/${itemPath}`,
            text: decodeURI(value)
          });
        }
      });
    }

    return filterItems;
  }),

  actions: {
    gotoRoute(path) {
      this.sendAction('action', path);
    }
  }
});
