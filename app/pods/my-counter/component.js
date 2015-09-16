import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',

  count: 0,

  countObserver: Ember.observer('count', function() {
    console.log('count: ', this.get('count'));
  }),

  click() {
    this.incrementProperty('count');
  }
});
