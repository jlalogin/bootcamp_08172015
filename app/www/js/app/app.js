(function() {

	//"use strict";

	var dependencies = [
		"jquery", "underscore", "backbone", "marionette", "app/app.templates.hbs",
		"app/models/account", "app/collections/accounts",
		//"dojo/Evented", "dojo/_base/declare", "dojo/parser", "dojo/ready", "dijit/_WidgetBase",
		//"dojo/dom", "dojo/dom-construct", "dijit/_TemplatedMixin", "dojo/query", "dojo/on"
	];

	function app($, _, Backbone, Marionette, Templates, Account, Accounts) {

		var RowView = Backbone.View.extend({

			tagName: "tr",

			template: function() {
				return Templates["rowView"];
			},

			render: function() {
				this.$el.append(this.template()(this.model.toJSON()));
				return this;
			}

		});

		var TableView = Backbone.View.extend({

			tagName: "table",
			childView: RowView,
			childViewAttachPoint: "tbody",

			initialize: function(options) {
				this.childViews = [];

				this.on("beforeRemove", function() {
					console.log("remove fired");
					this.childViews.forEach(function(childView) {
						console.log("called remove on child view");
						childView.remove();
					});
				});
			},

			remove: function() {
				this.trigger("beforeRemove");
				Backbone.View.prototype.remove.call(this);
			},

			template: function() {
				return Templates["tableView"];
			},

			render: function() {

				var view = this;

				this.$el.append(this.template());
				var childViewAttachPoint = this.$el.find(this.childViewAttachPoint);

				this.collection.forEach(function(model) {
					var childView = new view.childView({
						model: model
					});

					childViewAttachPoint.append(childView.render().$el);

					view.childViews.push(childView);

				});

				return this;

			}
		});


		var accounts = new Accounts();
		accounts.fetch().then(function(collection) {

			var tableView = new TableView({
				collection: collection
			})
			$("#app").append(tableView.render().$el);

			setTimeout(function() {
				tableView.remove();
			}, 3000);


		});




	}

	define(dependencies, app);

})();
