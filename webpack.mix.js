let mix = require('laravel-mix')

require('mix-tailwindcss');

mix.js('resources/js/app.js', 'public/js/app.js').disableNotifications()

mix.postCss('resources/css/app.css', 'public/css/app.css').tailwind().disableNotifications()