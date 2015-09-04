(function() {

	var dependencies = [
		"dojo/_base/declare", "dojo/parser", "dojo/ready", "dijit/_WidgetBase",
		"dojo/dom", "dojo/dom-construct", "dijit/_TemplatedMixin"
	];

	function app(declare, parser, ready, _WidgetBase, dom, domConstruct, _TemplatedMixin) {

		return declare("MyFirstWidget", [_WidgetBase, _TemplatedMixin], {

			templateString: "<button data-dojo-attach-event='onclick: clickMe' data-dojo-attach-point='labelNode'></button>",

			postCreate: function() {
				this.connect(this.domNode, "onclick", "clickMe");
			},

			clickMe: function() {
				console.log("I was clicked!");
			},

			label: "Click Me",
			_setLabelAttr: { node: "labelNode", type:"innerHTML" }

		});
	}

	define(dependencies, app);

})();
