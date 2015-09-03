(function() {

	var dependencies = [
		//"jquery", "underscore", "backbone", "marionette", "app/app.templates.hbs",
		//"app/models/account", "app/collections/accounts",
		"dojo/_base/declare", "dojo/parser", "dojo/ready", "dijit/_WidgetBase",
		"dojo/dom", "dojo/dom-construct", "dijit/_TemplatedMixin"
	];

	function app(declare, parser, ready, _WidgetBase, dom, domConstruct, _TemplatedMixin) {

		var Person = declare(null, {

			constructor: function(args) {
				declare.safeMixin(this,args);
			},

			getFullName: function() {
				return this.firstName + " " + this.lastName;
			}

		});

		var Employee = declare([Person], {

			constructor: function(args) {
				declare.safeMixin(this,args);
			},

			getEmpInfo: function() {
				return this.empId + " " + this.lastName + ", " + this.firstName;
			}

		});

		var emp = new Employee({
			firstName: "Eric",
			lastName: "Greene",
			empId: 1
		});
		console.dir(emp);
		console.log(emp.getEmpInfo());
		console.log(emp.getFullName());


	}

	define(dependencies, app);

})();
