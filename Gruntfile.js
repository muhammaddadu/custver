module.exports = function(grunt) {

    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*_test.js']
            }
        }
    });

    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', 'mochaTest');

};