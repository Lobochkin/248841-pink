"use strict";

module.exports = function(grunt) {
  //grunt.loadNpmTasks("grunt-contrib-less");
  //grunt.loadNpmTasks("grunt-browser-sync");
  //grunt.loadNpmTasks("grunt-contrib-watch");
  //grunt.loadNpmTasks("grunt-postcss");

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    less: {
      style: {
        files: {
          "source/css/style.css": "source/less/style.less"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")()
          ]
        },
        src: "source/css/*.css"
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "source/*.html",
            "source/css/*.css"
          ]
        },
        options: {
          server: "source/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less", "postcss"]
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "source/css/style.min.css": ["source/css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: ["source/img/**/*.{png,jpg,svg}"]
        }]
      }
    },

    cwebp: {
      images: {
        options: {
          q: 90
        },
        files: [{
          expand: true,
          src: ["source/img/**/*.{png,jpg}"]
        }]
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false
      },
      sprite: {
        files: {
          "source/img/sprite.svg": ["source/img/icon-*.svg"]
        }
      }
    },

    posthtml: {
      options: {
        use: [
          require("posthtml-include")()
        ]
      },
      html: {
        files: [{
          expand: true,
          src: ["source/*.html"]
        }]
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
};
