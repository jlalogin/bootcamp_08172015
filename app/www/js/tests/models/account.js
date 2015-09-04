define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');
    var Account = require('/js/app/models/account');

    registerSuite({
        name: 'account Model',

				idAttribute: function() {
					assert.strictEqual(Account.prototype.idAttribute, "_id");
				},

				urlRoot: function() {
					assert.strictEqual(Account.prototype.urlRoot, "/api/accounts");
				},

        getName: function () {

					var account = new Account({
						firstName: "Bob",
						lastName: "Smith"
					});

					assert.strictEqual(account.getName(), "Bob Smith");
        }
    });
});
