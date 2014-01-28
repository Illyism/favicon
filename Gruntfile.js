"use strict";

module.exports = function (grunt) {
	grunt.initConfig({
		// JSHINT
		jshint: {
			files: ['Gruntfile.js', 'app/*.js', '*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		// JADE
		jade: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
					"app/main.html": ["views/index.jade"]
				}
			}
		},
		// LESS
		less: {
			wishlist: {
				src: ['src/less/style.less'],
				dest: 'app/css/style.css',
				options: {                       
					compress: true
				}
			}
		},
		// LIVE
		watch: {
			jade: {
				files: ['views/*'],
				tasks: ['jade']
			},
			less: {
				files: ['src/less/*'],
				tasks: ['less']
			},
			livereload: {
				options: { livereload: true },
				files: ['app/css/*', "views/*", "views/*/*", "app/js/*"]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-jade");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask('default', ["jshint", "less", "jade"]);
	grunt.registerTask('live', ["jshint", "less", "jade", 'watch']);
};