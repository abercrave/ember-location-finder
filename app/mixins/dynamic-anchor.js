import Ember from 'ember';

const { computed, get } = Ember;
const { alias } = computed;

export default Ember.Mixin.create({
  tagName: 'a',
  attributeBindings: [
    'href'
  ],

  action: 'gotoRoute',
  href: null,
  prefix: '/',
  text: null,

  click(e) {
    e.preventDefault();
    this.sendAction('action', get(this, 'href'));
  }
});
