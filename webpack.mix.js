const mix = require('laravel-mix')

mix.browserSync('http://127.0.0.1:8000')
    .js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .version()