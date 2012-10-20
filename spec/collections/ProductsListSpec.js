define(['collections/ProductsList'], function(ProductsList){
	
	return describe('Products list', function(){

		var productsList;

		beforeEach(function(){
			productsList = new ProductsList();
		});

		it('the model must be define', function(){
			expect(productsList.model).toBeDefined();
		});

		it('the localStorage must be define', function(){
			expect(productsList.localStorage).toBeDefined();
		});

	});

});