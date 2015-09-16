import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: [
    'disabled',
    'type'
  ],

  enabled: true,
  type: 'button',

  disabled: Ember.computed.not('enabled'),

  click() {
    if (this.get('enabled')) {
      this.sendAction();
    }
  }
});
