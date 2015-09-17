import Ember from 'ember';

const {
  computed,
  get,
  getProperties,
  inject,
  isNone,
  observer,
  on,
  run,
  set,
  setProperties
} = Ember;

const {
  alias,
  and,
  equal,
  gte,
  not,
  readOnly
} = computed;

export default Ember.Controller.extend({
  application: inject.controller(),
  queryParams: [
    'startPage'
  ],

  facets: null,
  limit: alias('application.limit'),
  page: 1,
  pagesTotal: null,
  previousPage: 1,
  recordsAreLoading: false,
  recordsTotal: null,
  startPage: alias('page'),

  currentPathname: readOnly('application.currentPathname'),
  isLoading: alias('application.isLoading'),
  locations: alias('model'),
  recordsLoaded: readOnly('model.length'),

  /*filters: computed('facets', 'locations', function() {
    var locations = get(this, 'locations');
    var options = [];

    if (Ember.isPresent(locations)) {

      get(this, 'facets').forEach(facet => {
        options[facet] = [];

        locations.forEach(function(location) {
          let propertyValue = location.get(facet);
          if (propertyValue && !options[facet].contains(propertyValue)) {
            options[facet].push(propertyValue);
          }
        });

        options[facet].sortBy('name');
      });

      return options;
    }
  }),*/

  hasMore: computed('page', 'pagesTotal', function() {
    var meta = getProperties(this, 'page', 'pagesTotal');
    return meta.pagesTotal && meta.page < meta.pagesTotal;
  }),

  loadRecords(addRecords=true) {

    if (get(this, 'application.debug')) {
      console.log('++++++++++++++');
      console.log('loadRecords! (addRecords:', addRecords, ')');
    }

    var self = this;

    var limit = get(this, 'limit');
    var recordsLoaded = get(this, 'recordsLoaded');
    var page = get(this, 'page');
    var pagesTotal = get(this, 'pagesTotal');
    var recordsTotal = get(this, 'recordsTotal');

    var recordsThreshold = page * limit; // Calculate the expected number of results

    console.log('recordsTotal:', get(this, 'recordsTotal'));

    // Abort if already at the expected number of results
    if (recordsLoaded === recordsThreshold || recordsLoaded === recordsTotal) {

      if (get(this, 'application.debug')) {
        console.log(' -> Already at the expected number of results ... Abort!');
      }

      return;
    }

    if (get(this, 'application.debug')) {
      console.log(' -> limit:', limit);
      console.log(' -> page:', page);
      console.log(' -> recordsThreshold:', recordsThreshold);
      console.log(' -> current locations: ', get(self, 'locations'));
      console.log(' -> recordsLoaded:', recordsLoaded);
    }

    if (addRecords) {

      // Mark as loading
      set(this, 'isLoading', true);

      // Calculate the actual current page number if there are an unexpectedly large number of results already loaded
      if (addRecords && recordsLoaded && recordsLoaded > recordsThreshold) {
        if (get(this, 'application.debug')) {
          console.log(' -> calculate the actual current page');
        }
        page = Math.floor(recordsLoaded / limit);
      }

      // Build the query
      let query = {
        country: get(this, 'facets.country'),
        limit: limit,
        locality: get(this, 'facets.locality'),
        page: page,
        region: get(this, 'facets.region')
      };

      if (get(this, 'application.debug')) {
        console.log(' -> build query:', query);
      }

      get(this, 'store').query('location', query).then(function(data) {

        if (get(self, 'application.debug')) {
          console.log(' -> payload received...');
          console.log(' -> add', limit, 'new records');
        }

        // Merge new content with that already fetched...
        let newRecords = data.get('content');
        self.get('model').pushObjects(newRecords);

        if (get(self, 'application.debug')) {
          console.log(' -> updated locations: ', get(self, 'locations'));
        }

        // Reset loading status
        set(self, 'isLoading', false);
      });

    } else {

      if (get(self, 'application.debug')) {
        console.log(' -> remove', (get(self, 'recordsLoaded') - recordsThreshold), 'extra records');
      }

      // Remove extra records
      let extraRecords = self.get('model').slice(recordsThreshold);
      self.get('model').removeObjects(extraRecords);
    }
  },

  pageDidChange: observer('page', function() {

    if (get(this, 'application.debug')) {
      console.log('++++++++++++++');
      console.log('pageDidChange!');
    }

    if (isNone(get(this, 'recordsLoaded'))) {

      if (get(this, 'application.debug')) {
        console.log(' -> aborting: no locations loaded...');
      }

      return;
    }

    let page = get(this, 'page');
    let previousPage = get(this, 'previousPage');
    let nextStep = page <= previousPage ? 'unloadRecords' : 'loadRecords';

    if (get(this, 'application.debug')) {
      console.log(' -> page:', page);
      console.log(' -> previousPage:', get(this, 'previousPage'));
    }

    // Update previous page property
    set(this, 'previousPage', page);

    if (get(this, 'application.debug')) {
      console.log(' -> go to next step:', nextStep);
    }

    run.next(this, nextStep);
  }),

  unloadRecords() {

    if (get(this, 'application.debug')) {
      console.log('++++++++++++++');
      console.log('unloadRecords!');
    }

    this.loadRecords(false);
  },

  actions: {
    showMore() {
      this.incrementProperty('page');
    }
  }
});
