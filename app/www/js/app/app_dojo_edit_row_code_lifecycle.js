(function() {

	//"use strict";

	var dependencies = [
		//"jquery", "underscore", "backbone", "marionette", "app/app.templates.hbs",
		//"app/models/account", "app/collections/accounts",
		"dojo/Evented", "dojo/_base/declare", "dojo/parser", "dojo/ready", "dijit/_WidgetBase",
		"dojo/dom", "dojo/dom-construct", "dijit/_TemplatedMixin", "dojo/query", "dojo/on"
	];

	function app(Evented, declare, parser, ready, _WidgetBase, dom, domConstruct, _TemplatedMixin, query, on) {

		function removeAllChildren(node) {
			while (node.firstChild) {
    		node.removeChild(node.firstChild);
			}
			return node;
		}

		function appendChildren(node, childNodes) {
			childNodes.forEach(function(childNode) {
				node.appendChild(childNode);
			});
			return node;
		}

		var UserFileRow = declare("UserFileRow", [Evented, _WidgetBase, _TemplatedMixin], {

			templateString: [
				"<tr>",
				"<td data-dojo-attach-point='fileNameCol'></td>",
				"<td data-dojo-attach-point='fileDescCol'></td>",
				"<td data-dojo-attach-point='actionCol'></td>",
				"</tr>"
			].join(""),

			fileName: "",
			//_setFileNameAttr: { node: "fileNameCol", type:"innerText" },

			fileDesc: "",
			//_setFileDescAttr: { node: "fileDescCol", type:"innerText" },

			// Life Cycle Events

			// Step 1: Constructor
			// Initialize variables and such...
			constructor: function () {
				console.log("constructor");
				console.log(this.fileName);  // blank
	    },

			// Step 2: Post Mixin Properties
			// Called just before render, last chance to do anything before DOM elements are created
			// Note: no need to call base, its an empty function
	    postMixInProperties: function () {
				console.log("post mix in prop");
				console.log(this.fileName); // populated
	    },

			// Step 3: Build Rendering
			// Renders the widget
			buildRendering: function() {
				console.log("build rendering");

				// sample code of what base does
				// this.domNode = domConstruct.toDom(this._stringRepl(this.templateString), this.ownerDocument);

				// must call base for templating to work
				this.inherited(arguments);
			},

			// Step 4: Post Create
			// After rendering, but before the widget is attached to the DOM
			// Note: no need to call base, its an empty function
			XpostCreate: function() {
				console.log("post create");
				this.viewRow();
			},

			// a call to placeAt occurs here

			// Step 5: Startup
			// Widget is now live, must be called manually
			startup: function() {
				console.log("startup");

				// must call base method for events to work
				this.inherited(arguments);
			},

			// Step 6: Destroy
			// Clean up the widget (no need to overri)
			destroy: function() {
				console.log("destroy");

				// must call base to get default destroy behavior
				this.inherited(arguments);
			},

			editRow: function() {

				var widget = this;

				if (widget.clickEditButton) {
					widget.clickEditButton.remove();
				}

				var fileNameInput = domConstruct.create("input", { value: widget.fileNameCol.innerText });
				var fileDescInput = domConstruct.create("input", { value: widget.fileDescCol.innerText });
				var saveButton = domConstruct.create("a", { href: "#", textContent: "Save" });
				var cancelButton = domConstruct.create("a", { href: "#", textContent: "Cancel" });

				removeAllChildren(widget.fileNameCol).appendChild(fileNameInput);
				removeAllChildren(widget.fileDescCol).appendChild(fileDescInput);
				appendChildren(removeAllChildren(widget.actionCol), [saveButton, cancelButton]);

				widget.clickSaveButton = on(saveButton, 'click', function() {

					widget.fileName = fileNameInput.value;
					widget.fileDesc = fileDescInput.value

					widget.emit("update", {
						data: {
							fileName: widget.fileName,
							fileDesc: widget.fileDesc
						}
					});

					widget.viewRow();

				});

				widget.clickCancelButton = on(cancelButton, 'click', function() {
					widget.viewRow();
				});

			},

			viewRow: function() {

				var widget = this;

				if (widget.clickSaveButton) {
					widget.clickSaveButton.remove();
				}
				if (widget.clickCancelButton) {
					widget.clickCancelButton.remove();
				}

				var editButton = domConstruct.create("a", { href: "#", textContent: "Edit" });

				removeAllChildren(widget.fileNameCol).textContent = widget.fileName;
				removeAllChildren(widget.fileDescCol).textContent = widget.fileDesc;
				removeAllChildren(widget.actionCol).appendChild(editButton);

				widget.clickEditButton = on(editButton, 'click', function() {
					widget.editRow();
				});
			}

		});

		ready(function() {

			var ufr = new UserFileRow({
				fileName: "Test File 5",
				fileDesc: "Test Desc 5"
			});

			ufr.placeAt(query("tbody")[0]);
			ufr.startup();

			ufr.on("update", function(e) {
				console.log("user file row update");
				console.dir(e.data);
			});

			setTimeout(function() {
				ufr.destroy();
			},10000);

		});

	}

	define(dependencies, app);

})();
