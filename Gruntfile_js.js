module.exports = function(grunt) {

	"use strict";

	var
		path = require("path"),
		sassFolder = path.join("assets", "sass"),
		wwwFolder = path.join("app", "www"),
		cssFolder = path.join(wwwFolder, "css"),

		// Add this...
		libsFolder = path.join(wwwFolder, "libs"),
		jsFolder = path.join(wwwFolder, "js"),
		appJSFolder = path.join(jsFolder, "app"),
		// ----

		cssMinFiles = {},
		cssCompressFiles = {},
		sassFiles = {},

		// Add this...
		jsFiles = {},
		jsMinifyFiles = {},
		jsCompressFiles = {};
		// ----

	sassFiles[path.join(cssFolder, "site.css")] =
		path.join(sassFolder, "site.scss");

	cssMinFiles[path.join(cssFolder, "site.min.css")] =
		path.join(cssFolder, "site.css");

	cssCompressFiles[path.join(cssFolder, "site.min.gz.css")] =
		path.join(cssFolder, "site.min.css");

	// Add this...

	jsFiles[path.join(jsFolder, "site.js")]	= [
			path.join(libsFolder, "jquery", "dist", "jquery.js"),
			path.join(appJSFolder, "init.js"),
			path.join(appJSFolder, "app.js")
	];

	jsMinifyFiles[path.join(jsFolder, "site.min.js")]	=
		path.join(jsFolder, "site.js");

	jsCompressFiles[path.join(jsFolder, "site.min.gz.js")]	=
		path.join(jsFolder, "site.min.js");

	// -----

	grunt.initConfig({
		webServer: {
			port: 8080,
			rootFolder: wwwFolder
		},
    sass: {
			main: {
        options: {
          sourcemap: "none"
        },
				files: sassFiles
			}
		},
		cssmin: {
			main: {
        options: {
          keepSpecialComments: 0,
          sourceMap: false
        },
				files: cssMinFiles
			}
		},
		// Add this...
		uglify: {
			combine: {
        options: {
          compress: false,
          beautify: {
            beautify: true,
            indent_level: 2,
            comments: true
          },
          mangle: false,
        },
				files: jsFiles
			},
      minify: {
        options: {
          compress: {
            drop_debugger: true,
            unsafe: true,
            drop_console: false
          },
          beautify: false,
          mangle: {},
          screwIE8: true
        },
        files: jsMinifyFiles
      }
		},
    compress: {
      css: {
        options: {
          mode: 'gzip'
        },
        files: cssCompressFiles
      },
			// Add this...
      js: {
        options: {
          mode: 'gzip'
        },
        files: jsCompressFiles
      }
    },
		watch: {
      css: {
				files: path.join(sassFolder, "**", "*.scss"),
				tasks: ["sass","cssmin","compress:css"]
			},
			// Add this...
			js: {
				files: [
					path.join(jsFolder, "**", "*.js"),
					"!" + path.join(jsFolder, "*.min.js")],
				tasks: ["uglify:combine","compress:js"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  // Add this...
	grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-compress");

	grunt.registerTask("web-server", "start a web server", function() {

		var
			http = require("http"),
			express = require("express"),
			app = express(),
			webServerConfig = grunt.config("webServer");

		// not needed because we are using watch which is async
		//this.async();

		app.use("/css", express.static(cssFolder, {
			setHeaders: function(res, filePath) {
				res.setHeader("Content-Type", "text/css");
				if (/.gz.css$/.test(filePath)) {
					res.setHeader("Content-Encoding", "gzip");
				}
			}
		}));

		// Add this...
		app.use("/js", express.static(jsFolder, {
			setHeaders: function(res, filePath) {
				res.setHeader("Content-Type", "text/javascript");
				if (/.gz.js$/.test(filePath)) {
					res.setHeader("Content-Encoding", "gzip");
				}
			}
		}));
		//---

		app.use(express.static(webServerConfig.rootFolder));

		http.createServer(app).listen(webServerConfig.port, function() {
			console.log("web server running on port: " + webServerConfig.port);
		});

	});

	// Update this...
	grunt.registerTask("default", "start development environment",
		[ "sass", "cssmin", "uglify", "compress", "web-server", "watch" ]);

};
