//     FAVICON GENERATOR
//     Copyright (C) 2014  Ilias Ismanalijev

//     This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU Affero General Public License as
//     published by the Free Software Foundation, either version 3 of the
//     License, or (at your option) any later version.

//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU Affero General Public License for more details.

//     You should have received a copy of the GNU Affero General Public License
//     along with this program.  If not, see http://www.gnu.org/licenses/

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