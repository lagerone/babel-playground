var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
	return gulp.src('./dist/**/*')
		.pipe(ghPages());
});

gulp.task('modules', function() {
	return browserify({
			entries: './src/main.js',
			debug: true
		})
		.transform(babelify)
		.bundle()
		.on('error', function(err){
	      console.log(err.message);
	      return this;
	    })
		.pipe(source('main-built.js'))
		.pipe(gulp.dest('./dist'));
});


gulp.task('watch', function(){
	gulp.watch(['src/**/*.js'], ['modules']);
});
