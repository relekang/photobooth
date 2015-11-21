'use strict';
/**
 * Task to collect html/ejs-files. Originally from 'grunt-ejs'-node module. Added "target"-property for location
 * of compiled files.
 **/
module.exports = function(grunt){
    grunt.registerMultiTask('ejs-collect', '', function () {
        console.log("Creating views...");
        var namespace = grunt.config.data.pkg.name || "EmptyNamespace";
        var files = grunt.file.expand(this.data.src);
        var _views = [];
        var options = this.data.options || {};
        for (var t = 0; t < files.length; t++) {
            var file = files[t];
            var id = file.substr(file.lastIndexOf("/") + 1).split("-").join("_").split(".")[0];
            if(options.ignoreUnderscore && id[0] === "_"){ //ignore files with filename starting with "_"
                continue;
            }
            var content = grunt.file.read(file, {encoding: 'utf8'});
            content = content.replace(/(\r\n|\n|\r)/gm, " ");
            content = content.replace(/\t/g, " ");
            content = content.replace(/"/g, '\\"');
            content = namespace + '.Views.' + id + ' = "' + content + '";';

            _views.push(content);
        }
        var filename = this.data.output;
        grunt.file.write(filename, _views.join(" "));

        console.log("Done. '" + filename + "' created.");
    });
};