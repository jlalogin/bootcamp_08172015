define(function (require) {

	var
		registerSuite = require('intern!object'),
		assert = require('intern/chai!assert'),
		Account = require('app/models/account'),
		Accounts = require('app/collections/accounts');

  registerSuite({
    name: 'accounts Collection',

		model: function() {
			assert.strictEqual(Accounts.prototype.model, Account);
		},

		url: function() {
			assert.strictEqual(Accounts.prototype.url, "/api/accounts");
		}
  });
});
