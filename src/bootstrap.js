(function(){

	require.config({
		paths: {
			jQuery: '../lib/jquery-1.8.2.min',
			Underscore: '../lib/underscore',
			Backbone: '../lib/backbone',
			LocalStorage: '../lib/backbone-localstorage'
		},
		shim: {
			'jQuery': {
				exports: '$'
			},
			'Underscore': {
				exports: '_'
			},
			'Backbone': {
				deps: ['jQuery', 'Underscore'],
				exports: 'Backbone'
			},
			'LocalStorage': {
				deps: ['jQuery', 'Underscore', 'Backbone'],
				exports: 'LocalStorage'
			}
		}
	});

	require(['jQuery', '../src/views/AppView'], function($, AppView){
		var appView = new AppView({ el: $('#app-container') });

		appView.render();
	});

}).call(this);