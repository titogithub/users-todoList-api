const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('start', () => {
  const stream = nodemon({
    exec: 'node --inspect=9701 app.js',
    ext: 'js',
    env: {
      ENV: 'DEV',
      PORT: 8081,
    },
  });

  stream
    .on('restart', () => {
      console.log('restarted!');
    })
    .on('crash', () => {
      console.error('Application has crashed!\n');
      stream.emit('restart', 10); // restart the server in 10 seconds
    });
});

gulp.task('develop', gulp.series('start'));
