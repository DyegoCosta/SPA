define(['Backbone', '../models/Product', '../collections/ProductsList', '../views/ProductsListView'],
	function(Backbone, Product, ProductsList, ProductsListView) {

	var productsList;

	return AppView = Backbone.View.extend({	

		//use text.js to require html templates files when the application is hosted
		template: _.template('<section id="main"><header><h1>Stock</h1><h2>What do we have, what do we need</h2></header><section id="new-product"><input type="text" id="title" placeholder="What else?"><input type="number" id="quantity" min="0" value="0"><a class="btn btn-small btn-primary" href="#" id="add-product">Add</a></section><section id="products"></section></section>'),

		events: {
			"click a#add-product": "add"
		},

		initialize: function(){
			productsList = new ProductsList();
		},

		add: function(){
			var product = new Product();
			product.set({ title: this.$("#title").val(), quantity: this.$("#quantity").val() });

			productsList.create(product);

			this.reset();
		},

		render: function(){
			this.$el.html(this.template);

			productsListView = new ProductsListView({collection: productsList, el: this.$("#products")});
			productsListView.render();

			productsList.fetch();		
		},

		reset: function(){
			this.$("#quantity").val(0);
			this.$("#title").val("").focus();
		}
	});

});