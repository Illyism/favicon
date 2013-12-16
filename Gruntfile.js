
module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      wishlist: {
        src: ['src/less/style.less'],
        dest: 'app/css/style.css',
        options: {                       // Target options
          compress: true
        }
      }
    },
    watch: {
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

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.registerTask('default', ["less", 'watch']);
}