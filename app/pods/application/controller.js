import Ember from 'ember';

const { computed, get, inject, observer, run, set } = Ember;
const { or } = computed;

export default Ember.Controller.extend({
  debug: true,
  isLoading: true,
  limit: 20,
  overlayIsOpen: false,

  overlayIsVisible: or('isLoading'),

  showOverlayObserver: observer('overlayIsVisible', function() {
    run.next(this, function() {
      set(this, 'overlayIsOpen', get(this, 'overlayIsVisible'));
    });
  })
});
