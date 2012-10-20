define(['Backbone', 'LocalStorage', '../models/Product'], function(Backbone, LocalStorage, Product){

	return ProductList = Backbone.Collection.extend({

		model: Product,

		localStorage: new Store("stock")
		
	});

});