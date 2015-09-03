(function() {

	var dependencies = [
		//"jquery", "underscore", "backbone", "marionette", "app/app.templates.hbs",
		//"app/models/account", "app/collections/accounts",
		"dojo/_base/declare", "dojo/parser", "dojo/ready", "dijit/_WidgetBase",
		"dojo/dom", "dojo/dom-construct"
	];

	function app(declare, parser, ready, _WidgetBase, dom, domConstruct) {

		declare("MyFirstWidget", [_WidgetBase], {

			buildRendering: function() {
				this.domNode = domConstruct.create("button", { innerHTML: "Click Me!"});
			},

			postCreate: function() {
				this.connect(this.domNode, "onclick", "clickMe");
			},

			clickMe: function() {
				console.log("I was clicked!");
			}

		});

		ready(function() {
			parser.parse();
		});

	}

	define(dependencies, app);

})();
