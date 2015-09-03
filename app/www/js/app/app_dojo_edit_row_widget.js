(function() {

	"use strict";

	//var widget;

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

		declare("UserFileRow", [Evented, _WidgetBase, _TemplatedMixin], {

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

			postCreate: function() {
				this.viewRow();
			}

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

			parser.parse().then(function() {

				userFileRow.on("update", function(e) {
					console.log("user file row update");
					console.dir(e.data);
				});

			});

		});

	}

	define(dependencies, app);

})();
