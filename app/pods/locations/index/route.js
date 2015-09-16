import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    startPage: {
      replace: true
    }
  },

  model(params) {
    var application = this.controllerFor('application');

    if (application.get('debug')) {
      console.log('model! (initial load)');
    }

    // Tell the API to return the appropriate number of results for the current page on first load
    params.limit = application.get('limit');
    params.page = 1;

    return this.store.query('location', params);
  },

  setupController: function(controller, model) {
    this._super.apply(this, arguments);

    if (!model) {
      return;
    }

    let meta = model.get('meta');

    if (Ember.isEmpty(meta)) {
      return;
    }

    // Update controller meta
    controller.setProperties({
      facets: meta.facets,
      isLoading: false,
      pagesTotal: meta.pagesTotal,
      recordsTotal: meta.recordsTotal
    });
  }
});
