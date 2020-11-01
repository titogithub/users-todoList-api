const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('start', () => {
  const stream = nodemon({
    exec: 'node --inspect=9701 app.js',
    ext: 'js',
    env: {
      ENV: 'DEV',
      PORT: 8081,
      ENCRIPTATION_KEY: 'titito_key',
      TOKEN_KEY: 'titito_token',
      TOKEN_REFRESH: '3600',
      MONGODB_URL:
        'mongodb+srv://titomongo:titomongo@cluster0.np6ai.mongodb.net/todoDB?retryWrites=true&w=majority',
      TOKEN_LIFE: '24h',
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
