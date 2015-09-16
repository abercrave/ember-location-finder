import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    gotoRoute(route) {
      this.transitionTo(route);
    },
    didTransition() {
      Ember.run.next(this, function () {
        this.controller.set('currentPathname', window.location.pathname);
      });
    },
  }
});
