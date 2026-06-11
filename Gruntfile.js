module.exports = function (grunt) {
  function asArray (value) {
    return Array.isArray(value) ? value.reduce(function (result, item) {
      return result.concat(asArray(item));
    }, []) : [value];
  }

  function normalizeArchivePath (filepath) {
    return filepath.replace(/\\/g, '/').replace(/^\/+/, '');
  }

  // From TWBS
  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
    ' * Bootstrap-select v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
    ' *\n' +
    ' * CrestApps fork (vanilla JavaScript, Bootstrap 5+) of snapappointments/bootstrap-select\n' +
    ' * Copyright 2012-2018 SnapAppointments, LLC (original work)\n' +
    ' * Fork modifications Copyright 2024-<%= grunt.template.today(\'yyyy\') %> CrestApps\n' +
    ' * Licensed under <%= pkg.license %> (https://github.com/CrestApps/crestapps-bootstrap-select/blob/main/LICENSE)\n' +
    ' */\n',

    // Task configuration.

    clean: {
      css: 'dist/css',
      js: 'dist/js',
      docs: 'docs/static/dist'
    },

    eslint: {
      options: {
        overrideConfigFile: 'eslint.config.cjs'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      main: {
        src: [
          'js/*.js',
          '!js/umd-intro.js',
          '!js/umd-outro.js',
          '!js/esm-intro.js',
          '!js/esm-outro.js'
        ]
      },
      i18n: {
        src: 'js/i18n/*.js'
      }
    },

    concat: {
      options: {
        stripBanners: true,
        sourceMap: true
      },
      main: {
        src: 'js/bootstrap-select.js',
        dest: 'dist/js/bootstrap-select.js',
        options: {
          banner: '<%= banner %>\n' + grunt.file.read('js/umd-intro.js'),
          footer: grunt.file.read('js/umd-outro.js')
        }
      },
      esm: {
        src: 'js/bootstrap-select.js',
        dest: 'dist/js/bootstrap-select.esm.mjs',
        options: {
          banner: '<%= banner %>\n' + grunt.file.read('js/esm-intro.js'),
          footer: grunt.file.read('js/esm-outro.js')
        }
      },
      i18n: {
        expand: true,
        src: '<%= eslint.i18n.src %>',
        dest: 'dist/',
        options: {
          banner: '<%= banner %>\n' + grunt.file.read('js/umd-intro.js'),
          footer: grunt.file.read('js/umd-outro.js')
        }
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        output: {
          ascii_only: true
        },
        preserveComments: function (node, comment) {
          return /^!|@preserve|@license|@cc_on/i.test(comment.value);
        }
      },
      main: {
        src: '<%= concat.main.dest %>',
        dest: 'dist/js/bootstrap-select.min.js',
        options: {
          sourceMap: true,
          sourceMapIncludeSources: true,
          sourceMapIn: 'dist/js/bootstrap-select.js.map'
        }
      },
      i18n: {
        expand: true,
        src: 'dist/<%= eslint.i18n.src %>',
        ext: '.min.js'
      }
    },

    less: {
      options: {
        strictMath: true,
        sourceMap: true,
        outputSourceFiles: true,
        sourceMapURL: 'bootstrap-select.css.map',
        sourceMapFilename: '<%= less.css.dest %>.map'
      },
      css: {
        src: 'less/bootstrap-select.less',
        dest: 'dist/css/bootstrap-select.css'
      }
    },

    usebanner: {
      css: {
        options: {
          banner: '<%= banner %>'
        },
        src: '<%= less.css.dest %>'
      }
    },

    copy: {
      docs: {
        expand: true,
        cwd: 'dist/',
        src: [
          '**/*'
        ],
        dest: 'docs/static/dist/'
      }
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        advanced: false
      },
      css: {
        src: '<%= less.css.dest %>',
        dest: 'dist/css/bootstrap-select.min.css'
      }
    },

    csslint: {
      options: {
        'adjoining-classes': false,
        'box-sizing': false,
        'box-model': false,
        'compatible-vendor-prefixes': false,
        'floats': false,
        'font-sizes': false,
        'gradients': false,
        'important': false,
        'known-properties': false,
        'outline-none': false,
        'qualified-headings': false,
        'regex-selectors': false,
        'shorthand': false,
        'text-indent': false,
        'unique-headings': false,
        'universal-selector': false,
        'unqualified-attributes': false,
        'overqualified-elements': false
      },
      css: {
        src: '<%= less.css.dest %>'
      }
    },

    version: {
      js: {
        options: {
          prefix: 'Selectpicker.VERSION = \''
        },
        src: [
          'js/bootstrap-select.js'
        ]
      },
      docs: {
        options: {
          prefix: '<%= pkg.name %>/archive/v',
          replace: '[0-9a-zA-Z\\-_\\+\\.]+)([^/]+(?=\.zip+)'
        },
        src: [
          'README.md',
          'docs/docs/index.md'
        ]
      },
      cdn: {
        options: {
          prefix: 'npm/<%= pkg.name %>@'
        },
        src: [
          'README.md',
          'docs/docs/index.md'
        ]
      },
      nuget: {
        options: {
          prefix: '<version>'
        },
        src: [
          'nuget/bootstrap-select.nuspec'
        ]
      },
      default: {
        options: {
          prefix: '[\'"]?version[\'"]?:[ "\']*'
        },
        src: [
          'docs/docusaurus.config.js',
          'package.json'
        ]
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')()
        ]
      },
      css: {
        src: '<%= less.css.dest %>'
      }
    },

    compress: {
      zip: {
        options: {
          archive: 'bootstrap-select-<%= pkg.version %>.zip',
          mode: 'zip'
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: '**',
            dest: 'bootstrap-select-<%= pkg.version %>/'
          }, {
            src: ['bower.json', 'composer.json', 'package.json'],
            dest: 'bootstrap-select-<%= pkg.version %>/'
          }
        ]
      }
    },

    watch: {
      gruntfile: {
        files: '<%= eslint.gruntfile.src %>',
        tasks: 'eslint:gruntfile'
      },
      js: {
        files: ['<%= eslint.main.src %>', '<%= eslint.i18n.src %>'],
        tasks: 'build-js'
      },
      less: {
        files: 'less/*.less',
        tasks: 'build-css'
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });

  grunt.registerMultiTask('postcss', 'Process CSS with PostCSS.', function () {
    var done = this.async();
    var postcss = require('postcss');
    var options = this.options({
      map: true,
      processors: [
        require('autoprefixer')()
      ]
    });

    Promise.all(this.files.map(function (file) {
      var src = file.src.filter(function (filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.fail.warn('Source file "' + filepath + '" not found.');
        }

        return !grunt.file.isDir(filepath);
      })[0];

      if (!src) return Promise.resolve();

      var dest = file.dest || src;
      var map = false;

      if (options.map) {
        map = {
          inline: false,
          annotation: true
        };

        if (grunt.file.exists(src + '.map')) {
          map.prev = grunt.file.readJSON(src + '.map');
        }
      }

      return postcss(options.processors).process(grunt.file.read(src), {
        from: src,
        to: dest,
        map: map
      }).then(function (result) {
        grunt.file.write(dest, result.css);

        if (result.map) {
          grunt.file.write(dest + '.map', result.map.toString());
        }

        grunt.log.writeln('File ' + dest + ' processed.');
      });
    })).then(function () {
      done();
    }, done);
  });

  grunt.registerMultiTask('compress', 'Create distribution archives.', function () {
    var done = this.async();
    var fs = require('fs');
    var path = require('path');
    var ZipArchive = require('archiver').ZipArchive;
    var options = this.options({
      archive: 'archive.zip'
    });
    var archivePath = grunt.template.process(options.archive);
    var output = fs.createWriteStream(archivePath);
    var archive = new ZipArchive({
      zlib: {
        level: 9
      }
    });
    var completed = false;

    function finish (error) {
      if (completed) return;

      completed = true;
      done(error);
    }

    function archiveName (file, src) {
      var dest = file.dest || src;

      if (!(file.orig && file.orig.expand) && /\/$/.test(dest)) {
        dest = path.join(dest, src);
      }

      return normalizeArchivePath(dest);
    }

    output.on('close', function () {
      grunt.log.writeln('Created ' + archivePath + ' (' + archive.pointer() + ' bytes).');
      finish();
    });

    archive.on('warning', finish);
    archive.on('error', finish);
    archive.pipe(output);

    this.files.forEach(function (file) {
      file.src.forEach(function (src) {
        if (!grunt.file.exists(src)) {
          grunt.fail.warn('Source file "' + src + '" not found.');
        }

        if (grunt.file.isDir(src)) return;

        archive.file(src, {
          name: archiveName(file, src)
        });
      });
    });

    var finalize = archive.finalize();

    if (finalize && typeof finalize.catch === 'function') {
      finalize.catch(finish);
    }
  });

  grunt.registerTask('watch', 'Watch source files and run configured tasks.', function () {
    var done = this.async();
    var chokidar = require('chokidar');
    var watchConfig = grunt.config.get('watch') || {};
    var running = {};
    var targets = Object.keys(watchConfig);

    function runTasks (targetName, tasks) {
      if (running[targetName]) {
        running[targetName].pending = true;
        return;
      }

      running[targetName] = {
        pending: false
      };

      grunt.util.spawn({
        grunt: true,
        args: tasks
      }, function (error, result) {
        var rerun = running[targetName].pending;

        if (result.stdout) grunt.log.write(result.stdout);
        if (result.stderr) grunt.log.error(result.stderr);
        if (error) grunt.log.error(error.message);

        delete running[targetName];

        if (rerun) {
          runTasks(targetName, tasks);
        }
      });
    }

    if (!targets.length) {
      grunt.log.warn('No watch targets configured.');
      done();
      return;
    }

    targets.forEach(function (targetName) {
      var target = watchConfig[targetName];
      var files = asArray(target.files);
      var tasks = asArray(target.tasks);

      chokidar.watch(files, {
        ignoreInitial: true
      }).on('all', function (eventName, filepath) {
        grunt.log.writeln(filepath + ' ' + eventName + '; running ' + tasks.join(', ') + '.');
        runTasks(targetName, tasks);
      });

      grunt.log.writeln('Watching ' + files.join(', ') + ' for ' + targetName + '.');
    });
  });

  // Version numbering task.
  // to update version number, use grunt version::x.y.z

  // CSS distribution
  grunt.registerTask('build-css', ['clean:css', 'less', 'postcss', 'usebanner:css', 'cssmin']);

  // JS distribution
  grunt.registerTask('build-js', ['clean:js', 'eslint', 'concat', 'uglify']);

  // Copy dist to docs
  grunt.registerTask('copy-docs', ['clean:docs', 'copy:docs']);

  // Build CSS & JS
  grunt.registerTask('build', ['build-css', 'build-js']);

  // Development watch
  grunt.registerTask('dev-watch', ['build', 'watch']);

  // Full distribution
  grunt.registerTask('dist', ['build', 'compress', 'copy-docs']);

  // Default task.
  grunt.registerTask('default', 'build');

  // Linting
  grunt.registerTask('lint', 'eslint');
};
