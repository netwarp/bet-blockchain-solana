let mix = require('laravel-mix')

//require('mix-tailwindcss')
require('laravel-mix-svelte')

mix.js('resources/js/app.js', 'public/js/app.js').svelte().disableNotifications()

