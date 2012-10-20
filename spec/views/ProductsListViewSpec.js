define(['views/ProductsListView', 'collections/ProductsList', 'models/Product'], function(ProductsListView, ProductsList, Product){

	var productsListView;

	describe('Products list view', function(){
		
		beforeEach(function(){
			var element = "<div></div>";
			var collection = new ProductsList();
			spyOn(collection, 'add').andCallFake(function(obj) { obj.trigger('add'); });

			productsListView = new ProductsListView({ collection: collection, el: element });
	 		productsListView.render();
		});

		it('has template', function(){
			expect(productsListView.template).toBeDefined();
		});

		it('should append a list item when add and item to the collection', function(){
			spyOn(productsListView, 'addProduct');
			
			var product = new Product({ title: 'some title', quantity: 10 });

			productsListView.addProduct(product);

			expect(productsListView.addProduct).toHaveBeenCalledWith(product);
		});

		it('should add an item to the list', function(){
			productsListView.addProduct(new Product({ title: 'some title', quantity: 10 }));
			
			var items = productsListView.$("ol li");

			expect(items.length).toBe(1);
		});
	});

});