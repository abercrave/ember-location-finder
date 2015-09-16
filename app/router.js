import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('locations', function() {
    this.route('filter', { path: '*segments' });
  });
  this.route('location', { path: '/location/:location_id' }, function() {
    this.route('edit');
  });
});

export default Router;
