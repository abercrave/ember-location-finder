import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  gotoRoute: 'gotoRoute',

  actions: {
    gotoRoute(path) {
      this.sendAction('gotoRoute', path);
    }
  },
});
