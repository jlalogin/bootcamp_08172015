define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');
  var Account = require('/js/app/models/account');
  var fauxServer;


  registerSuite({
    name: 'account Model',

    'fields': {

			idAttribute: function() {
				assert.strictEqual(Account.prototype.idAttribute, "_id");
			},

			urlRoot: function() {
				assert.strictEqual(Account.prototype.urlRoot, "/api/accounts");
			}
    },

    'functions': {

      getName: function () {

				var account = new Account({
					firstName: "Bob",
					lastName: "Smith"
				});

				assert.strictEqual(account.getName(), "Bob Smith");
      }

    },

    'ajax': {

      setup: function () {

        fauxServer = require('backbone-faux-server');

        fauxServer
          .get("/api/accounts/:id", function (context, accountId) {

              return new Account({
                _id: parseInt(accountId, 10),
                emailAddress: "test@somedomain.com",
                firstName: "Jim",
                lastName: "Bob"
              }).toJSON();

          })
          .put("/api/accounts/:id", function (context, accountId) {
              return new Account(context.data).toJSON();
          })
          .del("/api/accounts/:id", function (context, accountId) {

              return new Account({
                _id: parseInt(accountId, 10),
                emailAddress: "test@somedomain.com",
                firstName: "Jim",
                lastName: "Bob"
              }).toJSON();
          });

      },

      teardown: function () {
        fauxServer.removeRoutes();
        fauxServer = undefined;
      },

      fetch: function() {

        var
          a = this.async(1000),
          modelId = 1,
          account = new Account({
            _id: modelId
          });

        account.fetch({
          success: a.callback(function(model) {
            console.dir(model);
            assert.strictEqual(model.id, modelId);
          })
        })

      }
    }
  });
});
