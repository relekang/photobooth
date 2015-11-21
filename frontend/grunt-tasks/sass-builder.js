'use strict';

/**
 * Automatically creates a sass-file containing @import-statements for all files that passes through the filtering
 * crawls {data.src}, creates a file at {data.output}
 *
 * --- Properties(this.data) ---
 * ## REQUIRED
 * dest {string} - path to file-to-be-generated
 * src {string} - path to sass-folder
 *
 * ## OPTIONAL
 * extension {string} - sass-extension used. (sass/scss) (defaults to scss)
 * ignorePatterns {array} - array of strings that CAN'T be in the path to the file (or file will be ignored)
 * requiredPatterns {array} - array of strings that MUST be in the path to the file (or file will be ignored)
 *
 *
 * Note: ignorePatterns and requiredPatterns are relative to data.src
 *
 *
 * --- Example usage ---
 *
 * 'sass-builder': {
 *   dist: {
 *     extension: 'scss',
 *     dest:"src/sass/",
 *     src: 'src/sass/',
 *     ignorePatterns: ["base"],  //ignore files in 'base'-folder
 *     requiredPatterns: ["/"]    //requires a slash in the file-paths, this case basically ignores items in the scss-root
 *   }
 *},
 *
 */
module.exports = function(grunt){
    grunt.registerMultiTask('sass-builder', '', function () {
        var ignorePatterns = this.data.ignorePatterns || [];
        var requiredPatterns = this.data.requiredPatterns || [];

        var extension = this.data.extension || "scss";
        console.log("Collecting " + extension + "-files.");
        //add ending "/" to path if necessary
        var path = this.data.src + (this.data.src[this.data.src.length-1] == "/" ? "" : "/") + "**/*." + extension;
        var files = grunt.file.expand(path);

        var statements = [];
        for (var t = 0; t < files.length; t++) {
            var file = files[t];
            var importName = file.substr(this.data.dest.lastIndexOf("/")+1);
            importName = importName.substr(0, importName.indexOf("."));
            var ignore = false;
            for (var i = 0; i < requiredPatterns.length; i++) {
                var reqPattern = requiredPatterns[i];
                if(importName.indexOf(reqPattern) == -1){
                    ignore = true;
                    break;
                }
            }
            for (var j = 0; j < ignorePatterns.length; j++) {
                var ignorePattern = ignorePatterns[j];
                if(importName.indexOf(ignorePattern) > -1){
                    ignore = true;
                    break;
                }
            }

            if(ignore) continue;

            var statement = '@import "' + importName + '";';
            statements.push(statement);
        }
        var destination = this.data.dest + (this.data.dest[this.data.dest.length-1] == "/" ? "" : "/") + "import." + extension;
        grunt.file.write(destination, statements.join("\n"));

        console.log("Done. '" + destination + "' created.");
    });
};