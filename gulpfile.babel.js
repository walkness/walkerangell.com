import gulp from 'gulp';
import responsive from 'gulp-responsive';

gulp.task('portfolio', () => {
  return gulp.src('./images/portfolio/**/*.jpg')
    .pipe(responsive({
      '**/*': [
        {
          height: 50,
          blur: true,
          grayscale: true,
          rename: {suffix: '-x50'},
        },
        {
          width: 830,
          height: 830,
          max: true,
          rename: {suffix: '-830x830'},
        },
        {
          width: 1640,
          height: 1640,
          max: true,
          rename: {suffix: '-1640x1640'},
        },
        {
          width: 3280,
          height: 3280,
          max: true,
          rename: {suffix: '-3280x3280'},
        },
        {
          width: 350,
          height: 350,
          rename: {suffix: '-350x350'},
        },
        {
          width: 700,
          height: 700,
          rename: {suffix: '-700x700'},
        },
      ]
    }, {errorOnEnlargement: false}))
    .pipe(gulp.dest('./app/images/portfolio'));
})
