module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'ejs-collect': {
            dist: {
                output: 'src/js/superteam/PB.views.js',
                src: 'src/js/superteam/**/*.ejs',
                options: {
                    ignoreUnderscore: true
                }
            }
        },
        'sass-builder': {
            dist: {
                extension: 'scss',
                dest: "src/sass/",
                src: 'src/sass/',
                ignorePatterns: ["base"],
                requiredPatterns: ["/"]
            }
        },
        // Grunt-sass
        sass: {
            options: {
                sourceMap: false,
                outputStyle: 'nested'
            },
            dist: {
                files: {
                    'build/static/css/screen.css': 'src/sass/screen.scss'
                }
            }
        },

        //JS uglifying
        uglify: {
            lib: {
                files: {
                    'build/static/scripts/lib.min.js': [
                        'src/js/lib/jquery-2.1.1.min.js',
                        'src/js/lib/can.custom.js',
                        'src/js/lib/fastclick.js',
                        'src/js/lib/ScrollMagic.js'
                    ]
                }
            },

            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    sourceMap: true
                },
                files: {
                    'build/static/scripts/app.min.js': [
                        'src/js/superteam/utils/helpers.js',
                        'src/js/superteam/utils/extensions.js',
                        'src/js/superteam/config.js',
                        'src/js/superteam/mothership.js',
                        'src/js/superteam/PB.views.js',

                        'src/js/superteam/controllers/*.js',
                        'src/js/superteam/controllers/**/*.js'
                    ]
                }
            }
        },

        autoprefixer: {
            def: {
                src: 'build/static/css/*.css'
            }
        },

        // Grunt-contrib-watch
        watch: {
            sass: {
                files: ['src/sass/**/*.{scss,sass}'],
                tasks: ['sass-builder', 'sass:dist', 'autoprefixer']
            },
            js: {
                files: [
                    'src/js/*.js',
                    'src/js/**/*.js'
                ],
                tasks: ['uglify:dist']
            },
            html: {
                files: ['src/html/**/*.html'],
                tasks: ['copy:html']
            },
            views: {
                files: [
                    "src/js/superteam/views/*.ejs",
                    "src/js/superteam/views/**/*.ejs"
                ],
                tasks: ["ejs-collect"]
            }
        },
        copy: {
            img: {
                expand: true,
                cwd: 'src/img/',
                src: '**',
                dest: 'build/static/img/',
                flatten: false,
                filter: 'isFile'
            },
            gfx: {
                expand: true,
                cwd: 'src/sass/gfx/',
                src: '**',
                dest: 'build/static/css/gfx/',
                flatten: true
            },
            html: {
                src: 'src/html/index.html',
                dest: 'build/index.html'
            }
        }
    });


    // Loads Grunt Tasks
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadTasks('grunt-tasks');

    // Default task(s).
    grunt.registerTask('default', ['sass-builder', 'sass:dist', 'ejs-collect', 'uglify', 'copy', 'autoprefixer', 'watch']);
};