import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('files-breadcrumb', 'Integration | Component | files breadcrumb', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{files-breadcrumb}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#files-breadcrumb}}
      template block text
    {{/files-breadcrumb}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
