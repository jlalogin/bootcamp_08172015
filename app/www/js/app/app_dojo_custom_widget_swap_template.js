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

			templateString: "<tr><td data-dojo-attach-point='fileNameNode'></td>" +
				"<td data-dojo-attach-point='fileDescNode'></td>" +
				"<td><a href='#' data-dojo-attach-event='click: editRow'>Edit</a></td></tr>",

			fileName: "",
			_setFileNameAttr: { node: "fileNameNode", type:"innerText" },

			fileDesc: "",
			_setFileDescAttr: { node: "fileDescNode", type:"innerText" },

			editFileName: "",
			_setEditFileNameAttr: { node: "editFileNameNode", type:"value" },

			editFileDesc: "",
			_setEditFileDescAttr: { node: "editFileDescNode", type:"value" },

			postCreate: function() {
			},

			editRow: function() {

				var widget = this;

				widget.editFileName = widget.fileName;
				widget.editFileDesc = widget.fileDesc;

				widget.domNode.innerHTML = [
					"<tr>",
					"<td>",
					"<input type='text' data-dojo-type='dijit/form/TextBox' data-dojo-attach-point='editFileNameNode'>",
					"</td>",
					"<td>",
					"<input type='text' data-dojo-type='dijit/form/TextBox' data-dojo-attach-point='editFileDescNode'>",
					"</td>",
					"<td>",
					"<a href='#' data-dojo-attach-event='click: viewRow'>Save</a>",
					"<a href='#' data-dojo-attach-event='click: viewRow'>Cancel</a>",
					"</td>",
					"</tr>"
				].join("");

				parser.parse(widget.domNode);
			},

			viewRow: function() {

				var widget = this;

				widget.fileName = widget.editFileName;
				widget.fileDesc = widget.editFileDesc;

				widget.domNode.innerHTML = [
					"<tr>",
					"<td data-dojo-attach-point='fileNameNode'></td>",
					"<td data-dojo-attach-point='fileDescNode'></td>",
					"<td><a href='#' data-dojo-attach-event='click: editRow'>Edit</a></td>",
					"</tr>"
				].join("");

				parser.parse(widget.domNode);

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
