(function() {

	var dependencies = [
		"jquery", "underscore",
		"backbone", "marionette", "app/controllers/appController",
		"app/routers/accountRouter", "app/app.templates.hbs",
		"dijit/MenuBar", "dijit/PopupMenuBarItem",
    "dijit/Menu", "dijit/MenuItem", "dijit/DropDownMenu",
	];

	function app($, _, Backbone, Marionette,
		AppController, AccountRouter, Templates,
		MenuBar, PopupMenuBarItem, Menu, MenuItem, DropDownMenu) {

		var x = document.getElementById("app");



		function getLocation() {

			var p = new Promise(function(resolve, reject) {

		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(resolve, reject);
		    } else {
		        reject("Browser does not support geolocation.");
		    }

			});

			return p.catch(function(positionError) {

				if (typeof positionError === "string") {
					return Promise.reject(positionError);
				}

				switch(positionError.code) {
					case 1:
						return Promise.reject("Permission was denied.");
						break;
					case 2:
						return Promise.reject("You are not on earth. Position not available on your planet.");
						break;
					case 3:
						return Promise.reject("Dude it took too long.");
						break;
					default:
						return Promise.reject("No idea what happened! Use IE Edge!")
				}
			});

		}

		getLocation().then(function(position) {
		    x.innerHTML = "Latitude: " + position.coords.latitude +
		    "<br>Longitude: " + position.coords.longitude;
				console.dir(position);
		}).catch(function() {
			console.log("handle my own error");
		});

	}

	define(dependencies, app);

})();
