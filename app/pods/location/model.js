import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  address: attr(),
  country: attr('string'),
  isHq: attr('boolean'),
  latitude: attr('string'),
  locality: attr('string'),
  longitude: attr('string'),
  name: attr('string'),
  postalCode: attr('string'),
  region: attr('string')
});
