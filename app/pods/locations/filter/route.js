import Ember from 'ember';
import LocationsIndexRoute from 'ember-location-finder/pods/locations/index/route';
import objectifyPath from 'ember-location-finder/utils/objectify-path';

export default LocationsIndexRoute.extend({
  controllerName: 'locations/index',
  queryParams: {
    startPage: {
      replace: true
    }
  },

  model(params) {
    var application = this.controllerFor('application');
    var filters = objectifyPath(params.segments); // Extract filter key/value pairs

    if (application.get('debug')) {
      console.log('model! (initial load)');
    }

    delete params.segments;
    params.limit = application.get('limit');
    params.page = 1;

    return this.store.query('location', Ember.$.extend(params, filters));
  },

  renderTemplate(controller, model) {
    this.render('locations/index');
  }
});
