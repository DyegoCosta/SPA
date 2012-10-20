define(['Backbone', '../views/ProductView'], function(Backbone, ProductView){

	return ProductsListView = Backbone.View.extend({

		template: _.template('<ol></ol>'),

		initialize: function(options){
			this.el = options.el;

			this.collection = options.collection;			
			this.collection.on('add', this.addProduct, this)
			this.collection.on('reset', this.addAllProducts, this)
		},

		render: function(){
			this.$el.html(this.template);
		},

		addProduct: function(product){	
			var productView = new ProductView({model:product});
			productView.render();

			this.$("ol").append(productView.$el);
		},

		addAllProducts: function(){
			_this = this;
			_.each(this.collection.toArray(), function(product){ _this.addProduct(product); });
		}

	});

});