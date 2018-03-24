var path = require('path'),
fs = require('fs'),
util = require('util'),
exec = require('child_process').exec, child;

var mkdirp = require('mkdirp'),
rimraf = require('rimraf'),
chokidar = require('chokidar'),
sass = require('node-sass');    

var isDevEnv = process.argv.length === 3 && process.argv[2] === '--dev';

console.log(process.argv.length === 3 && process.argv[2] === '--dev');

/**** Configuration Objects ****/
var config = {
    /** SASS **/
    sass: {
        inputConfig: {
            file: path.join('scss', 'styles.scss'),
            outputStyle: 'compressed'
        },
        outputPath: path.join('public','css', 'custom', 'styles.css')
    }
}

if (isDevEnv) {
    config.sass.inputConfig.outputStyle = 'expanded';
} 

function execPromise(command) {
    return new Promise(function(resolve, reject) {
        exec(command, function(err, stdout, stderr) {
            if (err !== null) {
                return reject({"err": err, "out": stdout});
            } else if (stderr !== '') {
                return reject({"err": stderr, "out": stdout});
            }
            else {
                return resolve(stdout);
            }
        })
    })
}

function buildSass() {
    console.log('\nSass file changed, running:');
    // handle the error being thrown from a failed SASS process (invalid syntax, missing file etc) or FS.write
    try {
        var result = sass.renderSync(config.sass.inputConfig);
        // should probably make these both sync, since this is a build, it's not like we want to do things out of sequence
        fs.writeFile(config.sass.outputPath, result.css, (fsError) => {
            fsError ? console.log('write file ERROR:', fsError) : console.log('style.css created');
        });
    } catch (error) {
        error.formatted ? console.log(error.formatted) : console.log(error);
    }
}

function buildScripts() {
    console.log('\nScript file changed:');
}

rimraf.sync(path.join(__dirname, 'public', 'css', 'custom'));
mkdirp(path.join(__dirname, 'public', 'css', 'custom'));
buildSass();
buildScripts();

// If this is being run in production, we don't want to enable the watcher, so end the file here.
if (!isDevEnv) {
    console.log("Production mode.");
    return;
} else {
    console.log("Development mode.")
}

/**** Initialize watcher ****/
var watcher = chokidar.watch(
    ['scss/', 'assets/js/'], 
    {
        // ignore .dotfiles, compiled dir, and css dir, and foundation.plugins.js
        ignored: /(^|.*[\/\\])(\..\w+|(compiled|css|images|OptimizedJS)\/\w*)/,        
        persistent: true
    }
);

/**** Run watcher ****/
watcher.on('change', 
    watchPath => {
        /*** SASS File is changed ***/
        if (watchPath.indexOf(path.join('scss')) !== -1) {
            buildSass();
        }
        /*** JS file is changed ***/
        else if (watchPath.indexOf(path.join('public','js')) != -1) {
            buildScripts();
        } 
        /*** shouldn't be any other type of file in these folders, log to identify ***/
        else {
            console.log(watchPath);
        }
    }
);