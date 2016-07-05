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

gulp.task('screenshots', () => {
  return gulp.src('./images/development/**/*.jpg')
    .pipe(responsive({
      '**/*': [
        {
          width: 455,
          rename: {suffix: '-455x'},
        },
        {
          width: 910,
          rename: {suffix: '-910x'},
        },
        {
          width: 1365,
          rename: {suffix: '-1365x'},
        },
      ]
    }, {errorOnEnlargement: false}))
    .pipe(gulp.dest('./app/images/development'));
})

gulp.task('home', () => {
  return gulp.src('./images/home/**/*.jpg')
    .pipe(gulp.dest('./app/images/home'))
    .pipe(responsive({
      '**/*': [
        {
          width: 375 * 2,
          height: 667 * 2,
          crop: 'center',
          rename: {suffix: '-750x1334crop'},
        },
        {
          width: 768 * 2,
          height: 1024 * 2,
          crop: 'center',
          rename: {suffix: '-1536x2048crop'},
        },
        {
          width: 414 * 3,
          height: 736 * 3,
          crop: 'center',
          rename: {suffix: '-1242x2208crop'},
        },
        {
          height: 800,
          max: true,
          rename: {suffix: '-x800'},
        },
        {
          height: 1200,
          max: true,
          rename: {suffix: '-x1200'},
        },
        {
          height: 1600,
          max: true,
          rename: {suffix: '-x1600'},
        },
        {
          height: 2000,
          max: true,
          rename: {suffix: '-x2000'},
        },
        {
          height: 2400,
          max: true,
          rename: {suffix: '-x2400'},
        },
        {
          height: 2800,
          max: true,
          rename: {suffix: '-x2800'},
        },
        {
          height: 3200,
          max: true,
          rename: {suffix: '-x3200'},
        },
      ]
    }, {errorOnEnlargement: false}))
    .pipe(gulp.dest('./app/images/home'));
})
